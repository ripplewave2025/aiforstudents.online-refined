import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, Lock, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const LightSweep = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
    <div
      className="absolute top-0 h-full w-[60px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
      style={{ animation: 'lightSweep 4s 0.5s ease-in-out infinite' }}
    />
  </div>
);

export const LoginPage = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { login } = useAuth();
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [error,      setError]      = useState('');
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
    <div className="min-h-screen bg-[#f3f4f5] px-6 py-12 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute -top-60 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(9,20,38,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(30,41,59,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center relative z-10">

        {/* ── Left: Operator info ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-[0_4px_16px_rgba(25,28,29,0.08)] text-[#45474c] text-sm font-light relative overflow-hidden">
            <LightSweep />
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            Internal operator access
          </div>

          <div>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#191c1d] tracking-tight leading-[1.08] mb-5">
              Operator login for the school onboarding pipeline.
            </h1>
            <p className="text-[#45474c] text-lg font-light max-w-xl leading-relaxed">
              Use this dashboard to move schools from first contact to handoff: documents, domain setup, workspace activation, teacher training, and case-study capture.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Track every school by stage, priority, and due date.',
              'Capture implementation notes without relying on scattered chats.',
              'Use Supabase in production or demo mode locally.',
              'Keep the public website separate from internal operator work.',
            ].map((item) => (
              <div key={item} className="card-hover bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(25,28,29,0.06)] text-[#45474c] text-sm font-light leading-relaxed relative overflow-hidden">
                <LightSweep />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Login form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(25,28,29,0.10)] p-8 md:p-10 relative overflow-hidden"
        >
          <LightSweep />

          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#45474c] font-semibold">AIforStudents</p>
              <h2 className="font-heading text-2xl font-semibold text-[#191c1d]">Sign in</h2>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#45474c] mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#75777d] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@aiforstudents.online"
                  className="w-full rounded-xl border-0 bg-[#f3f4f5] pl-11 pr-4 py-3.5 text-[#191c1d] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[rgba(9,20,38,0.12)] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#45474c] mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#75777d] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-xl border-0 bg-[#f3f4f5] pl-11 pr-4 py-3.5 text-[#191c1d] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[rgba(9,20,38,0.12)] transition-all"
                />
              </div>
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <div className="rounded-xl bg-[#f8f9fa] p-4 text-sm text-[#45474c] font-light">
              Demo mode works without Supabase. Use{' '}
              <span className="font-semibold text-[#191c1d]">demo@operator</span> or{' '}
              <span className="font-semibold text-[#191c1d]">demo@admin</span>.
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 font-semibold disabled:opacity-70"
            >
              {submitting ? 'Signing in...' : 'Open pipeline'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="mt-6 text-sm text-[#75777d] hover:text-[#191c1d] transition-colors font-light"
          >
            ← Back to public site
          </button>
        </motion.div>
      </div>
    </div>
  );
};
