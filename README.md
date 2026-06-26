# ResumeFit AI

ResumeFit AI is an AI-powered resume tailoring web application that helps users customize their resume according to a specific job description. The app analyzes the resume and job description, identifies matching and missing keywords, calculates an ATS match score, and provides improvement suggestions to make the resume more job-ready and ATS-friendly.

## 🌐 Live Demo

Frontend:

```text
https://resumefit-ai-sepia.vercel.app/
```

Backend:

```text
https://resumefit-ai-server.onrender.com
```

Backend Health Check:

```text
https://resumefit-ai-server.onrender.com/api/health
```

## 🚀 Project Overview

Many candidates use the same resume for multiple job applications, which can reduce their chances of getting shortlisted by Applicant Tracking Systems. ResumeFit AI solves this problem by helping users tailor their resume according to the job description they want to apply for.

The platform allows users to paste or upload their resume, paste a job description, and receive resume improvement insights such as keyword matching, missing skills, weak sections, ATS score, and optimized resume content suggestions.

## ✨ Key Features

* Resume upload or manual resume text input
* Job description paste input
* Resume and job description comparison
* ATS match score calculation
* Matched keywords detection
* Missing keywords detection
* Weak resume section identification
* Resume improvement suggestions
* Tailored professional summary generation
* Experience bullet point improvement
* Skills reordering based on job description priority
* User authentication system
* MongoDB database integration
* Responsive and modern user interface

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## 📁 Project Structure

```text
resumefit-ai
├── public
│   └── images
│       └── hero-illustration.png
│
├── src
│   ├── components
│   │   ├── AuthModal.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── JobDescriptionInput.tsx
│   │   ├── ResumeInput.tsx
│   │   └── ui
│   │
│   ├── lib
│   │   ├── api.ts
│   │   └── utils.ts
│   │
│   ├── pages
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   │
│   ├── store
│   │   └── authStore.ts
│   │
│   ├── types
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── server
│   ├── config
│   │   └── database.js
│   │
│   ├── middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Resume.js
│   │
│   ├── routes
│   │   ├── auth.js
│   │   ├── resume.js
│   │   ├── analysis.js
│   │   └── generate.js
│   │
│   ├── services
│   │   └── resumeAnalyzer.js
│   │
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## ⚙️ Installation and Setup

Clone the repository:

```bash
git clone https://github.com/shraddha365/resumefit-ai.git
cd resumefit-ai
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder and add the following values:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```

For frontend deployment on Vercel, add this environment variable:

```env
VITE_API_URL=https://resumefit-ai-server.onrender.com
```

## ▶️ Run the Project Locally

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

Backend health check:

```text
http://localhost:5000/api/health
```

## 📦 Build for Production

```bash
npm run build
```

## 🚀 Deployment

### Frontend Deployment

The frontend is deployed on Vercel:

```text
https://resumefit-ai-sepia.vercel.app/
```

### Backend Deployment

The backend is deployed on Render:

```text
https://resumefit-ai-server.onrender.com
```

Health check endpoint:

```text
https://resumefit-ai-server.onrender.com/api/health
```

Expected response:

```json
{
  "status": "ok",
  "timestamp": "..."
}
```

## 🎯 Use Case

ResumeFit AI is useful for:

* Students applying for internships
* Freshers applying for entry-level jobs
* Job seekers targeting specific roles
* Candidates who want to improve ATS compatibility
* Users who want a role-specific resume before applying
* Professionals who want quick resume improvement suggestions

## 🔮 Future Improvements

* AI-based complete resume rewriting
* PDF/DOCX resume export
* Resume template selection
* Advanced ATS score explanation
* Cover letter generation
* Dashboard for saved resumes and job descriptions
* Multiple resume version management

## 👩‍💻 Author

**Shraddha Landge**

## 📄 License

This project is created for educational, learning, and portfolio purposes.
