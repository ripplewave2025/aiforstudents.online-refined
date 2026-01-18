import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Navbar = ({ onLogin }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Problem', href: '#problem' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Roles', href: '#roles' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
                        ? 'bg-slate-950/90 backdrop-blur-xl border-slate-800 py-3'
                        : 'bg-transparent border-transparent py-5'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <motion.div
                        className="cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Logo />
                    </motion.div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <motion.button
                            onClick={onLogin}
                            className="text-sm font-medium text-slate-400 hover:text-white transition px-4 py-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Log In
                        </motion.button>
                        <motion.button
                            onClick={onLogin}
                            className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Started
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-white transition"
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
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block text-2xl font-medium text-white py-3 border-b border-slate-800"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button
                                onClick={() => { onLogin(); setMobileOpen(false); }}
                                className="w-full py-4 bg-blue-600 text-white font-medium rounded-xl mt-8"
                            >
                                Get Started
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
