import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Lock, ChevronLeft } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Logo } from '../ui/Logo';

export const Login = ({ onBack, onLogin }) => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
                    animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <motion.button
                    onClick={onBack}
                    className="absolute -top-12 left-0 text-slate-400 hover:text-white flex items-center gap-2 font-medium transition-colors text-sm"
                    whileHover={{ x: -5 }}
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </motion.button>

                <GlassCard className="p-10 border-slate-700/50">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <Logo showText={false} size="large" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-400">Sign in to continue to Gorkha Academy</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin('student'); }}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                            <div className="relative">
                                <User className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    defaultValue="demo@gorkha.edu"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    defaultValue="password"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            Sign In <ArrowRight className="w-4 h-4" />
                        </motion.button>

                        <div className="flex justify-between items-center text-xs font-medium text-slate-500 pt-4">
                            <button type="button" onClick={() => onLogin('parent')} className="hover:text-white transition">Parent Login</button>
                            <button type="button" onClick={() => onLogin('teacher')} className="hover:text-white transition">Teacher Login</button>
                        </div>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
}
