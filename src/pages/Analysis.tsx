import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, CheckCircle, AlertTriangle, Lightbulb, ArrowRight, Zap,
  FileEdit, TrendingUp, Target, Search, Shield, XCircle, Sparkles,
  BookOpen
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { generateTailoredResume } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Analysis() {
  const navigate = useNavigate();
  const { analysis, isTailoring, setIsTailoring, setTailoredResume, resume, jobDescription } = useAppStore();

  useEffect(() => {
    if (!analysis) {
      navigate('/dashboard');
    }
  }, [analysis, navigate]);

  const handleGenerate = async () => {
    if (!resume || !jobDescription || !analysis) return;
    setIsTailoring(true);
    try {
      const result = await generateTailoredResume(resume, jobDescription, analysis);
      setTailoredResume(result.sections, result.newScore);
      setIsTailoring(false);
      navigate('/editor');
    } catch {
      setIsTailoring(false);
    }
  };

  if (!analysis) return null;

  const scoreColor =
    analysis.matchScore >= 70
      ? 'text-emerald-600'
      : analysis.matchScore >= 50
      ? 'text-amber-600'
      : 'text-red-600';

  const scoreBg =
    analysis.matchScore >= 70
      ? 'from-emerald-500 to-teal-500'
      : analysis.matchScore >= 50
      ? 'from-amber-500 to-orange-500'
      : 'from-red-500 to-rose-500';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <div className="gradient-bg-subtle border-b border-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold text-slate-900">ATS Analysis Results</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 overflow-hidden rounded-3xl bg-white shadow-xl border border-slate-200"
        >
          <div className="grid md:grid-cols-2">
            {/* Score Circle */}
            <div className="flex flex-col items-center justify-center p-10">
              <div className="relative">
                <svg className="h-48 w-48 -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="84"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="84"
                    fill="none"
                    stroke={`url(#scoreGradient)`}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 84}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 84 }}
                    animate={{
                      strokeDashoffset: (2 * Math.PI * 84) * (1 - analysis.matchScore / 100),
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className="stop-primary" stopColor={
                        analysis.matchScore >= 70 ? '#10b981' : analysis.matchScore >= 50 ? '#f59e0b' : '#ef4444'
                      } />
                      <stop offset="100%" className="stop-accent" stopColor={
                        analysis.matchScore >= 70 ? '#14b8a6' : analysis.matchScore >= 50 ? '#f97316' : '#f43f5e'
                      } />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className={`text-5xl font-extrabold ${scoreColor}`}
                  >
                    {analysis.matchScore}%
                  </motion.span>
                  <span className="mt-1 text-sm font-medium text-slate-500">ATS Match</span>
                </div>
              </div>
            </div>

            {/* Score Details */}
            <div className="flex flex-col justify-center border-t border-slate-100 p-10 md:border-l md:border-t-0">
              <h2 className="text-xl font-bold text-slate-900">Resume Match Analysis</h2>
              <p className="mt-2 text-sm text-slate-500">
                Your resume matches <strong className="text-slate-700">{analysis.matchScore}%</strong> of
                the job requirements. Here's a detailed breakdown.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-700">
                    {analysis.matchedKeywords.length} keywords matched
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span className="text-sm font-medium text-red-700">
                    {analysis.missingKeywords.length} keywords missing
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <span className="text-sm font-medium text-amber-700">
                    {analysis.weakSections.length} sections need improvement
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left - Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card lg:col-span-2 space-y-8"
          >
            {/* Matched Keywords */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-slate-900">Matched Keywords</h3>
                <span className="badge-success">{analysis.matchedKeywords.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords.map((kw) => (
                  <span key={kw} className="badge-success border border-emerald-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-5 w-5 text-red-400" />
                <h3 className="font-semibold text-slate-900">Missing Keywords</h3>
                <span className="badge-danger">{analysis.missingKeywords.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((kw) => (
                  <span key={kw} className="badge-danger border border-red-200">
                    {kw}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400 flex items-center gap-2">
                <Lightbulb className="h-3.5 w-3.5" />
                These keywords will be naturally added when you generate the tailored resume
              </p>
            </div>

            {/* Weak Sections */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="font-semibold text-slate-900">Sections to Improve</h3>
                <span className="badge-warning">{analysis.weakSections.length}</span>
              </div>
              <div className="space-y-3">
                {analysis.weakSections.map((ws, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                      <div>
                        <h4 className="font-semibold text-amber-900">{ws.section}</h4>
                        <p className="mt-1 text-sm text-amber-700">{ws.issue}</p>
                        <p className="mt-2 text-sm font-medium text-amber-800 flex items-start gap-1">
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                          {ws.suggestion}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Action Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Generate CTA */}
            <div className="card border-primary-200 bg-gradient-to-br from-primary-50 to-white">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-200">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Ready to Tailor?</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Generate a perfectly optimized resume for this job
                </p>

                <button
                  onClick={handleGenerate}
                  disabled={isTailoring}
                  className="btn-primary mt-6 w-full group"
                >
                  {isTailoring ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      Tailoring...
                    </>
                  ) : (
                    <>
                      <FileEdit className="h-4 w-4" />
                      Generate Tailored Resume
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-xs text-slate-400">
                  Expected score improvement:{' '}
                  <span className="font-semibold text-emerald-600">+35%</span>
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary-500" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-2xl font-bold text-slate-900">{analysis.matchedKeywords.length}</div>
                  <div className="text-xs text-slate-500">Matched</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-2xl font-bold text-slate-900">{analysis.missingKeywords.length}</div>
                  <div className="text-xs text-slate-500">Missing</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-2xl font-bold text-slate-900">{analysis.weakSections.length}</div>
                  <div className="text-xs text-slate-500">Weak Sections</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-600">+35%</div>
                  <div className="text-xs text-slate-500">Est. Improvement</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card space-y-3">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary-500" />
                What You'll Get
              </h3>
              {[
                { icon: FileEdit, text: 'Rewritten professional summary' },
                { icon: TrendingUp, text: 'Improved bullet points with metrics' },
                { icon: Search, text: 'Keywords naturally integrated' },
                { icon: BookOpen, text: 'Cover letter & email templates' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <item.icon className="h-4 w-4 text-primary-400" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
