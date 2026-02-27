import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';

const Principle = ({ text, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="relative pl-8 border-l-2 border-slate-800 hover:border-blue-500 transition-colors group"
    >
        <motion.div
            className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-blue-500 transition-colors"
            whileHover={{ scale: 1.5 }}
        />
        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            {text}
        </p>
    </motion.div>
);

export const Philosophy = () => {
    const principles = [
        "We believe that human time is the most valuable resource in the educational system. To waste it on tasks that can be automated is a systemic failure.",
        "We believe that true understanding is a byproduct of teaching. If a student can explain a concept simply, they have mastered it.",
        "We believe that the end goal of education is not a grade, but agency—the ability to look at a complex system and know exactly how to navigate it."
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Subtle gradient line */}
            <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
            />

            <div className="max-w-4xl mx-auto px-6">
                <ScrollReveal className="mb-16">
                    <motion.div
                        className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="w-8 h-px bg-blue-500" />
                        First Principles
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-white">Philosophy</h2>
                </ScrollReveal>

                <div className="space-y-12 mb-16">
                    {principles.map((text, i) => (
                        <Principle key={i} text={text} index={i} />
                    ))}
                </div>

                <ScrollReveal delay={0.6}>
                    <motion.div
                        className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800"
                        whileHover={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}
                    >
                        <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                            Gorkha Academy is a quiet return to the apprenticeship model, powered by modern intelligence.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-8 text-slate-400">
                            <span>We provide the <span className="text-blue-400">tools</span>.</span>
                            <span>The students provide the <span className="text-purple-400">work</span>.</span>
                            <span>The teachers provide the <span className="text-emerald-400">direction</span>.</span>
                        </div>
                    </motion.div>
                </ScrollReveal>
            </div>
        </section>
    );
};
