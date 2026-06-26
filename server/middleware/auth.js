import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized. Please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'resumefit-secret-key');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized. Invalid token.' });
  }
};

export const checkPlanLimit = (req, res, next) => {
  if (req.user.plan === 'free' && req.user.analysesRemaining <= 0) {
    return res.status(403).json({
      error: 'You have reached your free plan limit. Please upgrade to Pro.',
      plan: 'free',
      analysesRemaining: 0,
    });
  }
  next();
};
