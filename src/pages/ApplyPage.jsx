import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, GraduationCap, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { createSchoolApplication } from '../lib/pipeline';

const initialForm = {
  school_name: '',
  district: 'Darjeeling',
  board_affiliation: '',
  school_type: '',
  student_count: '',
  teacher_count: '',
  principal_name: '',
  principal_email: '',
  principal_phone: '',
  poc_name: '',
  poc_role: '',
  poc_email: '',
  poc_phone: '',
  website_url: '',
  domain_name: '',
  suite_preference: 'either',
  internet_status: 'mobile',
  device_count: '',
  principal_authorization_ready: false,
  registration_certificate_ready: false,
  dns_access_ready: false,
  current_tools: '',
  implementation_notes: '',
};

const Input = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-slate-600 mb-2">{label}</span>
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none focus:border-slate-400 transition-colors"
    />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-slate-600 mb-2">{label}</span>
    <select
      {...props}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none focus:border-slate-400 transition-colors"
    >
      {children}
    </select>
  </label>
);

const Textarea = ({ label, ...props }) => (
  <label className="block">
    <span className="block text-sm font-medium text-slate-600 mb-2">{label}</span>
    <textarea
      {...props}
      className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none focus:border-slate-400 transition-colors"
    />
  </label>
);

export const ApplyPage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdApplication, setCreatedApplication] = useState(null);

  const readinessCount = useMemo(
    () =>
      [
        form.principal_authorization_ready,
        form.registration_certificate_ready,
        form.dns_access_ready,
      ].filter(Boolean).length,
    [form]
  );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const created = await createSchoolApplication(form);
      setCreatedApplication(created);
      setForm(initialForm);
    } catch (submissionError) {
      setError(submissionError.message || 'Unable to submit your school details right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to website
          </Link>
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Operator login
          </Link>
        </div>

        <div className="grid xl:grid-cols-[0.88fr_1.12fr] gap-8 items-start">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 xl:sticky xl:top-8"
          >
            <div className="bg-white border border-slate-200 rounded-[30px] p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-semibold mb-3">School intake</p>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-slate-900 leading-[1.05] tracking-tight mb-5">
                Start your school onboarding request.
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                This form creates your school record inside the onboarding pipeline so we can move from principal authorization to setup, training, and handoff without losing context.
              </p>
            </div>

            <div className="bg-[#111827] text-white rounded-[30px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck2 className="w-5 h-5 text-emerald-300" />
                <h2 className="font-semibold text-lg">What helps us move faster</h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>Principal name and direct contact</li>
                <li>One point of contact for day-to-day coordination</li>
                <li>Registration or affiliation certificate readiness</li>
                <li>Clarity on whether domain/DNS access already exists</li>
                <li>Basic device and internet reality at the school</li>
              </ul>
              <div className="mt-6 rounded-2xl bg-white/10 border border-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300 font-semibold mb-2">Readiness snapshot</p>
                <p className="text-3xl font-semibold">{readinessCount}/3</p>
                <p className="text-sm text-slate-300 mt-1">Critical document and access signals currently ready.</p>
              </div>
            </div>

            {createdApplication ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-[30px] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                  <h2 className="font-semibold text-lg">Request received</h2>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Your school has been added to the onboarding pipeline.
                </p>
                <div className="bg-white border border-emerald-100 rounded-2xl p-4 text-sm text-slate-600">
                  <p><span className="font-semibold text-slate-900">School:</span> {createdApplication.school_name}</p>
                  <p><span className="font-semibold text-slate-900">Reference:</span> {createdApplication.id}</p>
                  <p><span className="font-semibold text-slate-900">Initial stage:</span> New Lead</p>
                </div>
              </div>
            ) : null}
          </motion.aside>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-[30px] p-8 md:p-10 shadow-xl shadow-slate-200/50 space-y-10"
          >
            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-semibold mb-2">School profile</p>
                <h2 className="text-2xl font-semibold text-slate-900">Tell us about the school</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="School name" value={form.school_name} onChange={(event) => updateField('school_name', event.target.value)} placeholder="Lamahatta Government High School" required />
                <Input label="District" value={form.district} onChange={(event) => updateField('district', event.target.value)} placeholder="Darjeeling" required />
                <Select label="Board affiliation" value={form.board_affiliation} onChange={(event) => updateField('board_affiliation', event.target.value)} required>
                  <option value="">Select board</option>
                  <option value="WBBSE">WBBSE</option>
                  <option value="WBCHSE">WBCHSE</option>
                  <option value="CBSE">CBSE</option>
                  <option value="CISCE">CISCE</option>
                  <option value="Other">Other</option>
                </Select>
                <Select label="School type" value={form.school_type} onChange={(event) => updateField('school_type', event.target.value)} required>
                  <option value="">Select type</option>
                  <option value="Government">Government</option>
                  <option value="Government Aided">Government Aided</option>
                  <option value="Private">Private</option>
                  <option value="Trust / NGO">Trust / NGO</option>
                </Select>
                <Input label="Approximate student count" type="number" min="0" value={form.student_count} onChange={(event) => updateField('student_count', event.target.value)} placeholder="250" />
                <Input label="Approximate teacher count" type="number" min="0" value={form.teacher_count} onChange={(event) => updateField('teacher_count', event.target.value)} placeholder="15" />
              </div>
            </section>

            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-semibold mb-2">Contacts</p>
                <h2 className="text-2xl font-semibold text-slate-900">Who should we coordinate with?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Principal / headmaster name" value={form.principal_name} onChange={(event) => updateField('principal_name', event.target.value)} placeholder="Principal name" required />
                <Input label="Principal email" type="email" value={form.principal_email} onChange={(event) => updateField('principal_email', event.target.value)} placeholder="principal@school.edu" required />
                <Input label="Principal phone" value={form.principal_phone} onChange={(event) => updateField('principal_phone', event.target.value)} placeholder="+91" />
                <Input label="Point of contact name" value={form.poc_name} onChange={(event) => updateField('poc_name', event.target.value)} placeholder="Teacher champion / IT lead" required />
                <Input label="Point of contact role" value={form.poc_role} onChange={(event) => updateField('poc_role', event.target.value)} placeholder="Teacher / IT Coordinator / Administrator" required />
                <Input label="Point of contact email" type="email" value={form.poc_email} onChange={(event) => updateField('poc_email', event.target.value)} placeholder="teacher@school.edu" required />
                <Input label="Point of contact phone" value={form.poc_phone} onChange={(event) => updateField('poc_phone', event.target.value)} placeholder="+91" />
              </div>
            </section>

            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-semibold mb-2">Technical readiness</p>
                <h2 className="text-2xl font-semibold text-slate-900">What already exists?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Website URL" value={form.website_url} onChange={(event) => updateField('website_url', event.target.value)} placeholder="https://schoolname.org" />
                <Input label="Current domain" value={form.domain_name} onChange={(event) => updateField('domain_name', event.target.value)} placeholder="schoolname.org" />
                <Select label="Preferred suite" value={form.suite_preference} onChange={(event) => updateField('suite_preference', event.target.value)}>
                  <option value="either">Either Google or Microsoft</option>
                  <option value="google">Google Workspace for Education</option>
                  <option value="microsoft">Microsoft 365 Education</option>
                  <option value="not_sure">Not sure yet</option>
                </Select>
                <Select label="Internet status" value={form.internet_status} onChange={(event) => updateField('internet_status', event.target.value)}>
                  <option value="mobile">Mobile hotspot / intermittent</option>
                  <option value="broadband">Broadband</option>
                  <option value="mixed">Mixed access</option>
                  <option value="none">No reliable internet</option>
                  <option value="not_sure">Not sure</option>
                </Select>
                <Input label="Approximate devices available" type="number" min="0" value={form.device_count} onChange={(event) => updateField('device_count', event.target.value)} placeholder="2" />
              </div>
              <Textarea label="Current tools or constraints" value={form.current_tools} onChange={(event) => updateField('current_tools', event.target.value)} placeholder="Examples: teachers use personal Gmail, only WhatsApp groups exist, website is managed by a local vendor, etc." />
            </section>

            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-semibold mb-2">Document readiness</p>
                <h2 className="text-2xl font-semibold text-slate-900">Which items are already available?</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  ['principal_authorization_ready', 'Principal authorization can be provided quickly'],
                  ['registration_certificate_ready', 'Registration or affiliation certificate is ready'],
                  ['dns_access_ready', 'Someone can access the domain/DNS settings'],
                ].map(([field, label]) => (
                  <label key={field} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 cursor-pointer">
                    <input type="checkbox" checked={form[field]} onChange={(event) => updateField(field, event.target.checked)} className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900" />
                    <span className="text-sm text-slate-700">{label}</span>
                  </label>
                ))}
              </div>
              <Textarea label="Anything else we should know?" value={form.implementation_notes} onChange={(event) => updateField('implementation_notes', event.target.value)} placeholder="Any deadlines, exam schedules, local constraints, or opportunities." />
            </section>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Mail className="w-4 h-4" />
                This submission creates a new lead in the onboarding pipeline.
              </div>
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 text-white px-6 py-3.5 font-semibold hover:bg-slate-800 disabled:opacity-70 transition-colors">
                {submitting ? 'Submitting...' : 'Create school record'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};
