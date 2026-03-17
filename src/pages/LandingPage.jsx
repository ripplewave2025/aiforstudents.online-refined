import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap, Wifi, Smartphone, ArrowRight,
  Mail, FileSpreadsheet, Palette, Bot,
  Eye, Building2,
  ChevronRight
} from 'lucide-react';

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── section wrapper ─── */
const Section = ({ children, className = '', dark = false, id }) => (
  <section id={id} className={`relative py-24 md:py-32 px-6 ${dark ? 'bg-[#f4f5f7]' : 'bg-white'} ${className}`}>
    <div className="max-w-6xl mx-auto relative z-10">{children}</div>
  </section>
);

/* ─── timeline step ─── */
const TimelineStep = ({ number, title, description, isLast }) => (
  <motion.div variants={fadeUp} className="flex gap-6 relative">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-800 font-bold text-lg shrink-0 z-10">
        {number}
      </div>
      {!isLast && <div className="absolute top-12 bottom-[-10px] left-6 w-px bg-gradient-to-b from-slate-200 to-transparent" />}
    </div>
    <div className="pb-12 pt-1.5">
      <h4 className="text-slate-900 font-semibold tracking-tight text-xl mb-2">{title}</h4>
      <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
    </div>
  </motion.div>
);

/* ─── checklist item ─── */
/* ═══════════════════════════════════════════════════
   LANDING PAGE (Premium Light Theme)
   ═══════════════════════════════════════════════════ */

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans selection:bg-slate-200 selection:text-slate-900">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-slate-900">
              aiforstudents<span className="text-slate-400">.online</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/apply')}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6 pt-32 overflow-hidden bg-[#fafafa]">
        {/* Abstract background elements */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white to-transparent" />
        <div className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full bg-slate-100/50 blur-[100px]" />
        
        <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm mb-8 mt-16">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-slate-600">School Digital Infrastructure</span>
            </motion.div>
            
            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1-[1.1] tracking-tight mb-8 text-slate-900"
            >
              No school should be <span className="text-slate-400">left behind</span><br />in the age of AI.
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            >
              We're not installing software. We're not buying hardware.
              We're opening the door to AI in education — for teachers and students who deserve it just as much as any elite school.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/10 transition-all flex items-center justify-center gap-2 group"
              >
                Activate Your School
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOU ALREADY HAVE ── */}
      <Section dark>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Starting point
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            What your school already has —<br />and that is enough.
          </motion.h2>
          
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-16">
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wifi className="w-6 h-6 text-slate-900" />
              </div>
              <p className="text-slate-900 font-semibold text-lg mb-1">Internet Connection</p>
              <p className="text-slate-500">Any speed works</p>
            </div>
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-left">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-slate-900" />
              </div>
              <p className="text-slate-900 font-semibold text-lg mb-1">2 Devices</p>
              <p className="text-slate-500">Computers or smartphones</p>
            </div>
          </motion.div>
          <motion.p variants={fadeUp} className="text-slate-400 mt-10 font-medium">
            Nothing else is needed to get started.
          </motion.p>
        </motion.div>
      </Section>

      {/* ── THE PROBLEM ── */}
      <Section id="problem">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="max-w-4xl mx-auto items-center"
        >
          <div className="text-center">
            <motion.p variants={fadeUp} className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
              The Problem
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-8 tracking-tight leading-[1.1]">
              The best tools for teachers are free — but locked behind a door.
            </motion.h2>
            
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <motion.p variants={fadeUp} className="text-slate-600 text-xl leading-relaxed font-light">
                Students are ahead at technology because the internet is publicly accessible — no login, no wall, no permission needed.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-600 text-xl leading-relaxed font-light">
                The best tools for teachers in the age of AI are free as well — but locked behind a <span className="text-slate-900 font-medium">domain wall</span>.
              </motion.p>
              
              <motion.div variants={fadeUp} className="mt-10 bg-[#f8f9fa] rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-400" />
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  A school domain works exactly like an <span className="text-slate-900 font-semibold">Aadhaar card</span>. Without Aadhaar, you cannot access government schemes or benefits — even though they exist and are meant for you.
                </p>
                <p className="text-slate-900 text-xl font-semibold font-heading">
                  One domain. One decision. Everything activates.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ── WHAT GETS UNLOCKED ── */}
      <Section dark>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.p variants={fadeUp} className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
              What gets unlocked
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
              Free. Forever.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-xl font-light leading-relaxed">
              Once the domain is registered, these elite tools activate for every teacher and every student — at zero cost.
            </motion.p>
          </div>

          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "Google Workspace for Education", desc: "Gmail, Classroom, Drive, Meet. Unlimited accounts. Teacher sees every student's progress live.", color: "text-blue-600" },
              { icon: FileSpreadsheet, title: "Microsoft 365 Education", desc: "Word, Teams, OneNote, Excel. Free for every teacher in the school.", color: "text-blue-500" },
              { icon: Palette, title: "Canva for Education", desc: "Posters, worksheets, presentations. Free for every teacher to create beautiful content.", color: "text-purple-500" },
              { icon: Bot, title: "AI Learning Tools", desc: "AI tutors in Hindi and local languages. Every student gets a private tutor at home.", color: "text-indigo-500" },
              { icon: Eye, title: "Student Visibility", desc: "See who submitted, who didn't, who is falling behind. In real time.", color: "text-emerald-500" },
              { icon: Building2, title: "Official School Identity", desc: "Every teacher gets name@schoolname.in — a permanent professional email identity.", color: "text-slate-700" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <item.icon className={`w-8 h-8 mb-6 ${item.color}`} strokeWidth={1.5} />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light text-base">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ── THE 30-DAY PROCESS ── */}
      <Section id="process">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          <div className="md:sticky md:top-32">
            <motion.p variants={fadeUp} className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Timeline
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
              From decision to independence.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-xl font-light">
              We handle the complex setup so your school can focus on teaching.
            </motion.p>
          </div>

          <div className="px-4">
            <TimelineStep
              number="1"
              title="Headmaster Signs"
              description="One authorization letter + school registration certificate. Takes 10 minutes. (Requires an internet connection and 2 devices at the school)."
            />
            <TimelineStep
              number="2"
              title="Domain Registered"
              description="Google Workspace for Education applied."
            />
            <TimelineStep
              number="3"
              title="Teachers Onboarded"
              description="Nominate one teacher as an internal contact. Attend one 2-hour training session. First assignment posted on Classroom."
            />
            <TimelineStep
              number="4"
              title="School Owns Everything"
              description="One teacher becomes permanent admin. School is independent forever."
              isLast
            />
          </div>
        </motion.div>
      </Section>

      {/* ── CTA ── */}
      <Section className="bg-slate-900 border-t-0" dark={false}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="text-center text-white"
        >
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            This is the first step.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Like registering for Aadhaar before everything else became possible.
            Within one year, what teachers and students do with these tools will speak for itself.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/apply')}
              className="px-8 py-5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-50 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
              Activate Your School
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="text-slate-500 font-medium tracking-wide mt-8 uppercase text-sm">
            Zero risk. Full ownership.
          </motion.p>
        </motion.div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-slate-300" />
            </div>
            <span className="text-slate-400 font-medium">aiforstudents<span className="text-slate-600">.online</span></span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <button
              onClick={() => navigate('/login')}
              className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
            >
              Operator Panel
            </button>
            <p className="text-slate-500 font-light italic text-center sm:text-right">
              "No school should be left behind in the age of AI."
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
