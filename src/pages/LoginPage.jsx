import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Lock, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = location.state?.from || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate(redirectPath, { replace: true });
      return;
    }

    setError(result.error || 'Unable to sign in.');
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] px-6 py-12">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Internal operator access
          </div>

          <div>
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.05] mb-5">
              Operator login for the school onboarding pipeline.
            </h1>
            <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
              Use this dashboard to move schools from first contact to handoff:
              documents, domain setup, workspace activation, teacher training, and case-study capture.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Track every school by stage, priority, and due date.',
              'Capture implementation notes without relying on scattered chats.',
              'Use Supabase in production or demo mode locally.',
              'Keep the public website separate from internal operator work.',
            ].map((item) => (
              <div key={item} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-[28px] shadow-xl shadow-slate-200/60 p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-semibold">AIforStudents</p>
              <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="operator@aiforstudents.online"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3.5 text-slate-900 outline-none focus:border-slate-400 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3.5 text-slate-900 outline-none focus:border-slate-400 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <div className="bg-[#f6f7fb] border border-slate-200 rounded-2xl p-4 text-sm text-slate-600">
              Demo mode works without Supabase. Use <span className="font-semibold text-slate-900">demo@operator</span> or <span className="font-semibold text-slate-900">demo@admin</span>.
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 text-white py-3.5 font-semibold hover:bg-slate-800 disabled:opacity-70 transition-colors"
            >
              {submitting ? 'Signing in...' : 'Open pipeline'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="mt-6 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            Back to public site
          </button>
        </motion.div>
      </div>
    </div>
  );
};
