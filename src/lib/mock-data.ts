import type { Resume, JobDescription, ATSAnalysis, CoverLetter, LinkedInAbout, EmailMessage, ResumeVersion } from '@/types';

export const DEMO_RESUME: Resume = {
  id: 'resume-1',
  name: 'My Resume',
  rawText: `John Doe
Software Engineer | San Francisco, CA
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

SUMMARY
Experienced Software Engineer with 5+ years building web applications. Proficient in JavaScript, React, and Node.js. Passionate about creating efficient, scalable solutions.

SKILLS
JavaScript, TypeScript, React, Node.js, HTML, CSS, Git, REST APIs, SQL, MongoDB, AWS

EXPERIENCE
Software Engineer | TechCorp Inc. | Jan 2021 - Present
- Built and maintained customer-facing web applications
- Worked with team to deliver features on time
- Participated in code reviews and team meetings
- Fixed bugs and improved application performance

Junior Developer | WebStart LLC | Jun 2019 - Dec 2020
- Developed websites for small business clients
- Wrote HTML, CSS, and JavaScript code
- Assisted senior developers with projects

PROJECTS
Task Manager App - A simple task management application
E-commerce Site - Built an online store with React

EDUCATION
B.S. Computer Science | State University | 2015 - 2019

CERTIFICATIONS
AWS Cloud Practitioner`,
  sections: [
    {
      id: 'summary',
      title: 'Professional Summary',
      content: 'Experienced Software Engineer with 5+ years building web applications. Proficient in JavaScript, React, and Node.js. Passionate about creating efficient, scalable solutions.',
    },
    {
      id: 'skills',
      title: 'Skills',
      content: 'JavaScript, TypeScript, React, Node.js, HTML, CSS, Git, REST APIs, SQL, MongoDB, AWS',
    },
    {
      id: 'experience',
      title: 'Work Experience',
      content: `Software Engineer | TechCorp Inc. | Jan 2021 - Present
- Built and maintained customer-facing web applications
- Worked with team to deliver features on time
- Participated in code reviews and team meetings
- Fixed bugs and improved application performance

Junior Developer | WebStart LLC | Jun 2019 - Dec 2020
- Developed websites for small business clients
- Wrote HTML, CSS, and JavaScript code
- Assisted senior developers with projects`,
    },
    {
      id: 'projects',
      title: 'Projects',
      content: `Task Manager App - A simple task management application
E-commerce Site - Built an online store with React`,
    },
    {
      id: 'education',
      title: 'Education',
      content: 'B.S. Computer Science | State University | 2015 - 2019',
    },
    {
      id: 'certifications',
      title: 'Certifications',
      content: 'AWS Cloud Practitioner',
    },
  ],
  createdAt: new Date('2025-01-15'),
  updatedAt: new Date('2025-01-15'),
};

export const DEMO_JOB_DESCRIPTION: JobDescription = {
  id: 'jd-1',
  title: 'Senior Frontend Engineer',
  company: 'TechInnovate Inc.',
  rawText: `Senior Frontend Engineer - TechInnovate Inc.

About Us:
TechInnovate is a fast-growing SaaS company building next-generation collaboration tools for remote teams. We serve over 100,000 users worldwide.

Role Overview:
We are looking for a Senior Frontend Engineer to join our product team. You will lead the development of our web application, mentor junior developers, and drive technical decisions.

Responsibilities:
- Design and implement complex frontend features using React and TypeScript
- Lead architectural decisions for the frontend codebase
- Optimize application performance and bundle size
- Implement comprehensive testing strategies (unit, integration, E2E)
- Mentor junior engineers and conduct thorough code reviews
- Collaborate with UX designers to implement pixel-perfect interfaces
- Drive adoption of best practices and coding standards
- Build and maintain design system components

Required Skills:
- 5+ years of frontend development experience
- Expert-level proficiency in React, TypeScript, and modern JavaScript
- Deep understanding of state management (Redux, Zustand, or similar)
- Experience with Next.js and server-side rendering
- Strong CSS skills including Tailwind CSS and CSS-in-JS solutions
- Experience with GraphQL and REST APIs
- Proficiency in testing frameworks (Jest, React Testing Library, Cypress)
- Experience with CI/CD pipelines and DevOps practices
- Strong understanding of web performance optimization

Preferred Skills:
- Experience with React Native or mobile development
- Knowledge of WebAssembly or Rust
- Contributions to open-source projects
- Experience with design systems (Radix UI, shadcn/ui)
- Familiarity with micro-frontend architecture
- Experience with Docker and containerization

Experience Level:
Senior (5-8 years)

Benefits:
- Competitive salary: $150,000 - $200,000
- Equity package
- Remote-first culture
- Health, dental, and vision insurance
- 401(k) matching
- Annual learning budget`,
  requiredSkills: [
    'React', 'TypeScript', 'JavaScript', 'CSS', 'GraphQL', 'REST APIs',
    'Jest', 'React Testing Library', 'Cypress', 'CI/CD', 'Performance Optimization',
    'Redux', 'Zustand', 'Next.js', 'Tailwind CSS',
  ],
  preferredSkills: [
    'React Native', 'WebAssembly', 'Rust', 'Docker', 'Micro-frontend',
    'Design Systems', 'Radix UI', 'shadcn/ui',
  ],
  responsibilities: [
    'Design and implement complex frontend features using React and TypeScript',
    'Lead architectural decisions for the frontend codebase',
    'Optimize application performance and bundle size',
    'Implement comprehensive testing strategies',
    'Mentor junior engineers and conduct thorough code reviews',
    'Collaborate with UX designers',
    'Drive adoption of best practices and coding standards',
    'Build and maintain design system components',
  ],
  keywords: [
    'React', 'TypeScript', 'JavaScript', 'Next.js', 'CSS', 'Tailwind CSS',
    'GraphQL', 'REST APIs', 'Jest', 'Cypress', 'React Testing Library',
    'CI/CD', 'Performance Optimization', 'State Management', 'Redux', 'Zustand',
    'Server-side Rendering', 'Design Systems', 'Mentoring', 'Code Reviews',
    'CSS-in-JS', 'Docker',
  ],
  experienceLevel: 'Senior (5-8 years)',
  roleTitle: 'Senior Frontend Engineer',
};

export const DEMO_ANALYSIS: ATSAnalysis = {
  matchScore: 52,
  matchedKeywords: [
    'React', 'JavaScript', 'TypeScript', 'CSS', 'REST APIs', 'Git',
  ],
  missingKeywords: [
    'Next.js', 'GraphQL', 'Jest', 'Cypress', 'React Testing Library',
    'CI/CD', 'Performance Optimization', 'State Management', 'Redux',
    'Zustand', 'Server-side Rendering', 'Tailwind CSS', 'Docker',
    'Design Systems', 'Mentoring', 'Code Reviews',
  ],
  weakSections: [
    {
      section: 'Professional Summary',
      issue: 'Too generic and lacks specific achievements or keywords from the JD',
      suggestion: 'Rewrite to highlight frontend expertise, React/TypeScript focus, and leadership capabilities',
    },
    {
      section: 'Work Experience',
      issue: 'Bullet points are vague and lack measurable impact',
      suggestion: 'Add metrics, specific technologies used, and outcomes of your work',
    },
    {
      section: 'Skills',
      issue: 'Missing critical JD keywords like Next.js, GraphQL, Testing frameworks',
      suggestion: 'Add relevant skills that match the job description',
    },
    {
      section: 'Projects',
      issue: 'Descriptions are too brief and don\'t showcase relevant technologies',
      suggestion: 'Expand with tech stack details and measurable results',
    },
  ],
  suggestions: [
    {
      section: 'summary',
      original: DEMO_RESUME.sections[0].content,
      improved: 'Senior Frontend Engineer with 5+ years of experience designing and delivering high-performance web applications. Expert in React, TypeScript, and modern JavaScript, with a proven track record of leading frontend architecture decisions, mentoring engineering teams, and driving product excellence. Passionate about building scalable, accessible, and performant user interfaces that delight users and meet business objectives.',
      changes: ['Added leadership and mentoring language', 'Included architecture and performance keywords', 'Made tone more senior-level'],
    },
    {
      section: 'experience',
      original: `Software Engineer | TechCorp Inc. | Jan 2021 - Present
- Built and maintained customer-facing web applications
- Worked with team to deliver features on time
- Participated in code reviews and team meetings
- Fixed bugs and improved application performance`,
      improved: `Software Engineer | TechCorp Inc. | Jan 2021 - Present
- Led development of 3 customer-facing React/TypeScript web applications serving 50,000+ daily active users, improving user engagement by 35%
- Architected and implemented a reusable component library using React, TypeScript, and Tailwind CSS, reducing development time by 40% across 5 product teams
- Conducted 200+ thorough code reviews, establishing coding standards that reduced production bugs by 28%
- Optimized frontend bundle size by 45% through code splitting, lazy loading, and modern build tool configurations
- Mentored 4 junior developers through pair programming sessions and technical guidance, accelerating their onboarding by 3 weeks`,
      changes: ['Added metrics and measurable impact', 'Included specific technologies', 'Used strong action verbs', 'Added leadership examples'],
    },
    {
      section: 'projects',
      original: `Task Manager App - A simple task management application
E-commerce Site - Built an online store with React`,
      improved: `Task Manager Pro - Full-stack task management application built with React, TypeScript, and Node.js, featuring real-time collaboration, drag-and-drop workflows, and automated notifications. Achieved 99.5% uptime serving 1,000+ active users.

E-commerce Platform - High-performance online store built with React, Next.js, and GraphQL, with server-side rendering for SEO optimization. Implemented advanced filtering, cart management, and Stripe payment integration, processing $200K+ in transactions monthly.`,
      changes: ['Added tech stack details', 'Included measurable outcomes', 'Made descriptions more impactful'],
    },
    {
      section: 'skills',
      original: 'JavaScript, TypeScript, React, Node.js, HTML, CSS, Git, REST APIs, SQL, MongoDB, AWS',
      improved: 'React, TypeScript, Next.js, JavaScript (ES6+), GraphQL, REST APIs, Redux, Zustand, Tailwind CSS, CSS-in-JS, HTML5, CSS3, Jest, React Testing Library, Cypress, CI/CD, Git, Node.js, SQL, MongoDB, Docker, AWS, Performance Optimization, Design Systems',
      changes: ['Reordered by JD priority', 'Added missing keywords', 'Included testing and DevOps tools'],
    },
    {
      section: 'certifications',
      original: 'AWS Cloud Practitioner',
      improved: 'AWS Cloud Practitioner | AWS Certified',
      changes: ['Minor formatting improvement'],
    },
  ],
  keywordDensity: {
    'React': 3,
    'TypeScript': 1,
    'JavaScript': 3,
    'CSS': 1,
    'Node.js': 1,
  },
};

export const DEMO_COVER_LETTER: CoverLetter = {
  id: 'cl-1',
  content: `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the Senior Frontend Engineer position at TechInnovate Inc. With over 5 years of experience building performant, scalable web applications using React and TypeScript, I am excited about the opportunity to contribute to your next-generation collaboration tools.

At TechCorp Inc., I led the development of customer-facing React applications serving 50,000+ daily users, improving engagement by 35%. I also architected a reusable component library that reduced development time by 40% across multiple teams — directly aligning with your need for someone to build and maintain design system components.

What excites me most about TechInnovate is your focus on remote team collaboration. As someone who thrives in remote-first environments, I understand the importance of building intuitive, reliable tools that connect people. Your mission to serve 100,000+ users worldwide resonates with my passion for creating accessible, high-quality software at scale.

I bring deep expertise in modern frontend technologies including React, TypeScript, Next.js, GraphQL, and Tailwind CSS, along with a strong commitment to testing, performance optimization, and mentoring. I would welcome the opportunity to discuss how my experience leading frontend architecture and driving technical excellence can help TechInnovate continue to innovate.

Thank you for your time and consideration.

Best regards,
John Doe`,
  jobDescriptionId: 'jd-1',
  createdAt: new Date(),
};

export const DEMO_LINKEDIN_ABOUT: LinkedInAbout = {
  content: `Senior Frontend Engineer specializing in React, TypeScript, and modern web technologies. I architect and deliver high-performance, scalable applications that drive user engagement and business growth. With 5+ years leading frontend development, I've built component libraries, optimized bundle performance by 45%, and mentored teams to elevate engineering standards. Passionate about design systems, testing excellence, and creating delightful user experiences. Currently seeking opportunities to drive frontend innovation at a forward-thinking company.`,
};

export const DEMO_EMAIL_MESSAGE: EmailMessage = {
  subject: 'Application for Senior Frontend Engineer - John Doe',
  body: `Hi [Hiring Manager Name],

I came across the Senior Frontend Engineer role at TechInnovate Inc. and was immediately drawn to your work in building collaboration tools for remote teams.

With 5+ years of frontend experience at TechCorp Inc., I've led React/TypeScript projects serving 50,000+ users and built component libraries that accelerated development velocity by 40%. Your emphasis on performance optimization, design systems, and mentoring aligns perfectly with my experience.

I'd love to discuss how I can bring my expertise in frontend architecture, team leadership, and web performance to TechInnovate.

My resume is attached. Looking forward to connecting!

Best,
John Doe
john.doe@email.com | (555) 123-4567`,
};

export const DEMO_VERSIONS: ResumeVersion[] = [
  {
    id: 'v-1',
    name: 'TechInnovate - Senior Frontend Engineer',
    resumeId: 'resume-1',
    jobDescriptionId: 'jd-1',
    matchScore: 52,
    content: DEMO_RESUME,
    createdAt: new Date('2025-03-10'),
    template: 'modern',
  },
  {
    id: 'v-2',
    name: 'DataFlow Inc - Full Stack Developer',
    resumeId: 'resume-1',
    jobDescriptionId: 'jd-2',
    matchScore: 68,
    content: DEMO_RESUME,
    createdAt: new Date('2025-03-05'),
    template: 'ats-classic',
  },
  {
    id: 'v-3',
    name: 'CloudBase - React Developer',
    resumeId: 'resume-1',
    jobDescriptionId: 'jd-3',
    matchScore: 73,
    content: DEMO_RESUME,
    createdAt: new Date('2025-02-28'),
    template: 'simple',
  },
];
