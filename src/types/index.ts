export interface ResumeSection {
  id: string;
  title: string;
  content: string;
  suggestions?: Suggestion[];
}

export interface Resume {
  id: string;
  name: string;
  sections: ResumeSection[];
  rawText: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobDescription {
  id: string;
  title: string;
  company?: string;
  rawText: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  keywords: string[];
  experienceLevel: string;
  roleTitle: string;
}

export interface ATSAnalysis {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  weakSections: WeakSection[];
  suggestions: SectionSuggestion[];
  keywordDensity: Record<string, number>;
}

export interface WeakSection {
  section: string;
  issue: string;
  suggestion: string;
}

export interface SectionSuggestion {
  section: string;
  original: string;
  improved: string;
  changes: string[];
}

export interface Suggestion {
  type: 'improvement' | 'keyword' | 'formatting';
  text: string;
  replacement?: string;
}

export interface CoverLetter {
  id: string;
  content: string;
  jobDescriptionId: string;
  createdAt: Date;
}

export interface LinkedInAbout {
  content: string;
}

export interface EmailMessage {
  subject: string;
  body: string;
}

export interface ResumeVersion {
  id: string;
  name: string;
  resumeId: string;
  jobDescriptionId: string;
  matchScore: number;
  content: Resume;
  createdAt: Date;
  template: 'simple' | 'modern' | 'ats-classic';
}

export type ResumeTemplate = 'simple' | 'modern' | 'ats-classic';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
}

export type AnalysisStep = 'upload' | 'analyze' | 'results' | 'edit' | 'export';
