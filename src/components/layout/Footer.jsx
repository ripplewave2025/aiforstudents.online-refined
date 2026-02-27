import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
            {/* Subtle light accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <Logo size="large" />
                        <p className="text-zinc-500 mt-6 max-w-sm leading-relaxed font-light">
                            Replacing the lecture with the project, and the grade with the portfolio.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-heading font-medium text-white mb-6 text-xs uppercase tracking-[0.2em]">Platform</h4>
                            <ul className="space-y-4 text-zinc-500 font-light text-sm">
                                {['How it Works', 'For Teachers', 'For Students', 'For Parents'].map((item) => (
                                    <motion.li key={item} whileHover={{ x: 5 }}>
                                        <a href={item === 'How it Works' ? '#how-it-works' : '#roles'} className="hover:text-white transition-colors flex items-center gap-2 group">
                                            {item}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-heading font-medium text-white mb-6 text-xs uppercase tracking-[0.2em]">Company</h4>
                            <ul className="space-y-4 text-zinc-500 font-light text-sm">
                                {['About', 'Philosophy', 'Contact'].map((item) => (
                                    <motion.li key={item} whileHover={{ x: 5 }}>
                                        <a href="#top" className="hover:text-white transition-colors flex items-center gap-2 group">
                                            {item}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-light tracking-wider">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <p>© 2026 Explora. All rights reserved.</p>
                        <span className="hidden md:inline text-zinc-700">•</span>
                        <p className="text-zinc-500">Created with ❤️ in Lamahatta, Darjeeling, West Bengal</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#top" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#top" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
