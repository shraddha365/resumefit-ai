import { Link } from 'react-router-dom';
import { Sparkles, Heart, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-slate-900">ResumeFit</span>
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500">
              Tailor your resume for every job in seconds with AI-powered precision.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary-600">Dashboard</Link></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Features</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Pricing</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Templates</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">ATS Guide</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Resume Tips</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">About</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Privacy</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Terms</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-600">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="flex items-center gap-1 text-sm text-slate-400">
            Made with <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400" /> by ResumeFit AI &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Globe className="h-5 w-5" /></a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors"><Mail className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
