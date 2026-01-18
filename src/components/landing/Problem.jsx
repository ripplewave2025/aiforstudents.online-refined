import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../animations/ScrollReveal';

const ProblemCard = ({ icon, text }) => (
    <motion.div
        className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm group hover:border-slate-700 transition-colors"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
        <div className="text-3xl mb-4">{icon}</div>
        <p className="text-slate-400 leading-relaxed">{text}</p>
    </motion.div>
);

export const Problem = () => {
    return (
        <section id="problem" className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal className="mb-16 max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">The Problem</h2>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Traditional education spends human energy on the one thing technology does better:
                        <span className="text-white font-medium"> content delivery.</span>
                    </p>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
                    <StaggerItem>
                        <ProblemCard
                            icon="🔄"
                            text="Teachers are exhausted by repetition. Delivering the same lecture year after year, while grading the same drills."
                        />
                    </StaggerItem>
                    <StaggerItem>
                        <ProblemCard
                            icon="😴"
                            text="Students are bored by passivity. Sitting in silence, memorizing what can be searched, missing the deeper skills."
                        />
                    </StaggerItem>
                    <StaggerItem>
                        <ProblemCard
                            icon="🗺️"
                            text="Graduation arrives without a map or portfolio. Students leave with grades but no evidence of what they can actually build."
                        />
                    </StaggerItem>
                </StaggerContainer>

                <ScrollReveal delay={0.4} className="mt-16 max-w-2xl">
                    <p className="text-lg text-slate-500 leading-relaxed italic border-l-2 border-slate-700 pl-6">
                        Time is spent memorizing what can be searched, while the ability to apply, explain, and navigate the world is left to chance.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
};
