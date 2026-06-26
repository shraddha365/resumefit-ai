import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-sm"
        >
          <Link to="/" className="mb-10 inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-slate-900">ResumeFit</span>
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> AI</span>
            </span>
          </Link>

          {!isSent ? (
            <>
              <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
              <p className="mt-2 text-slate-500">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn-primary w-full group">
                  {isLoading ? 'Sending...' : (
                    <>
                      Send Reset Link
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Check your email</h2>
              <p className="mt-2 text-slate-500">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <button
                onClick={() => { setIsSent(false); setEmail(''); }}
                className="btn-secondary mt-6"
              >
                Send again
              </button>
            </motion.div>
          )}

          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </motion.div>
      </div>

      {/* Right - Gradient Panel */}
      <div className="hidden flex-1 lg:flex">
        <div className="relative flex w-full items-center justify-center bg-gradient-to-br from-primary-600 via-accent-500 to-accent-600">
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />
          <div className="relative p-12 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-white/80" />
            <h2 className="mt-4 text-2xl font-bold text-white">No worries!</h2>
            <p className="mt-2 text-white/70">
              We'll help you get back into your account quickly and securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
