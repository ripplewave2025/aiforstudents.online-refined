import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const Particle = ({ color, duration, delay, type = 'dot' }) => (
    <motion.div
        className={cn(
            "absolute opacity-1",
            type === 'dot' ? "w-1 h-1 rounded-full" : "w-2 h-0.5",
            color
        )}
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 720
        }}
        transition={{ duration, delay, ease: "easeOut" }}
    />
);

export const ConceptIntro = ({ onResolved }) => {
    const [isBroken, setIsBroken] = useState(false);
    const [showTruth, setShowTruth] = useState(false);

    const handleBreak = () => {
        if (isBroken) return;
        setIsBroken(true);
        setTimeout(() => {
            setShowTruth(true);
        }, 800);
        setTimeout(() => {
            onResolved();
        }, 5500); // Give user more time to absorb the truth
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden cursor-crosshair">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

            <AnimatePresence>
                {!showTruth && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 2, filter: 'blur(40px)' }}
                        transition={{ duration: 1.5 }}
                        className="relative"
                    >
                        {/* The Bubble */}
                        {!isBroken ? (
                            <motion.div
                                onClick={handleBreak}
                                className="relative cursor-pointer group"
                                animate={{
                                    y: [-15, 15, -15],
                                    x: [-5, 5, -5],
                                    rotate: [-1, 1, -1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* Interaction Hint */}
                                <motion.div
                                    className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-slate-700 text-[10px] tracking-[0.8em] uppercase opacity-0"
                                    animate={{ opacity: [0, 0.4, 0] }}
                                    transition={{ delay: 4, duration: 4, repeat: Infinity }}
                                >
                                    Break the illusion
                                </motion.div>

                                {/* Bubble Outer Rings */}
                                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-white/20 backdrop-blur-[2px] bg-gradient-to-tr from-white/5 to-transparent shadow-[inset_0_0_40px_rgba(255,255,255,0.1),0_0_50px_rgba(59,130,246,0.1)]"
                                        animate={{
                                            borderRadius: ["50%", "48% 52% 52% 48% / 48% 48% 52% 52%", "50%"],
                                            scale: [1, 1.02, 1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                    />

                                    {/* Iridescent Highlight */}
                                    <motion.div
                                        className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-white/40 via-blue-200/20 to-transparent blur-xl pointer-events-none"
                                        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />

                                    {/* Chromatic Aberration Hover Effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-red-500/0 group-hover:border-red-500/10 transition-colors pointer-events-none"
                                        animate={{ x: [-1, 1, -1] }}
                                        transition={{ duration: 0.1, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-blue-500/0 group-hover:border-blue-500/10 transition-colors pointer-events-none"
                                        animate={{ x: [1, -1, 1] }}
                                        transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
                                    />

                                    {/* Text */}
                                    <span className="text-2xl md:text-3xl font-heading font-light tracking-[0.4em] text-white/70 group-hover:text-white group-hover:tracking-[0.5em] transition-all duration-700 uppercase select-none [text-shadow:0_0_10px_rgba(255,255,255,0.3)]">
                                        Understanding
                                    </span>
                                </div>
                            </motion.div>
                        ) : (
                            /* Break Effect */
                            <div className="relative flex items-center justify-center w-80 h-80">
                                {Array.from({ length: 60 }).map((_, i) => (
                                    <Particle
                                        key={i}
                                        color={i % 3 === 0 ? "bg-blue-400" : i % 3 === 1 ? "bg-white/70" : "bg-purple-400/50"}
                                        duration={1.5 + Math.random()}
                                        delay={Math.random() * 0.1}
                                        type={i % 4 === 0 ? 'shard' : 'dot'}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Film Grain / Noise Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[110] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            {/* The Truth Reveal */}
            <AnimatePresence>
                {showTruth && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="max-w-3xl px-6 text-center z-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="space-y-12"
                        >
                            <div className="space-y-4">
                                <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase mb-8">A Quiet Realization</p>
                                <h2 className="text-3xl md:text-5xl font-heading font-light leading-tight text-white">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                    >
                                        Information is cheap.
                                    </motion.span>
                                    <br />
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5, duration: 1 }}
                                    >
                                        Understanding is proven by teaching.
                                    </motion.span>
                                    <br />
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.5, duration: 1 }}
                                        className="text-white font-normal"
                                    >
                                        Guidance is human.
                                    </motion.span>
                                </h2>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 4, duration: 1 }}
                                className="pt-8"
                            >
                                <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle background text */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center select-none overflow-hidden">
                <span className="text-[20vw] font-bold text-white whitespace-nowrap">
                    MASTERY AGENCY HUMANITY
                </span>
            </div>
        </div>
    );
};
