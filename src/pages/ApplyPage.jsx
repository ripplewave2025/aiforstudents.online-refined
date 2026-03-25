import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, GraduationCap, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { createSchoolApplication } from '../lib/pipeline';

const LightSweep = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
    <div
      className="absolute top-0 h-full w-[60px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
      style={{ animation: 'lightSweep 5s 1s ease-in-out infinite' }}
    />
  </div>
);

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#45474c] mb-2">{label}</span>
    <input
      {...props}
      className="w-full rounded-xl border-0 bg-[#f3f4f5] px-4 py-3.5 text-[#191c1d] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[rgba(9,20,38,0.12)] transition-all placeholder:text-[#75777d]"
    />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#45474c] mb-2">{label}</span>
    <select
      {...props}
      className="w-full rounded-xl border-0 bg-[#f3f4f5] px-4 py-3.5 text-[#191c1d] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[rgba(9,20,38,0.12)] transition-all"
    >
      {children}
    </select>
  </label>
);

const Textarea = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#45474c] mb-2">{label}</span>
    <textarea
      {...props}
      className="w-full min-h-[120px] rounded-xl border-0 bg-[#f3f4f5] px-4 py-3.5 text-[#191c1d] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[rgba(9,20,38,0.12)] resize-y transition-all placeholder:text-[#75777d]"
    />
  </label>
);

const initialForm = {
  school_name: '',
  poc_phone: '',
  contact_preference: 'Call me',
  implementation_notes: '',
  // Default remaining pipeline fields to skip the complex original form
  district: 'Darjeeling',
  poc_name: 'Fast Track Applicant',
  source: 'website_fast_form'
};

export const ApplyPage = () => {
  const [form, setForm]                     = useState(initialForm);
  const [submitting, setSubmitting]         = useState(false);
  const [error, setError]                   = useState('');
  const [createdApplication, setCreatedApplication] = useState(null);

  const updateField = (field, value) => setForm((cur) => ({ ...cur, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    
    // We map the minimal fields into the pipeline expectation
    const payload = {
      ...form,
      // Map the "Contact me options" into the implementation notes so operators see it
      implementation_notes: `[Prefers: ${form.contact_preference}]\n\n${form.implementation_notes}`
    };

    try {
      const created = await createSchoolApplication(payload);
      setCreatedApplication(created);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || 'Unable to submit your school details right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (createdApplication) {
    return (
      <div className="min-h-screen bg-[#f3f4f5] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(9,20,38,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[24px] p-10 shadow-[0_20px_60px_rgba(25,28,29,0.08)] max-w-md w-full text-center relative overflow-hidden">
          <LightSweep />
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-heading text-3xl font-semibold text-[#191c1d] mb-4">Request received</h2>
          <p className="text-[#45474c] leading-relaxed mb-8 font-light">
            Thank you for reaching out. We will connect with you via your preferred contact method shortly.
          </p>
          <Link to="/" className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold">
            Return to homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f5] px-6 py-10 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Glow orbs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(9,20,38,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(30,41,59,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="w-full max-w-xl relative z-10">
        {/* Top nav */}
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[#45474c] hover:text-[#191c1d] transition-colors text-sm font-light">
            <ArrowLeft className="w-4 h-4" />
            Back to website
          </Link>
        </div>

        {/* ── Form ── */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_20px_60px_rgba(25,28,29,0.08)] relative overflow-hidden"
        >
          <LightSweep />

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#45474c] font-semibold mb-1">Fast Track</p>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-[#191c1d] leading-tight tracking-tight">
                Activate Your School
              </h1>
            </div>
          </div>

          <div className="space-y-5">
            <Input 
              label="School Name" 
              value={form.school_name} 
              onChange={(e) => updateField('school_name', e.target.value)} 
              placeholder="e.g. Lamahatta High School" 
              required 
            />
            
            <Input 
              label="Phone Number" 
              value={form.poc_phone} 
              onChange={(e) => updateField('poc_phone', e.target.value)} 
              placeholder="+91" 
              required 
            />

            <Select 
              label="Contact me via" 
              value={form.contact_preference} 
              onChange={(e) => updateField('contact_preference', e.target.value)}
            >
              <option value="Call me">Call me</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
            </Select>

            <Textarea 
              label="A little message" 
              value={form.implementation_notes} 
              onChange={(e) => updateField('implementation_notes', e.target.value)} 
              placeholder="Any specific questions or details?" 
            />
          </div>

          {error && <p className="text-sm text-rose-600 mt-4">{error}</p>}

          <div className="flex flex-col gap-4 pt-8">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 font-semibold disabled:opacity-70 text-base"
            >
              {submitting ? 'Sending...' : 'Send Request'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center justify-center gap-2 text-xs text-[#45474c] font-light text-center">
              <Mail className="w-3.5 h-3.5" />
              We will reach out to the provided contact shortly.
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};
