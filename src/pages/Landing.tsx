import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Upload, FileSearch, FileEdit, Download, Shield, Zap, Users, ArrowRight,
  CheckCircle, Star, TrendingUp, FileText, Target, BarChart3, Cpu
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  {
    icon: Upload,
    title: 'Upload & Paste',
    description: 'Upload PDF/DOCX or paste your resume text. Our AI extracts and structures all sections automatically.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: FileSearch,
    title: 'ATS Analysis',
    description: 'Get instant ATS match score, matched and missing keywords, and section-by-section improvement suggestions.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: FileEdit,
    title: 'AI Tailoring',
    description: 'AI rewrites your resume with powerful action verbs, measurable impact, and relevant keywords.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Download,
    title: 'Export Ready',
    description: 'Export as ATS-friendly PDF or DOCX. Choose from Simple, Modern, or ATS Classic templates.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Cpu,
    title: 'Cover Letter & More',
    description: 'Generate personalized cover letters, LinkedIn About sections, and job application emails.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Shield,
    title: 'Truthful & Ethical',
    description: 'We never add fake experience or change your real qualifications. Only improve wording and alignment.',
    color: 'from-indigo-500 to-blue-600',
  },
];

const steps = [
  { step: '01', title: 'Upload Your Resume', description: 'Upload your existing resume as PDF/DOCX or paste the text directly.' },
  { step: '02', title: 'Paste Job Description', description: 'Copy and paste the full job description you want to apply for.' },
  { step: '03', title: 'AI Analysis', description: 'Our AI compares your resume against the job description and shows your ATS match score.' },
  { step: '04', title: 'Tailor & Export', description: 'Generate a tailored resume, cover letter, and more. Export in your preferred format.' },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['3 resume analyses per month', 'Basic ATS score', 'PDF export', '1 resume template', 'Cover letter generator'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For serious job seekers',
    features: ['Unlimited resume analyses', 'Advanced ATS optimization', 'PDF & DOCX export', 'All resume templates', 'Cover letter & LinkedIn generator', 'Email message generator', 'Save unlimited versions', 'Priority AI processing'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    description: 'For career coaches & teams',
    features: ['Everything in Pro', 'Team dashboard', 'Bulk resume processing', 'Custom templates', 'API access', 'Dedicated support', 'Analytics & reporting'],
    cta: 'Contact Sales',
    popular: false,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/50" />
        <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary-200/30 to-accent-300/20 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent-200/30 to-primary-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                <Sparkles className="h-4 w-4" />
                AI-Powered Resume Optimization
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            >
              Tailor Your Resume for{' '}
              <span className="gradient-text">Every Job</span>
              {' '}in Seconds
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl"
            >
              Upload your resume, paste a job description, and let AI optimize your resume to beat ATS filters.
              Get a higher match score, powerful bullet points, and a personalized cover letter — all in minutes.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/dashboard" className="btn-primary text-base px-8 py-4 group">
                <Upload className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Upload Your Resume Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#features" className="btn-secondary text-base px-8 py-4">
                See How It Works
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9/5 Rating</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> 10,000+ Users</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><TrendingUp className="h-4 w-4" /> 3x More Interviews</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-title">Everything You Need to Land the Job</h2>
            <p className="section-subtitle">Powerful AI tools to optimize every aspect of your job application</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="card-hover group"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Four simple steps to a perfectly tailored resume</p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-2xl font-bold text-white shadow-lg shadow-primary-200">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.description}</p>
                {i < steps.length - 1 && (
                  <div className="absolute -right-4 top-8 hidden h-0.5 w-8 bg-gradient-to-r from-primary-300 to-accent-300 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '87%', label: 'ATS Match Improvement' },
              { value: '3x', label: 'More Interviews' },
              { value: '50K+', label: 'Resumes Optimized' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold gradient-text sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Start free. Upgrade when you need more power.</p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-primary-300 bg-white shadow-lg shadow-primary-100 ring-2 ring-primary-500/20'
                    : 'border-slate-200 bg-white shadow-sm'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                )}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-accent-500 to-accent-600 p-12 text-center shadow-2xl shadow-primary-200 sm:p-16"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Land Your Dream Job?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Join 10,000+ professionals who have already optimized their resumes with AI.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:shadow-xl active:scale-[0.97]">
                  <Upload className="h-5 w-5" />
                  Upload Your Resume Free
                </Link>
                <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.97]">
                  Create Free Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
