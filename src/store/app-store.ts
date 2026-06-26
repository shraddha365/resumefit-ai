import { create } from 'zustand';
import type { Resume, JobDescription, ATSAnalysis, ResumeSection, CoverLetter, LinkedInAbout, EmailMessage, ResumeTemplate } from '@/types';

interface AppState {
  // Resume
  resume: Resume | null;
  setResume: (resume: Resume) => void;

  // Job Description
  jobDescription: JobDescription | null;
  setJobDescription: (jd: JobDescription) => void;

  // Analysis
  analysis: ATSAnalysis | null;
  setAnalysis: (analysis: ATSAnalysis) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;

  // Tailored Resume
  tailoredSections: ResumeSection[] | null;
  newScore: number | null;
  setTailoredResume: (sections: ResumeSection[], score: number) => void;
  isTailoring: boolean;
  setIsTailoring: (v: boolean) => void;

  // Cover Letter
  coverLetter: CoverLetter | null;
  setCoverLetter: (cl: CoverLetter) => void;
  isGeneratingCover: boolean;
  setIsGeneratingCover: (v: boolean) => void;

  // LinkedIn
  linkedInAbout: LinkedInAbout | null;
  setLinkedInAbout: (la: LinkedInAbout) => void;

  // Email
  emailMessage: EmailMessage | null;
  setEmailMessage: (em: EmailMessage) => void;

  // Template
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: (t: ResumeTemplate) => void;

  // Editable sections
  editableSections: ResumeSection[];
  setEditableSections: (sections: ResumeSection[]) => void;
  updateSection: (id: string, content: string) => void;

  // Reset
  resetAll: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  resume: null,
  setResume: (resume) => set({ resume }),

  jobDescription: null,
  setJobDescription: (jd) => set({ jobDescription: jd }),

  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
  isAnalyzing: false,
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),

  tailoredSections: null,
  newScore: null,
  setTailoredResume: (sections, score) => set({ tailoredSections: sections, newScore: score }),
  isTailoring: false,
  setIsTailoring: (v) => set({ isTailoring: v }),

  coverLetter: null,
  setCoverLetter: (cl) => set({ coverLetter: cl }),
  isGeneratingCover: false,
  setIsGeneratingCover: (v) => set({ isGeneratingCover: v }),

  linkedInAbout: null,
  setLinkedInAbout: (la) => set({ linkedInAbout: la }),

  emailMessage: null,
  setEmailMessage: (em) => set({ emailMessage: em }),

  selectedTemplate: 'modern',
  setSelectedTemplate: (t) => set({ selectedTemplate: t }),

  editableSections: [],
  setEditableSections: (sections) => set({ editableSections: sections }),
  updateSection: (id, content) =>
    set((state) => ({
      editableSections: state.editableSections.map((s) =>
        s.id === id ? { ...s, content } : s
      ),
    })),

  resetAll: () =>
    set({
      resume: null,
      jobDescription: null,
      analysis: null,
      tailoredSections: null,
      newScore: null,
      coverLetter: null,
      linkedInAbout: null,
      emailMessage: null,
      editableSections: [],
      isAnalyzing: false,
      isTailoring: false,
      isGeneratingCover: false,
    }),
}));
