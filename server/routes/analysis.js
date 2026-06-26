import { Router } from 'express';
import { protect, checkPlanLimit } from '../middleware/auth.js';
import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';
import JobDescription from '../models/JobDescription.js';
import User from '../models/User.js';

const router = Router();

// POST /api/analysis/analyze
router.post('/analyze', protect, checkPlanLimit, async (req, res, next) => {
  try {
    const { resumeId, jobDescriptionId } = req.body;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found.' });
    }

    const jd = await JobDescription.findOne({ _id: jobDescriptionId, userId: req.user._id });
    if (!jd) {
      return res.status(404).json({ error: 'Job description not found.' });
    }

    // In production: call OpenAI API to analyze
    // For now, return a simulated analysis
    const analysis = {
      matchScore: 52,
      matchedKeywords: ['React', 'JavaScript', 'TypeScript', 'CSS', 'REST APIs'],
      missingKeywords: ['Next.js', 'GraphQL', 'Jest', 'Cypress', 'CI/CD'],
      weakSections: [
        {
          section: 'Professional Summary',
          issue: 'Too generic and lacks specific achievements.',
          suggestion: 'Rewrite to highlight frontend expertise.',
        },
      ],
      suggestions: [],
      keywordDensity: { React: 3, TypeScript: 1, JavaScript: 3 },
    };

    // Decrement free plan analysis count
    if (req.user.plan === 'free') {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { analysesRemaining: -1 },
      });
    }

    const savedAnalysis = await Analysis.create({
      userId: req.user._id,
      resumeId,
      jobDescriptionId,
      ...analysis,
    });

    res.json({ analysis: savedAnalysis });
  } catch (error) {
    next(error);
  }
});

// GET /api/analysis/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found.' });
    }

    res.json({ analysis });
  } catch (error) {
    next(error);
  }
});

export default router;
