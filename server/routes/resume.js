import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/auth.js';
import Resume from '../models/Resume.js';
import JobDescription from '../models/JobDescription.js';

const router = Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, and TXT files are allowed.'));
    }
  },
});

// POST /api/resume/upload
router.post('/upload', protect, upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // In production: parse the file content using pdf-parse or mammoth
    const resume = await Resume.create({
      userId: req.user._id,
      name: req.file.originalname,
      rawText: 'Extracted text would go here',
      fileUrl: req.file.path,
      fileName: req.file.originalname,
    });

    res.status(201).json({ resume });
  } catch (error) {
    next(error);
  }
});

// POST /api/resume/paste
router.post('/paste', protect, async (req, res, next) => {
  try {
    const { text, name } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Resume text is required.' });
    }

    const resume = await Resume.create({
      userId: req.user._id,
      name: name || 'Pasted Resume',
      rawText: text,
    });

    res.status(201).json({ resume });
  } catch (error) {
    next(error);
  }
});

// GET /api/resume
router.get('/', protect, async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-rawText');
    res.json({ resumes });
  } catch (error) {
    next(error);
  }
});

// POST /api/resume/job-description
router.post('/job-description', protect, async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Job description text is required.' });
    }

    const jd = await JobDescription.create({
      userId: req.user._id,
      rawText: text,
    });

    res.status(201).json({ jobDescription: jd });
  } catch (error) {
    next(error);
  }
});

export default router;
