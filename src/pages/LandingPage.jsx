import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
    GraduationCap, BookOpen, Users, School, Heart, Briefcase,
    ArrowRight, ChevronDown, Sparkles, Shield, MapPin, FileText,
    Mic, ChefHat, Code, Scissors, MessageCircle, Share2,
    Menu, X, Sun, Moon
} from 'lucide-react';

// ============================================================
// SECTION: ANIMATED BACKGROUND
// ============================================================
const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating question marks - subtle */}
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-white/[0.03] text-6xl font-serif select-none"
                style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                }}
            >
                ?
            </motion.div>
        ))}
    </div>
);

// ============================================================
// SECTION: NAVIGATION
// ============================================================
const Navigation = ({ onLogin, darkMode, setDarkMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-lg text-white">AIforStudents</span>
                    </motion.a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Ecosystem', 'Roles', 'Philosophy', 'Partners'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={onLogin}
                            className="text-sm font-medium text-slate-300 hover:text-white transition px-4 py-2"
                        >
                            Log In
                        </button>
                        <motion.button
                            onClick={onLogin}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Try Demo
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-white"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
                    >
                        <div className="space-y-4">
                            {['Ecosystem', 'Roles', 'Philosophy', 'Partners'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className="block w-full text-left text-xl font-medium text-white py-3 border-b border-slate-800"
                                >
                                    {item}
                                </button>
                            ))}
                            <button
                                onClick={() => { onLogin(); setMobileOpen(false); }}
                                className="w-full py-4 bg-blue-600 text-white font-medium rounded-xl mt-8"
                            >
                                Try Demo
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// ============================================================
// SECTION 1: HERO
// ============================================================
const HeroSection = ({ onStart }) => (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
        <AnimatedBackground />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium mb-10 tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Education, Reimagined</span>
                </div>

                {/* Main Quote - Manifesto Style */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-[1.2] tracking-tight">
                    <span className="font-serif italic">
                        "Education is teaching humans to explore reality with curiosity, thinking, and tools —
                    </span>
                    <br className="hidden md:block" />
                    <span className="font-serif italic text-blue-400">
                        before certainty kills discovery."
                    </span>
                </h1>

                {/* Supporting Line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl text-slate-400 mb-12 font-light"
                >
                    Then giving them strategies to succeed in the current system.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={onStart}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Try Demo
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 text-slate-300 hover:text-white font-medium transition-colors flex items-center gap-2"
                        whileHover={{ y: -2 }}
                    >
                        For Institutions
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <motion.button
                    onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    </section>
);

// ============================================================
// SECTION 2: ECOSYSTEM
// ============================================================
const EcosystemSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const pillars = [
        { icon: School, title: 'Schools', desc: 'Critical thinking foundation', color: 'from-blue-500 to-blue-600' },
        { icon: Briefcase, title: 'Vocational', desc: 'Real-world skills through exploration', color: 'from-emerald-500 to-emerald-600' },
        { icon: Users, title: 'Peer Network', desc: 'Students help each other', color: 'from-purple-500 to-purple-600' },
        { icon: FileText, title: 'Portfolio', desc: 'Everything becomes evidence', color: 'from-amber-500 to-amber-600' },
    ];

    return (
        <section id="ecosystem" className="py-24 px-6 bg-slate-900/50" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        One Platform. Many Learning Paths.
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Schools, vocational training, peer networks, and portfolios — all connected through the same philosophy of exploration.
                    </p>
                </motion.div>

                {/* Ecosystem Visualization */}
                <div className="relative">
                    {/* Connection Lines (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-slate-600 transition-all hover:-translate-y-1 cursor-default">
                                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
                                        <pillar.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                                    <p className="text-sm text-slate-400">{pillar.desc}</p>
                                </div>

                                {/* Arrow between items (desktop) */}
                                {i < pillars.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 text-slate-500">
                                        ↔
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================================
// SECTION 3: ROLE CARDS
// ============================================================
const RolesSection = ({ onLogin }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const roles = [
        {
            icon: BookOpen,
            title: 'Students',
            lines: ['Ask questions without fear.', 'Get help from peers & AI.'],
            cta: "I'm a Student",
            color: 'from-purple-500 to-purple-600',
            action: onLogin
        },
        {
            icon: GraduationCap,
            title: 'Teachers',
            lines: ['See patterns, not paperwork.', 'Amplify your impact.'],
            cta: "I'm a Teacher",
            color: 'from-blue-500 to-blue-600',
            action: onLogin
        },
        {
            icon: School,
            title: 'Schools',
            lines: ['NEP 2020 aligned.', 'Vocational partnerships.'],
            cta: 'For Schools →',
            color: 'from-emerald-500 to-emerald-600',
            action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: Heart,
            title: 'Parents',
            lines: ['See growth, not just grades.', 'Understand your child\'s journey.'],
            cta: "I'm a Parent",
            color: 'from-pink-500 to-pink-600',
            action: onLogin
        },
        {
            icon: Briefcase,
            title: 'Vocational Institutions',
            lines: ['Cooking, AI, speaking, and more.', 'Same thinking framework.'],
            cta: 'Partner →',
            color: 'from-amber-500 to-amber-600',
            action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            icon: Sparkles,
            title: 'Content Creators',
            lines: ['Build engaging lessons.', 'Share your expertise globally.'],
            cta: 'Become a Creator',
            color: 'from-orange-500 to-orange-600',
            action: onLogin
        },
    ];

    return (
        <section id="roles" className="py-24 px-6 bg-slate-950" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Built for everyone who believes
                        <br />
                        <span className="text-blue-400">learning is exploration.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role, i) => (
                        <motion.div
                            key={role.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group"
                        >
                            <div className="h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all hover:-translate-y-1">
                                <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                                    <role.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{role.title}</h3>
                                <div className="space-y-1 mb-6">
                                    {role.lines.map((line, j) => (
                                        <p key={j} className="text-slate-400 text-sm">{line}</p>
                                    ))}
                                </div>
                                <button
                                    onClick={role.action}
                                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group-hover:gap-2"
                                >
                                    {role.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================
// SECTION 4: PHILOSOPHY COMPARISON
// ============================================================
const PhilosophySection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const comparisons = [
        { old: 'Answers first', new: 'Questions first' },
        { old: 'Scores define you', new: 'Growth defines you' },
        { old: 'AI does the work', new: 'AI unlocks after you think' },
        { old: 'Teachers overwhelmed', new: 'Teachers amplified' },
        { old: 'Learning is isolated', new: 'Learning is connected' },
    ];

    return (
        <section id="philosophy" className="py-24 px-6 bg-slate-900/50" ref={ref}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What makes this different?
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8"
                >
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Traditional</span>
                        </div>
                        <div className="text-center">
                            <span className="text-sm font-medium text-emerald-500 uppercase tracking-wide">Our Approach</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {comparisons.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="grid grid-cols-2 gap-4 py-3 border-b border-slate-700/30 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-red-400/60">✕</span>
                                    <span className="text-slate-400">{item.old}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-emerald-400">✓</span>
                                    <span className="text-white">{item.new}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================================
// SECTION 5: VOCATIONAL PARTNERS
// ============================================================
const PartnersSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skills = [
        { icon: Mic, label: 'Public Speaking' },
        { icon: ChefHat, label: 'Culinary Arts' },
        { icon: Code, label: 'AI & Coding' },
        { icon: Scissors, label: 'Beauty & Grooming' },
        { icon: MessageCircle, label: 'English Language' },
        { icon: Share2, label: 'Social Media' },
    ];

    return (
        <section id="partners" className="py-24 px-6 bg-slate-950" ref={ref}>
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Critical thinking through every skill
                    </h2>
                    <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                        Every vocational skill becomes a lens for exploration. Same thinking framework. Different contexts.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.05 }}
                            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all hover:-translate-y-1 cursor-default"
                        >
                            <skill.icon className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                            <p className="text-sm text-slate-300">{skill.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors inline-flex items-center gap-2"
                >
                    Become a Partner
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </section>
    );
};

// ============================================================
// SECTION 6: TRUST SIGNALS
// ============================================================
const TrustSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const signals = [
        { icon: Shield, title: 'Privacy First', desc: 'No surveillance. Students control their data.' },
        { icon: MapPin, title: 'Built in Darjeeling', desc: 'For local schools first. Then expanding.' },
        { icon: FileText, title: 'NEP 2020 Aligned', desc: 'Fully compliant with India\'s education policy.' },
    ];

    return (
        <section className="py-16 px-6 bg-slate-900/50 border-y border-slate-800/50" ref={ref}>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {signals.map((signal, i) => (
                        <motion.div
                            key={signal.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <signal.icon className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
                            <h3 className="text-white font-semibold mb-1">{signal.title}</h3>
                            <p className="text-sm text-slate-400">{signal.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================
// SECTION 7: CONTACT / CTA
// ============================================================
const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [form, setForm] = useState({ name: '', email: '', school: '', message: '', role: 'school' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setForm({ name: '', email: '', school: '', message: '', role: 'school' });
    };

    return (
        <section id="contact" className="py-24 px-6 bg-slate-950" ref={ref}>
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to bring exploration to your school?
                    </h2>
                    <p className="text-slate-400">
                        Schedule a demo or read our philosophy document.
                    </p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-8 text-center"
                    >
                        <div className="text-4xl mb-4">✓</div>
                        <h3 className="text-xl font-semibold text-emerald-300 mb-2">Thank You!</h3>
                        <p className="text-emerald-400">We'll be in touch within 24-48 hours.</p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">School/Institution</label>
                                <input
                                    type="text"
                                    value={form.school}
                                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Your school name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">I am a...</label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="school">School Administrator</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="creator">Content Creator</option>
                                    <option value="parent">Parent</option>
                                    <option value="vocational">Vocational Partner</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                placeholder="Tell us about your school or how we can help..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                Schedule a Demo
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => window.open('/philosophy', '_blank')}
                                className="px-8 py-4 text-slate-300 hover:text-white font-medium transition-colors"
                            >
                                Read Our Philosophy →
                            </button>
                        </div>
                    </motion.form>
                )}

                <p className="text-center text-slate-500 text-sm mt-8">
                    <a href="mailto:contact@aiforstudents.online" className="hover:text-slate-300 transition-colors">contact@aiforstudents.online</a>
                </p>
            </div>
        </section>
    );
};

// ============================================================
// SECTION: FOOTER
// ============================================================
const Footer = () => (
    <footer className="py-8 px-6 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-400 text-sm">© 2026 AIforStudents.online</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
                <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-slate-300 transition-colors">Terms</a>
                <a href="mailto:contact@aiforstudents.online" className="hover:text-slate-300 transition-colors">Contact</a>
            </div>
        </div>
    </footer>
);

// ============================================================
// MAIN LANDING PAGE COMPONENT
// ============================================================
export const LandingPage = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);

    // Redirect authenticated users
    if (isAuthenticated) {
        const routes = { student: '/student', teacher: '/teacher', parent: '/parent', admin: '/admin' };
        return <Navigate to={routes[user?.role] || '/'} replace />;
    }

    const handleLogin = () => navigate('/login');

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
            <Navigation onLogin={handleLogin} darkMode={darkMode} setDarkMode={setDarkMode} />
            <HeroSection onStart={handleLogin} />
            <EcosystemSection />
            <RolesSection onLogin={handleLogin} />
            <PhilosophySection />
            <PartnersSection />
            <TrustSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
