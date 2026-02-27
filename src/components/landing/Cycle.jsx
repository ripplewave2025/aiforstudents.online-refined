import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, Hammer, Map, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

const Step = ({ number, title, desc, icon: Icon, isLast }) => (
    <motion.div
        className="relative flex gap-6 group"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: number * 0.15 }}
        viewport={{ once: true, margin: "-50px" }}
    >
        {/* Timeline */}
        <div className="flex flex-col items-center">
            <motion.div
                className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.1 }}
            >
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
            </motion.div>
            {!isLast && (
                <motion.div
                    className="w-0.5 flex-1 bg-gradient-to-b from-slate-700 to-transparent my-2"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: number * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                />
            )}
        </div>

        {/* Content */}
        <div className="pb-12 flex-1">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                Step {number}
                <ChevronRight className="w-3 h-3" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-slate-400 leading-relaxed max-w-lg">{desc}</p>
        </div>
    </motion.div>
);

export const Cycle = () => {
    const steps = [
        {
            icon: BookOpen,
            title: "Information Intake",
            desc: "Students engage with high-density, AI-delivered modules. Interactive, adaptive, and available at any time. The AI ensures core understanding before moving forward."
        },
        {
            icon: Mic,
            title: "The Reverse Lecture",
            desc: "To prove mastery, students explain the concept back to the system and peers. If you cannot teach it, you do not know it. This builds confidence and deep clarity."
        },
        {
            icon: Hammer,
            title: "Project Application",
            desc: "Knowledge is immediately applied to a 'Build.' Whether software, policy, or prototype—students create artifacts, not just notes."
        },
        {
            icon: Map,
            title: "Human Navigation",
            desc: "Teachers review the work, not the tests. They act as project managers and career navigators, bridging interests to real-world opportunities."
        }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <ScrollReveal className="mb-16">
                    <motion.div
                        className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="w-8 h-px bg-blue-500" />
                        The Process
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">How It Works</h2>
                    <p className="text-xl text-slate-400">A four-part cycle for lasting mastery.</p>
                </ScrollReveal>

                <div className="relative">
                    {steps.map((step, i) => (
                        <Step
                            key={i}
                            number={i + 1}
                            icon={step.icon}
                            title={step.title}
                            desc={step.desc}
                            isLast={i === steps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
