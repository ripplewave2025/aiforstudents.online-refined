import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GraduationCap, Wifi, Smartphone, ArrowRight,
  Mail, FileSpreadsheet, Palette, Bot,
  Eye, Building2, Github, Twitter, Instagram,
  Youtube, MapPin, ExternalLink
} from 'lucide-react';

/* ─── animation helpers ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── Decorative Arc SVG ─── */
const ArcDecor = ({ className = '' }) => (
  <svg viewBox="0 0 600 300" className={`absolute pointer-events-none ${className}`} fill="none">
    <path
      d="M 0 250 Q 300 -50 600 250"
      className="arc-line animate-draw-line"
    />
  </svg>
);

/* ─── Glow Orb ─── */
const GlowOrb = ({ size = 400, color = 'rgba(9,20,38,0.06)', className = '' }) => (
  <div
    className={`glow-orb animate-ambient absolute pointer-events-none ${className}`}
    style={{ width: size, height: size, background: color }}
  />
);

/* ─── Timeline step ─── */
const TimelineStep = ({ number, title, description, isLast }) => (
  <motion.div variants={fadeUp} className="flex gap-6 relative">
    <div className="flex flex-col items-center shrink-0">
      <div className="w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center text-primary font-bold text-base z-10 border border-[rgba(9,20,38,0.08)]">
        {number}
      </div>
      {!isLast && (
        <div className="absolute top-11 bottom-0 left-[21px] w-px bg-gradient-to-b from-[rgba(9,20,38,0.15)] to-transparent" />
      )}
    </div>
    <div className="pb-12 pt-1">
      <h4 className="font-heading text-slate-900 font-semibold text-xl mb-2 tracking-tight">{title}</h4>
      <p className="text-[#45474c] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

/* ─── Floating Image Card ─── */
const FloatingCard = ({ rotate = 0, delay = 0, className = '', style = {}, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    style={{ rotate, ...style }}
    whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}
    className={`absolute rounded-2xl shadow-float cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

/* ─── Section wrapper ─── */
const Section = ({ children, className = '', alt = false, id }) => (
  <section
    id={id}
    className={`relative py-28 md:py-36 px-6 overflow-hidden ${alt ? 'bg-[#f3f4f5]' : 'bg-[#f8f9fa]'} ${className}`}
  >
    <div className="max-w-6xl mx-auto relative z-10">{children}</div>
  </section>
);

/* ─── Light sweep shimmer ─── */
const LightSweep = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-0 h-full w-[60px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
      style={{ animation: 'lightSweep 5s 2s ease-in-out infinite' }}
    />
  </div>
);

/* ══════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════ */
export const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef  = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -120]);
  const y2 = useTransform(scrollY, [0, 800], [0, -60]);
  const y3 = useTransform(scrollY, [0, 800], [0, -180]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] overflow-x-hidden font-sans">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-[rgba(9,20,38,0.06)]" style={{ backdropFilter: 'blur(24px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-glow-sm" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-[#191c1d]">
              aiforstudents<span className="text-[#45474c] font-light">.online</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById('founder')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:inline-flex text-sm font-medium text-[#45474c] hover:text-[#191c1d] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#f8f9fa]">
        {/* Background glow orbs */}
        <GlowOrb size={600} color="rgba(9,20,38,0.07)" className="-top-40 -right-40" />
        <GlowOrb size={500} color="rgba(30,41,59,0.05)" className="-bottom-20 -left-20" />

        {/* Arc decoration */}
        <ArcDecor className="top-0 left-0 w-full h-48 opacity-60" />

        <div className="max-w-6xl mx-auto w-full relative z-10 px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left: Hero content */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass shadow-card mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#091426] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c]">
                  School Digital Infrastructure · 2026
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05] font-semibold tracking-tight mb-7 text-[#191c1d]"
              >
                No school should be<br className="hidden sm:block" />
                <span className="text-[#45474c] font-light"> left behind</span> in the<br className="hidden sm:block" />
                age of AI.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-[#45474c] max-w-xl mb-10 leading-relaxed font-light mx-auto lg:mx-0"
              >
                We're unlocking free world-class digital tools for every rural school —
                one domain, one decision, and everything activates.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/apply')}
                  className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                >
                  Activate Your School
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 glass rounded-xl text-[#191c1d] font-medium hover:shadow-card transition-all"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>

            {/* Right: Floating overlapping cards — Obsidian style with explicit parallax */}
            <motion.div className="relative h-[320px] sm:h-[450px] lg:h-[600px] w-full pointer-events-none select-none mt-4 lg:mt-0">
              <FloatingCard rotate={-3} delay={0.3} style={{ y: y1 }} className="w-[60%] lg:w-[65%] top-[5%] lg:top-[12%] right-[5%] lg:right-[10%] z-10 shadow-[0_20px_40px_rgba(9,20,38,0.15)] bg-white p-2 sm:p-3 overflow-hidden">
                <div className="w-full h-full relative rounded-xl sm:rounded-[20px] overflow-hidden aspect-[4/3] shadow-inner">
                  <LightSweep />
                  <img src="/hero_lamahatta.png" alt="Lamahatta" className="w-full h-full object-cover shadow-inner" />
                </div>
              </FloatingCard>
              
              <FloatingCard rotate={2} delay={0.5} style={{ y: y2 }} className="w-[45%] lg:w-[45%] top-[50%] lg:top-[42%] left-[5%] lg:left-[10%] z-20 shadow-[0_20px_40px_rgba(30,41,59,0.15)] overflow-hidden rounded-[24px] sm:rounded-[36px]">
                <div className="w-full aspect-[1/1] sm:aspect-[4/3] bg-gradient-to-br from-[#091426] to-[#1e293b] flex items-center justify-center relative shadow-inner">
                  <LightSweep />
                  <GraduationCap className="w-10 lg:w-16 h-10 lg:h-16 text-white/30" />
                </div>
              </FloatingCard>
              
              <FloatingCard rotate={-1.5} delay={0.7} style={{ y: y3 }} className="w-[48%] lg:w-[40%] bottom-[5%] lg:bottom-[8%] right-[5%] z-30 shadow-[0_20px_40px_rgba(9,20,38,0.12)] bg-white/50 backdrop-blur-3xl overflow-hidden shadow-inner border border-white/40">
                <div className="w-full h-full bg-white/50 flex flex-col items-center justify-center gap-1.5 p-5 text-center relative pointer-events-none">
                  <LightSweep />
                  <p className="text-[10px] lg:text-xs uppercase tracking-widest text-[#45474c] font-semibold mt-1">Schools</p>
                  <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#091426]">400+</p>
                  <p className="text-[9px] lg:text-[10px] text-[#45474c] leading-tight mt-1 mb-1">Across districts</p>
                </div>
              </FloatingCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <Section alt id="vision">
        <GlowOrb size={400} color="rgba(9,20,38,0.04)" className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">Vision & Core Goals</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-[#191c1d]">
              Five pillars of AI-ready schools.
            </motion.h2>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-5">
            {[
              {
                num: '01',
                title: 'Offload Teachers',
                desc: 'Offload repetitive tasks to AI so teachers reclaim time to think deeply and improve education quality.',
              },
              {
                num: '02',
                title: 'Empower Students',
                desc: 'Give students AI study tools with visual progress tracking and teacher oversight — creativity and critical thinking, measured.',
              },
              {
                num: '03',
                title: 'Equip Leadership',
                desc: 'Give principals digital resources and global connections — grants, scholarships, competitions, and discovery, all at their fingertips.',
              },
              {
                num: '04',
                title: 'Rural AI Readiness',
                desc: 'Deliver world-class digital infrastructure for full AI readiness in every rural school, regardless of location.',
              },
              {
                num: '05',
                title: 'Mobile-First Staff',
                desc: 'Equip teachers with the tools to go where the students already are — right in their smartphones.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                custom={i}
                className="card-hover bg-white rounded-2xl p-8 shadow-card group relative overflow-hidden"
              >
                <LightSweep />
                <p className="font-heading text-5xl font-bold text-[#f3f4f5] mb-4 select-none group-hover:text-[#edeeef] transition-colors">{item.num}</p>
                <h3 className="font-heading text-xl font-semibold text-[#191c1d] mb-3">{item.title}</h3>
                <p className="text-[#45474c] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ── WHAT YOU ALREADY HAVE ── */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="text-center">
          <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">Starting Point</motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-[#191c1d]">
            What your school already has —<br />and that is enough.
          </motion.h2>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-12">
            {[
              { Icon: Wifi,       label: 'Internet Connection', sub: 'Any speed works' },
              { Icon: Smartphone, label: '2 Devices',           sub: 'Computers or smartphones' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="card-hover glass rounded-2xl p-8 shadow-card text-left group">
                <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-heading font-semibold text-lg text-[#191c1d] mb-1">{label}</p>
                <p className="text-[#45474c] font-light text-sm">{sub}</p>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-[#45474c] mt-8 font-light">Nothing else is needed to get started.</motion.p>
        </motion.div>
      </Section>

      {/* ── THE PROBLEM ── */}
      <Section alt id="problem">
        <GlowOrb size={500} color="rgba(9,20,38,0.05)" className="-right-40 top-0" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">The Problem</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-8 tracking-tight leading-[1.1] text-[#191c1d]">
              The best tools for teachers are free — but locked behind a door.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg leading-relaxed font-light mb-5">
              Today's students live on screens, accessing AI tools freely. Meanwhile, teachers are left without oversight or resources. The tools that fix this are completely free — but trapped behind a technical "domain wall."
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg leading-relaxed font-light">
              A school domain works exactly like an <strong className="text-[#191c1d] font-semibold">Aadhaar card.</strong> Without it, the tools exist and are free — but you simply cannot access them.
            </motion.p>
          </div>
          {/* Quote card — Obsidian floating card style */}
          <motion.div variants={fadeUp} className="relative">
            <div
              className="card-hover glass rounded-[28px] p-10 shadow-float relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(9,20,38,0.97) 0%, rgba(30,41,59,0.97) 100%)' }}
            >
              <LightSweep />
              <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
                "One domain. One decision. Everything activates."
              </p>
              <div className="w-8 h-px bg-white/30 mb-4" />
              <p className="text-white/50 text-sm uppercase tracking-[0.15em] font-light">
                Setting up this foundational IT infrastructure is the fastest way to bridge the gap between elite and rural schools.
              </p>
            </div>
            {/* Decorative stacked card behind */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[28px] -z-10 opacity-30"
              style={{ background: 'linear-gradient(135deg, #091426, #1e293b)' }} />
          </motion.div>
        </motion.div>
      </Section>

      {/* ── WHAT GETS UNLOCKED ── */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">What Gets Unlocked</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-5 tracking-tight text-[#191c1d]">Free. Forever.</motion.h2>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg font-light leading-relaxed">
              Once the domain is registered, these elite tools activate for every teacher and every student — at zero cost.
            </motion.p>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Mail,          title: 'Google Workspace',       desc: 'Gmail, Classroom, Drive, Meet. Unlimited accounts. Teacher sees every student\'s progress live.',    accent: '#4285F4' },
              { Icon: FileSpreadsheet, title: 'Microsoft 365',         desc: 'Word, Teams, OneNote, Excel. Free for every teacher in the school.',                               accent: '#00A4EF' },
              { Icon: Palette,       title: 'Canva for Education',    desc: 'Posters, worksheets, presentations. Free for every teacher to create beautiful content.',           accent: '#7C3AED' },
              { Icon: Bot,           title: 'AI Learning Tools',      desc: 'AI tutors natively in Nepali and Hindi. Every student gets a private tutor at home.', images: ['/schoolyard.jpg', '/classroom.jpg'], accent: '#0891B2' },
              { Icon: Eye,           title: 'Student Visibility',     desc: 'See who submitted, who didn\'t, who is falling behind. In real time.',                             accent: '#059669' },
              { Icon: Building2,     title: 'Official School Identity',desc: 'Every teacher gets name@schoolname.in — a permanent professional email identity.',                 accent: '#45474c' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className={`card-hover bg-white rounded-2xl p-7 shadow-card group relative overflow-hidden ${item.images ? 'md:col-span-2' : ''}`}>
                <LightSweep />
                <div className={`flex flex-col h-full ${item.images ? 'md:flex-row gap-6 items-center' : ''}`}>
                  <div className={item.images ? 'flex-1' : ''}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.accent}15` }}>
                      <item.Icon className="w-5 h-5" style={{ color: item.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#191c1d] mb-2">{item.title}</h3>
                    <p className="text-[#45474c] leading-relaxed font-light text-sm">{item.desc}</p>
                  </div>
                  
                  {item.images && (
                    <div className="flex-1 flex gap-3 mt-5 md:mt-0 w-full">
                      {item.images.map((img, idx) => (
                        <div key={idx} className="flex-1 rounded-xl overflow-hidden aspect-[4/3] shadow-inner relative group-hover:shadow-float transition-all bg-[#f3f4f5]">
                           <img src={img} alt="School setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#091426]/20 to-transparent pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="text-center mt-10">
            <p className="text-[#45474c] font-light italic">Many other possibilities. This is the beginning.</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── 30-DAY PROCESS ── */}
      <Section alt id="process">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-32">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">Timeline</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-5 tracking-tight text-[#191c1d]">
              From decision to independence.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg font-light leading-relaxed">
              We handle the complex setup so your school can focus on teaching.
            </motion.p>
          </div>
          <div className="pl-2">
            <TimelineStep number="1" title="Headmaster Signs" description="One authorization letter + school registration certificate. Takes 10 minutes. (Requires an internet connection and 2 devices at the school)." />
            <TimelineStep number="2" title="Domain Registered" description="Google Workspace for Education applied. Zero cost to school." />
            <TimelineStep number="3" title="Teachers Onboarded" description="One 2-hour training session. Teachers onboarded. First assignment posted on Classroom." />
            <TimelineStep number="4" title="School Owns Everything" description="One teacher becomes permanent admin. School is independent forever." isLast />
          </div>
        </motion.div>
      </Section>

      {/* ── FOUNDER SECTION ── */}
      <Section id="founder">
        <GlowOrb size={500} color="rgba(9,20,38,0.05)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">The Person Behind It</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-[#191c1d]">Made with love,<br /><span className="text-[#45474c] font-light">from the hills of Lamahatta.</span></motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Founder card */}
            <motion.div variants={fadeUp} className="relative z-10 w-full max-w-sm mx-auto md:max-w-none">
              <div className="card-hover bg-white rounded-[28px] overflow-hidden shadow-float p-2 sm:p-3 pb-8">
                <div className="relative overflow-hidden rounded-[20px] shadow-inner mb-6 flex bg-[#f3f4f5]">
                  <img src="/hero_lamahatta.png" alt="Lamahatta, Darjeeling" className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091426]/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/90" />
                      <span className="text-white text-xs font-medium tracking-wide">Lamahatta, Darjeeling</span>
                    </div>
                  </div>
                </div>
                <div className="px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-2">Founder</p>
                  <h3 className="font-heading text-2xl font-bold text-[#191c1d] mb-1">Upesh Bishwakarma</h3>
                  <p className="text-[#45474c] text-sm font-light mb-5">Creative Technologist · AI Builder · Lamahatta</p>
                  {/* Social links */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <a href="mailto:upeshinmars42@gmail.com" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Email">
                      <Mail className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://github.com/ripplewave2025" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="GitHub">
                      <Github className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://x.com/upeshinmars" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Twitter / X">
                      <Twitter className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://www.instagram.com/hotbpoison" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Instagram">
                      <Instagram className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://www.youtube.com/@techinahurry-A" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="YouTube">
                      <Youtube className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://www.threads.com/@hotbpoison" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Threads">
                      <span className="font-bold text-[15px] text-[#45474c] group-hover:text-[#191c1d]">@</span>
                    </a>
                    <a href="https://portfolio2026feb.vercel.app" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Portfolio">
                      <ExternalLink className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Decorative offset card */}
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-[28px] -z-10 bg-[#edeeef]" />
            </motion.div>

            {/* Motivation text */}
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="glass rounded-2xl p-7 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-3">Motivation</p>
                <p className="text-[#191c1d] text-lg leading-relaxed font-light">
                  "When I find out the schools in Darjeeling doesn't have access to the top tools of education which is bascially free. This kept me up at night."
                </p>
              </div>
              <div className="glass rounded-2xl p-7 shadow-card space-y-4">
                <p className="text-[#191c1d] text-lg leading-relaxed font-light">
                  I accidently found when i was curious and search on the internet didn't plan to work on this project so soon but I felt this is important.
                </p>
                <p className="text-[#191c1d] text-base leading-relaxed font-light">
                  I plan to do this prototype with 'Lamahatta High School' and opensource the blueprint to all the rural areas of schools around the world.
                </p>
              </div>
              <div
                className="rounded-2xl p-7 shadow-float relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}
              >
                <LightSweep />
                <p className="text-white/90 text-lg font-light leading-relaxed italic">
                  "I truly believe that in the entire schools there will be a tech guy who figure things out will be able to set this up. I promise the blueprint I will make will be super easy so that your grandma will be able to do it with her eyes closed."
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-4 font-light">— Upesh</p>
              </div>

              {/* Projects mini grid */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-3">Current Focus</p>
                <div className="grid grid-cols-2 gap-3">
                  {['aiforstudents.online', 'Multi-agent AI', 'Knowledge Compression', 'LamahattaOS'].map((p) => (
                    <div key={p} className="card-hover glass rounded-xl px-4 py-3 shadow-card text-sm text-[#191c1d] font-light">{p}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* ── CTA ── */}
      <section
        className="relative py-32 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}
      >
        <GlowOrb size={600} color="rgba(255,255,255,0.04)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <ArcDecor className="top-0 left-0 w-full opacity-20 [&_path]:stroke-white" />
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center text-white relative z-10"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">The First Step</motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            This is the first step.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg font-light mb-10 leading-relaxed">
            Like registering for Aadhaar before everything else became possible.
            Within one year, what teachers and students do with these tools will speak for itself.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/apply')}
              className="px-8 py-4 bg-white text-[#091426] font-semibold rounded-xl hover:shadow-float hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Activate Your School
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/30 font-light tracking-widest mt-8 uppercase text-xs">
            Zero risk. Full ownership.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#f3f4f5] py-10 px-6 border-t border-[rgba(9,20,38,0.06)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#45474c] font-medium text-sm">aiforstudents<span className="text-[#75777d]">.online</span></span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center">
            <button onClick={() => navigate('/login')} className="text-[#45474c] hover:text-[#191c1d] text-sm font-light transition-colors">
              Operator Panel
            </button>
            <p className="text-[#75777d] font-light italic text-sm">
              "No school should be left behind in the age of AI."
            </p>
          </div>
          <p className="text-[#75777d] text-xs font-light">
            Made with love by{' '}
            <a href="https://portfolio2026feb.vercel.app" target="_blank" rel="noreferrer" className="text-[#45474c] hover:text-[#191c1d] transition-colors">
              Upesh
            </a>{' '}
            in{' '}
            <a href="https://lamahatta.vercel.app/" target="_blank" rel="noreferrer" className="text-[#45474c] hover:text-[#191c1d] transition-colors">
              Lamahatta 🏔️
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
};
