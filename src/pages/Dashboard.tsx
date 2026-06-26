import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload, FileText, Sparkles, ArrowRight, ClipboardPaste, FileUp,
  Clock, CheckCircle, TrendingUp, BarChart3, Zap, AlertCircle, XCircle
} from 'lucide-react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { useAppStore } from '@/store/app-store';
import { uploadResume, pasteResume, parseJobDescription, analyzeResume } from '@/lib/api';
import { DEMO_VERSIONS } from '@/lib/mock-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ALLOWED_RESUME_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function Dashboard() {
  const navigate = useNavigate();
  const { setResume, setJobDescription, setAnalysis, setIsAnalyzing, isAnalyzing } = useAppStore();

  // Resume state
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  // JD state
  const [jdText, setJdText] = useState('');
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdActiveTab, setJdActiveTab] = useState<'upload' | 'paste'>('paste');
  const [jdError, setJdError] = useState('');

  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'processing'>('input');

  // ─── Resume Dropzone ───────────────────────────────────────
  const onResumeDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setResumeFile(acceptedFiles[0]);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onResumeDrop,
    accept: ALLOWED_RESUME_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  // ─── JD Dropzone ───────────────────────────────────────────
  const onJdDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setJdError('');

    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      const errors = rejection.errors as readonly { code: string; message: string }[];
      const err = errors[0];
      if (err.code === 'file-invalid-type') {
        setJdError('Unsupported file type. Please upload PDF, DOCX, or TXT.');
      } else if (err.code === 'file-too-large') {
        setJdError('File is too large. Maximum size is 10MB.');
      } else if (err.code === 'too-many-files') {
        setJdError('Please upload only one file.');
      } else {
        setJdError(err.message);
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setJdFile(file);

      // Read file as text and populate the JD textarea
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          setJdText(text);
        }
      };
      reader.onerror = () => {
        setJdError('Failed to read file. Please try again or paste the text manually.');
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps: getJdRootProps, getInputProps: getJdInputProps, isDragActive: isJdDragActive } = useDropzone({
    onDrop: onJdDrop,
    accept: ALLOWED_RESUME_TYPES,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  // ─── Clear JD file ────────────────────────────────────────
  const clearJdFile = () => {
    setJdFile(null);
    setJdError('');
  };

  // ─── Analyze ──────────────────────────────────────────────
  const handleAnalyze = async () => {
    setError('');
    setJdError('');

    if (activeTab === 'upload' && !resumeFile) {
      setError('Please upload a resume file.');
      return;
    }
    if (activeTab === 'paste' && !resumeText.trim()) {
      setError('Please paste your resume text.');
      return;
    }
    if (!jdText.trim()) {
      setError('Please provide a job description (upload a file or paste text).');
      return;
    }

    setStep('processing');
    setIsAnalyzing(true);

    try {
      // Step 1: Parse resume
      let resume;
      if (activeTab === 'upload' && resumeFile) {
        resume = await uploadResume(resumeFile);
      } else {
        resume = await pasteResume(resumeText);
      }
      setResume(resume);

      // Step 2: Parse JD
      const jd = await parseJobDescription(jdText);
      setJobDescription(jd);

      // Step 3: Analyze
      const analysis = await analyzeResume(resume, jd);
      setAnalysis(analysis);

      setIsAnalyzing(false);
      navigate('/analysis');
    } catch {
      setError('Something went wrong. Please try again.');
      setStep('input');
      setIsAnalyzing(false);
    }
  };

  const handleDemoClick = () => {
    setResumeText(`John Doe
Software Engineer | San Francisco, CA
john.doe@email.com | (555) 123-4567

SUMMARY
Experienced Software Engineer with 5+ years building web applications...

SKILLS
JavaScript, TypeScript, React, Node.js, HTML, CSS, Git, REST APIs

EXPERIENCE
Software Engineer | TechCorp Inc. | Jan 2021 - Present
- Built customer-facing web applications
- Collaborated with cross-functional teams

EDUCATION
B.S. Computer Science | State University | 2015 - 2019`);

    setJdText(`Senior Frontend Engineer - TechInnovate Inc.

We are looking for a Senior Frontend Engineer to join our product team.
Responsibilities include designing React/TypeScript features, leading architecture,
optimizing performance, mentoring juniors, and building design systems.

Required: React, TypeScript, Next.js, GraphQL, Tailwind CSS, Jest, CI/CD
5+ years of frontend development experience.`);
    setActiveTab('paste');
    setJdActiveTab('paste');
  };

  // ─── Processing animation ─────────────────────────────────
  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mx-auto mb-8 h-20 w-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 p-5 shadow-2xl shadow-primary-200"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900">Analyzing Your Resume</h2>
            <p className="mt-2 text-slate-500">Our AI is comparing your resume with the job description...</p>
            <div className="mt-8 flex flex-col items-center gap-3">
              {['Extracting resume sections...', 'Parsing job description...', 'Matching keywords...', 'Generating ATS score...', 'Preparing suggestions...'].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  {i < 3 ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Clock className="h-4 w-4 text-primary-400" />
                    </motion.div>
                  ) : (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  )}
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="gradient-bg-subtle border-b border-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="mt-1 text-slate-500">Upload your resume and tailor it for any job</p>
            </div>
            <button onClick={handleDemoClick} className="btn-ghost text-sm">
              <Zap className="h-4 w-4" />
              Load Demo Data
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Column - Resume & JD Input */}
          <div className="space-y-6 lg:col-span-3">
            {/* Resume Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                  <FileUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Your Resume</h2>
                  <p className="text-sm text-slate-500">Upload or paste your existing resume</p>
                </div>
              </div>

              {/* Resume Tabs */}
              <div className="mb-6 flex gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => { setActiveTab('upload'); setError(''); }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                    activeTab === 'upload'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Upload className="mr-2 inline h-4 w-4" />
                  Upload File
                </button>
                <button
                  onClick={() => { setActiveTab('paste'); setError(''); }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                    activeTab === 'paste'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <ClipboardPaste className="mr-2 inline h-4 w-4" />
                  Paste Text
                </button>
              </div>

              {activeTab === 'upload' ? (
                <div
                  {...getRootProps()}
                  className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
                    isDragActive
                      ? 'border-primary-400 bg-primary-50'
                      : resumeFile
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-slate-300 bg-slate-50 hover:border-primary-300 hover:bg-primary-50/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  {resumeFile ? (
                    <div className="space-y-2">
                      <CheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
                      <p className="font-medium text-slate-900">{resumeFile.name}</p>
                      <p className="text-sm text-slate-500">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB · Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="font-medium text-slate-700">
                        {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                      </p>
                      <p className="text-sm text-slate-500">PDF, DOCX, or TXT · Max 10MB</p>
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here...&#10;&#10;Example:&#10;John Doe&#10;Software Engineer&#10;john@email.com&#10;&#10;SUMMARY&#10;Experienced software engineer with 5+ years..."
                  className="textarea-field min-h-[200px]"
                />
              )}
            </motion.div>

            {/* JD Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Job Description</h2>
                  <p className="text-sm text-slate-500">Upload a JD file or paste the text below</p>
                </div>
              </div>

              {/* JD Tabs */}
              <div className="mb-6 flex gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => { setJdActiveTab('upload'); setJdError(''); setError(''); }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                    jdActiveTab === 'upload'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Upload className="mr-2 inline h-4 w-4" />
                  Upload File
                </button>
                <button
                  onClick={() => { setJdActiveTab('paste'); setJdError(''); setError(''); }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                    jdActiveTab === 'paste'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <ClipboardPaste className="mr-2 inline h-4 w-4" />
                  Paste Text
                </button>
              </div>

              {/* JD Upload tab */}
              {jdActiveTab === 'upload' ? (
                <div className="space-y-4">
                  {/* File selected state */}
                  {jdFile && !jdError ? (
                    <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-8 w-8 text-emerald-500" />
                          <div>
                            <p className="font-medium text-slate-900">{jdFile.name}</p>
                            <p className="text-sm text-slate-500">
                              {(jdFile.size / 1024 / 1024).toFixed(2)} MB · File loaded successfully
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={clearJdFile}
                          className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Remove file"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">
                        The file text has been extracted. You can review and edit it in the text area below.
                      </p>
                    </div>
                  ) : (
                    /* Dropzone */
                    <div
                      {...getJdRootProps()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
                        isJdDragActive
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-slate-300 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <input {...getJdInputProps()} />
                      <Upload className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 font-medium text-slate-700">
                        {isJdDragActive ? 'Drop the job description here' : 'Upload Job Description File'}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Drag & drop or click to browse
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        PDF, DOCX, or TXT supported · Max 10MB
                      </p>
                    </div>
                  )}

                  {/* JD Error */}
                  {jdError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {jdError}
                    </motion.div>
                  )}

                  {/* JD Textarea for uploaded content */}
                  <textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder={jdFile
                      ? 'Review and edit the extracted job description text...'
                      : 'Upload a job description file above, or switch to "Paste Text" tab to paste manually...'}
                    className="textarea-field min-h-[200px]"
                  />
                </div>
              ) : (
                /* JD Paste tab */
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job description here...&#10;&#10;Include:&#10;- Job title&#10;- Required skills&#10;- Responsibilities&#10;- Qualifications"
                  className="textarea-field min-h-[200px]"
                />
              )}
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Analyze Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-primary w-full py-4 text-base group cursor-pointer"
            >
              <BarChart3 className="h-5 w-5 transition-transform group-hover:scale-110" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Right Column - Recent Versions & Tips */}
          <div className="space-y-6 lg:col-span-2">
            {/* Recent Versions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-400" />
                <h3 className="font-semibold text-slate-900">Recent Versions</h3>
              </div>
              <div className="space-y-3">
                {DEMO_VERSIONS.map((version) => (
                  <div
                    key={version.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-primary-200 hover:bg-primary-50/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">{version.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {new Date(version.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                        version.matchScore >= 70
                          ? 'bg-emerald-50 text-emerald-700'
                          : version.matchScore >= 50
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        <TrendingUp className="h-3 w-3" />
                        {version.matchScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-gradient-to-br from-primary-50 to-accent-50 border-primary-100"
            >
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <h3 className="font-semibold text-slate-900">Pro Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  Use specific metrics & numbers (e.g., "Increased revenue by 25%")
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  Include all relevant keywords from the job description
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  Use strong action verbs (Led, Architected, Optimized)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  Tailor your summary to match the specific role
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
