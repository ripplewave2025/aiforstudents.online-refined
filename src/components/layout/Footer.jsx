import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-10 relative overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <Logo size="large" />
                        <p className="text-slate-500 mt-6 max-w-sm leading-relaxed">
                            Replacing the lecture with the project, and the grade with the portfolio.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Platform</h4>
                            <ul className="space-y-3 text-slate-400">
                                {['How it Works', 'For Teachers', 'For Students', 'For Parents'].map((item) => (
                                    <motion.li key={item} whileHover={{ x: 5 }}>
                                        <a href={item === 'How it Works' ? '#how-it-works' : '#roles'} className="hover:text-white transition-colors flex items-center gap-1 group">
                                            {item}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
                            <ul className="space-y-3 text-slate-400">
                                {['About', 'Philosophy', 'Contact'].map((item) => (
                                    <motion.li key={item} whileHover={{ x: 5 }}>
                                        <a href="#top" className="hover:text-white transition-colors flex items-center gap-1 group">
                                            {item}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 Gorkha Academy. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#top" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#top" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
