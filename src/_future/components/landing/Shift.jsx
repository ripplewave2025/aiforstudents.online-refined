import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Compass } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

const ShiftCard = ({ icon: Icon, title, subtitle, items, color, delay }) => (
    <motion.div
        className="relative p-8 rounded-2xl bg-slate-900/30 border border-slate-800 backdrop-blur-sm group overflow-hidden"
        whileHover={{
            borderColor: 'rgba(59, 130, 246, 0.3)',
            transition: { duration: 0.3 }
        }}
    >
        {/* Glow effect on hover */}
        <motion.div
            className={`absolute -inset-px rounded-2xl bg-gradient-to-b ${color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
        />

        <div className="relative z-10">
            <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <Icon className="w-7 h-7 text-white" />
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-blue-400 text-sm font-medium uppercase tracking-wider mb-4">{subtitle}</p>

            <ul className="space-y-3">
                {items.map((item, i) => (
                    <motion.li
                        key={i}
                        className="text-slate-400 flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: delay + (i * 0.1) }}
                        viewport={{ once: true }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        {item}
                    </motion.li>
                ))}
            </ul>
        </div>
    </motion.div>
);

export const Shift = () => {
    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Animated line */}
            <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
            />

            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-6">The Shift</h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        We use AI to handle the mechanics of learning—so humans can focus on what requires a soul.
                    </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-6">
                    <ScrollReveal delay={0.1}>
                        <ShiftCard
                            icon={Bot}
                            title="The AI"
                            subtitle="Handles the 'What'"
                            items={[
                                "Delivers knowledge modules",
                                "Runs adaptive testing",
                                "Provides instant feedback"
                            ]}
                            color="from-blue-600 to-blue-700"
                            delay={0.1}
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <ShiftCard
                            icon={User}
                            title="The Student"
                            subtitle="Handles the 'How'"
                            items={[
                                "Teaches back concepts",
                                "Builds real projects",
                                "Leads peer sessions"
                            ]}
                            color="from-purple-600 to-purple-700"
                            delay={0.2}
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <ShiftCard
                            icon={Compass}
                            title="The Teacher"
                            subtitle="Handles the 'Where'"
                            items={[
                                "Provides mentorship",
                                "Navigates career paths",
                                "Guides system literacy"
                            ]}
                            color="from-emerald-600 to-emerald-700"
                            delay={0.3}
                        />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};
