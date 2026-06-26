import type { ATSAnalysis, CoverLetter, LinkedInAbout, EmailMessage, Resume, JobDescription, ResumeSection } from '@/types';
import { DEMO_ANALYSIS, DEMO_COVER_LETTER, DEMO_LINKEDIN_ABOUT, DEMO_EMAIL_MESSAGE, DEMO_RESUME, DEMO_JOB_DESCRIPTION } from './mock-data';

// Simulate API delay
const delay = (ms: number = 1500) => new Promise(resolve => setTimeout(resolve, ms));

export async function uploadResume(file: File): Promise<Resume> {
  await delay(2000);
  const text = await file.text().catch(() => DEMO_RESUME.rawText);
  return {
    ...DEMO_RESUME,
    id: `resume-${Date.now()}`,
    rawText: text || DEMO_RESUME.rawText,
  };
}

export async function pasteResume(text: string): Promise<Resume> {
  await delay(1000);
  return {
    ...DEMO_RESUME,
    id: `resume-${Date.now()}`,
    rawText: text,
  };
}

export async function parseJobDescription(text: string): Promise<JobDescription> {
  await delay(1500);
  return {
    ...DEMO_JOB_DESCRIPTION,
    id: `jd-${Date.now()}`,
    rawText: text,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function analyzeResume(_resume: Resume, _jd: JobDescription): Promise<ATSAnalysis> {
  await delay(2500);
  return DEMO_ANALYSIS;
}

export async function generateTailoredResume(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _resume: Resume,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _jd: JobDescription,
  analysis: ATSAnalysis
): Promise<{ sections: ResumeSection[]; newScore: number }> {
  await delay(3000);
  const improvedSections: ResumeSection[] = analysis.suggestions.map(s => ({
    id: s.section,
    title: DEMO_RESUME.sections.find(sec => sec.id === s.section)?.title || s.section,
    content: s.improved,
    suggestions: s.changes.map(c => ({ type: 'improvement' as const, text: c })),
  }));

  DEMO_RESUME.sections.forEach(section => {
    if (!improvedSections.find(s => s.id === section.id)) {
      improvedSections.push({ ...section });
    }
  });

  const order = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'];
  improvedSections.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return {
    sections: improvedSections,
    newScore: Math.min(98, analysis.matchScore + 35),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateCoverLetter(
  _resume: Resume,
  _jd: JobDescription
): Promise<CoverLetter> {
  await delay(2000);
  return DEMO_COVER_LETTER;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateLinkedInAbout(
  _resume: Resume,
  _jd: JobDescription
): Promise<LinkedInAbout> {
  await delay(1500);
  return DEMO_LINKEDIN_ABOUT;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateEmailMessage(
  _resume: Resume,
  _jd: JobDescription
): Promise<EmailMessage> {
  await delay(1500);
  return DEMO_EMAIL_MESSAGE;
}

export async function exportPDF(content: string): Promise<Blob> {
  await delay(2000);
  return new Blob([content], { type: 'application/pdf' });
}

export async function exportDOCX(content: string): Promise<Blob> {
  await delay(2000);
  return new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}
