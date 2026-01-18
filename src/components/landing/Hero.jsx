import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { GradientButton } from '../ui/GradientButton';

const TypeWriter = ({ words, className }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [words.length]);

    return (
        <span className={className}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export const Hero = ({ onStart }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
                    animate={{
                        backgroundPosition: ['0px 0px', '60px 60px']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />

                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px]"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div style={{ y, opacity, scale }}>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Education, Reimagined
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-sans font-bold text-white mb-6 leading-[1.1] tracking-tight"
                    >
                        From passive consumption
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
                            to active mastery.
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Gorkha Academy offloads instruction to AI and returns mentorship to humans.
                        We replace the lecture with the project, and the grade with the{' '}
                        <TypeWriter
                            words={['portfolio.', 'evidence.', 'future.']}
                            className="text-white font-medium"
                        />
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <GradientButton onClick={onStart} icon={ArrowRight} variant="primary">
                            Get Started
                        </GradientButton>
                        <motion.button
                            onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-xl font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            Learn More
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 bg-slate-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};
