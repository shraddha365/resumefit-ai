import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileEdit, Download, Copy, Check, Eye, EyeOff, Sparkles,
  FileText, Layout, ChevronDown, ChevronUp, ArrowLeft,
  RefreshCw, Share2, CheckCircle, Zap, Printer, FileDown
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { generateCoverLetter, generateLinkedInAbout, generateEmailMessage, exportPDF, exportDOCX } from '@/lib/api';
import type { ResumeTemplate } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const templates: { value: ResumeTemplate; label: string; description: string }[] = [
  { value: 'simple', label: 'Simple', description: 'Clean and minimal' },
  { value: 'modern', label: 'Modern', description: 'Contemporary with flair' },
  { value: 'ats-classic', label: 'ATS Classic', description: 'Optimized for ATS parsing' },
];

export default function Editor() {
  const navigate = useNavigate();
  const {
    editableSections, setEditableSections, updateSection,
    tailoredSections, newScore, analysis,
    selectedTemplate, setSelectedTemplate,
    coverLetter, setCoverLetter, isGeneratingCover, setIsGeneratingCover,
    linkedInAbout, setLinkedInAbout,
    emailMessage, setEmailMessage,
    resume, jobDescription,
  } = useAppStore();

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter' | 'linkedin' | 'email'>('resume');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (tailoredSections) {
      setEditableSections(tailoredSections);
    } else if (!resume) {
      navigate('/dashboard');
    }
  }, [tailoredSections, setEditableSections, resume, navigate]);

  const handleCopy = async (text: string, sectionId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const content = buildResumeContent();
      const blob = await exportPDF(content);
      downloadBlob(blob, 'tailored-resume.pdf');
    } catch {
      // Fallback download
      downloadTextFile('tailored-resume.txt', buildResumeContent());
    }
    setIsExporting(false);
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    try {
      const content = buildResumeContent();
      const blob = await exportDOCX(content);
      downloadBlob(blob, 'tailored-resume.docx');
    } catch {
      downloadTextFile('tailored-resume.txt', buildResumeContent());
    }
    setIsExporting(false);
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    downloadBlob(blob, filename);
  };

  const buildResumeContent = () => {
    return editableSections
      .map((s) => `${s.title.toUpperCase()}\n${s.content}\n`)
      .join('\n');
  };

  const handleGenerateCoverLetter = async () => {
    if (!resume || !jobDescription) return;
    setIsGeneratingCover(true);
    try {
      const cl = await generateCoverLetter(resume, jobDescription);
      setCoverLetter(cl);
    } catch {}
    setIsGeneratingCover(false);
  };

  const handleGenerateLinkedIn = async () => {
    if (!resume || !jobDescription) return;
    try {
      const la = await generateLinkedInAbout(resume, jobDescription);
      setLinkedInAbout(la);
    } catch {}
  };

  const handleGenerateEmail = async () => {
    if (!resume || !jobDescription) return;
    try {
      const em = await generateEmailMessage(resume, jobDescription);
      setEmailMessage(em);
    } catch {}
  };

  const getOriginalContent = (sectionId: string) => {
    if (!analysis) return '';
    const suggestion = analysis.suggestions.find((s) => s.section === sectionId);
    return suggestion?.original || '';
  };

  if (!editableSections.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
          <Sparkles className="h-10 w-10 text-primary-400" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Top Bar */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/analysis')} className="btn-ghost text-sm p-2">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Resume Editor</h1>
                <p className="text-xs text-slate-500">
                  {newScore && (
                    <span className="font-semibold text-emerald-600">
                      ATS Score: {newScore}% (+{newScore - (analysis?.matchScore || 0)}%)
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
                {templates.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedTemplate(t.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedTemplate === t.value
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                    title={t.description}
                  >
                    <Layout className="mr-1 inline h-3 w-3" />
                    {t.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                className={`btn-ghost text-sm ${showBeforeAfter ? 'bg-primary-50 text-primary-700' : ''}`}
              >
                <RefreshCw className="h-4 w-4" />
                Before/After
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-ghost text-sm"
              >
                {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-5' : 'lg:grid-cols-1 max-w-3xl mx-auto'}`}>
          {/* Left - Editable Sections */}
          <div className={`space-y-4 ${showPreview ? 'lg:col-span-3' : ''}`}>
            {/* Tabs */}
            <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
              {[
                { id: 'resume', label: 'Resume', icon: FileEdit },
                { id: 'cover-letter', label: 'Cover Letter', icon: FileText },
                { id: 'linkedin', label: 'LinkedIn', icon: Share2 },
                { id: 'email', label: 'Email', icon: Zap },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <tab.icon className="mr-1 inline h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Resume Sections */}
            {activeTab === 'resume' && editableSections.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-100 to-accent-100">
                      <FileEdit className="h-4 w-4 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{section.title}</h3>
                    {section.suggestions && section.suggestions.length > 0 && (
                      <span className="badge-info">{section.suggestions.length} AI changes</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(section.content, section.id);
                      }}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
                      title="Copy section"
                    >
                      {copiedSection === section.id ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    {activeSection === section.id ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {activeSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3">
                        {/* Before/After Comparison */}
                        {showBeforeAfter && getOriginalContent(section.id) && (
                          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs font-semibold text-amber-700 mb-1">ORIGINAL</p>
                            <p className="text-xs text-amber-800 whitespace-pre-wrap">{getOriginalContent(section.id)}</p>
                          </div>
                        )}

                        {/* Editable Textarea */}
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, e.target.value)}
                          className="textarea-field min-h-[150px] text-sm font-mono"
                        />

                        {/* AI Suggestions */}
                        {section.suggestions && section.suggestions.length > 0 && (
                          <div className="rounded-xl border border-primary-200 bg-primary-50 p-3">
                            <p className="text-xs font-semibold text-primary-700 mb-2 flex items-center gap-1">
                              <Sparkles className="h-3.5 w-3.5" />
                              AI IMPROVEMENTS MADE
                            </p>
                            <ul className="space-y-1">
                              {section.suggestions.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-primary-800">
                                  <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary-500" />
                                  {s.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Cover Letter Tab */}
            {activeTab === 'cover-letter' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-500" />
                  Cover Letter
                </h3>
                {coverLetter ? (
                  <div>
                    <textarea
                      value={coverLetter.content}
                      onChange={(e) => setCoverLetter({ ...coverLetter, content: e.target.value })}
                      className="textarea-field min-h-[300px] text-sm"
                    />
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(coverLetter.content, 'cover-letter')}
                        className="btn-secondary text-sm"
                      >
                        {copiedSection === 'cover-letter' ? (
                          <><Check className="h-4 w-4 text-emerald-500" /> Copied</>
                        ) : (
                          <><Copy className="h-4 w-4" /> Copy</>
                        )}
                      </button>
                      <button
                        onClick={() => downloadTextFile('cover-letter.txt', coverLetter.content)}
                        className="btn-secondary text-sm"
                      >
                        <Download className="h-4 w-4" /> Download
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <FileText className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500 mb-4">Generate a personalized cover letter for this job</p>
                    <button
                      onClick={handleGenerateCoverLetter}
                      disabled={isGeneratingCover}
                      className="btn-primary"
                    >
                      {isGeneratingCover ? 'Generating...' : 'Generate Cover Letter'}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* LinkedIn Tab */}
            {activeTab === 'linkedin' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary-500" />
                  LinkedIn About Section
                </h3>
                {linkedInAbout ? (
                  <div>
                    <textarea
                      value={linkedInAbout.content}
                      onChange={(e) => setLinkedInAbout({ content: e.target.value })}
                      className="textarea-field min-h-[200px] text-sm"
                    />
                    <div className="mt-3">
                      <button
                        onClick={() => handleCopy(linkedInAbout.content, 'linkedin')}
                        className="btn-secondary text-sm"
                      >
                        {copiedSection === 'linkedin' ? (
                          <><Check className="h-4 w-4 text-emerald-500" /> Copied</>
                        ) : (
                          <><Copy className="h-4 w-4" /> Copy</>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Share2 className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500 mb-4">Generate an optimized LinkedIn About section</p>
                    <button onClick={handleGenerateLinkedIn} className="btn-primary">
                      Generate LinkedIn About
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Email Tab */}
            {activeTab === 'email' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-500" />
                  Job Application Email
                </h3>
                {emailMessage ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500">SUBJECT</label>
                      <input
                        value={emailMessage.subject}
                        onChange={(e) => setEmailMessage({ ...emailMessage, subject: e.target.value })}
                        className="input-field text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500">BODY</label>
                      <textarea
                        value={emailMessage.body}
                        onChange={(e) => setEmailMessage({ ...emailMessage, body: e.target.value })}
                        className="textarea-field min-h-[250px] text-sm mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(`${emailMessage.subject}\n\n${emailMessage.body}`, 'email')}
                        className="btn-secondary text-sm"
                      >
                        {copiedSection === 'email' ? (
                          <><Check className="h-4 w-4 text-emerald-500" /> Copied</>
                        ) : (
                          <><Copy className="h-4 w-4" /> Copy All</>
                        )}
                      </button>
                      <button
                        onClick={() => downloadTextFile('job-application-email.txt', `${emailMessage.subject}\n\n${emailMessage.body}`)}
                        className="btn-secondary text-sm"
                      >
                        <Download className="h-4 w-4" /> Download
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Zap className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500 mb-4">Generate a job application email message</p>
                    <button onClick={handleGenerateEmail} className="btn-primary">
                      Generate Email
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Right - Resume Preview */}
          {showPreview && (
            <div className="lg:col-span-2">
              <div className="sticky top-36 space-y-4">
                {/* Preview Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary-500" />
                    Preview
                    <span className="text-xs font-normal text-slate-400">
                      ({selectedTemplate})
                    </span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="btn-secondary text-xs"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      PDF
                    </button>
                    <button
                      onClick={handleExportDOCX}
                      disabled={isExporting}
                      className="btn-secondary text-xs"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      DOCX
                    </button>
                    <button
                      onClick={() => {
                        handleCopy(buildResumeContent(), 'full-resume');
                      }}
                      className="btn-secondary text-xs"
                    >
                      {copiedSection === 'full-resume' ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button onClick={() => window.print()} className="btn-ghost text-xs">
                      <Printer className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Resume Preview Card */}
                <motion.div
                  layout
                  className={`rounded-2xl border bg-white p-8 shadow-xl print:shadow-none print:border-none print:p-0 ${
                    selectedTemplate === 'modern'
                      ? 'border-primary-100'
                      : selectedTemplate === 'simple'
                      ? 'border-slate-200'
                      : 'border-slate-200 font-mono'
                  }`}
                >
                  <div className={`space-y-6 ${selectedTemplate === 'ats-classic' ? 'font-mono text-sm' : ''}`}>
                    {editableSections.map((section) => (
                      <div key={section.id}>
                        <h3
                          className={`font-bold uppercase tracking-wide mb-2 ${
                            selectedTemplate === 'modern'
                              ? 'text-primary-700 border-b-2 border-primary-200 pb-1 text-sm'
                              : selectedTemplate === 'simple'
                              ? 'text-slate-900 border-b border-slate-200 pb-1 text-xs'
                              : 'text-slate-900 border-b border-slate-300 pb-1 text-xs'
                          }`}
                        >
                          {section.title}
                        </h3>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
