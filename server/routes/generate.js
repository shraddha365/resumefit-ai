import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';
import JobDescription from '../models/JobDescription.js';
import { tailorResumePrompt, generateCoverLetterPrompt, generateLinkedInPrompt, generateEmailPrompt } from '../services/aiPrompts.js';

const router = Router();

// POST /api/generate/tailor-resume
router.post('/tailor-resume', protect, async (req, res, next) => {
  try {
    const { analysisId } = req.body;

    const analysis = await Analysis.findOne({ _id: analysisId, userId: req.user._id });
    if (!analysis) return res.status(404).json({ error: 'Analysis not found.' });

    const resume = await Resume.findById(analysis.resumeId);
    const jd = await JobDescription.findById(analysis.jobDescriptionId);

    // In production: call OpenAI with the prompt
    const prompt = tailorResumePrompt(resume, jd, analysis);

    console.log('=== AI PROMPT FOR TAILORING ===');
    console.log(prompt);
    console.log('================================');

    // Simulated AI response
    const tailoredSections = analysis.suggestions.map((s) => ({
      section: s.section,
      original: s.original,
      improved: s.improved,
      changes: s.changes,
    }));

    const newScore = Math.min(98, analysis.matchScore + 35);

    analysis.tailoredSections = tailoredSections;
    analysis.newScore = newScore;
    await analysis.save();

    res.json({
      sections: tailoredSections,
      newScore,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/generate/cover-letter
router.post('/cover-letter', protect, async (req, res, next) => {
  try {
    const { resumeId, jobDescriptionId } = req.body;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    const jd = await JobDescription.findOne({ _id: jobDescriptionId, userId: req.user._id });

    if (!resume || !jd) {
      return res.status(404).json({ error: 'Resume or job description not found.' });
    }

    const prompt = generateCoverLetterPrompt(resume, jd);
    console.log('=== AI PROMPT FOR COVER LETTER ===');
    console.log(prompt);
    console.log('==================================');

    res.json({
      coverLetter: {
        content: 'Generated cover letter would appear here.',
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/generate/linkedin
router.post('/linkedin', protect, async (req, res, next) => {
  try {
    const { resumeId, jobDescriptionId } = req.body;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    const jd = await JobDescription.findOne({ _id: jobDescriptionId, userId: req.user._id });

    if (!resume || !jd) {
      return res.status(404).json({ error: 'Resume or job description not found.' });
    }

    const prompt = generateLinkedInPrompt(resume, jd);
    console.log('=== AI PROMPT FOR LINKEDIN ===');
    console.log(prompt);
    console.log('==============================');

    res.json({
      linkedInAbout: {
        content: 'Generated LinkedIn About section would appear here.',
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/generate/email
router.post('/email', protect, async (req, res, next) => {
  try {
    const { resumeId, jobDescriptionId } = req.body;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    const jd = await JobDescription.findOne({ _id: jobDescriptionId, userId: req.user._id });

    if (!resume || !jd) {
      return res.status(404).json({ error: 'Resume or job description not found.' });
    }

    const prompt = generateEmailPrompt(resume, jd);
    console.log('=== AI PROMPT FOR EMAIL ===');
    console.log(prompt);
    console.log('===========================');

    res.json({
      emailMessage: {
        subject: 'Application for [Role] - [Name]',
        body: 'Generated email message would appear here.',
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
