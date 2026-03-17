import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, LogOut, Video, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Logo } from '../ui/Logo';

export const ParentDashboard = ({ onLogout }) => {
    const [verifyModal, setVerifyModal] = useState(null);
    const [missions, setMissions] = useState([
        { id: 1, subject: 'Physics', topic: "Newton's Third Law", question: "State the law and give examples.", status: 'pending_verification', timestamp: '10 mins ago', student: "Student" },
    ]);

    const handleVerify = (id) => {
        setMissions(missions.map(m => m.id === id ? { ...m, status: 'verified' } : m));
        setVerifyModal(null);
    };

    const pending = missions.filter(m => m.status === 'pending_verification');

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-100">
            <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-20">
                <div className="mb-12 pl-2">
                    <Logo />
                </div>

                <div className="flex-1 space-y-2">
                    <motion.button
                        className="w-full text-left px-4 py-3.5 rounded-xl font-medium transition flex justify-between items-center bg-emerald-600 text-white shadow-lg"
                        whileHover={{ x: 0 }}
                    >
                        <span className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Review</span>
                        {pending.length > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">{pending.length}</span>}
                    </motion.button>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <motion.button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-xl transition flex items-center gap-3 text-slate-400 hover:text-white font-medium"
                        whileHover={{ x: 5 }}
                    >
                        <LogOut className="w-5 h-5" /> Sign Out
                    </motion.button>
                </div>
            </aside>

            <main className="flex-1 p-6 md:p-10">
                <h1 className="text-3xl font-bold text-white mb-8">Pending Review</h1>

                {pending.length === 0 ? (
                    <GlassCard className="text-center py-20">
                        <div className="w-20 h-20 bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">All Clear</h3>
                        <p className="text-slate-400 mt-2">No pending submissions to review.</p>
                    </GlassCard>
                ) : (
                    <div className="space-y-6">
                        {pending.map((mission, i) => (
                            <motion.div
                                key={mission.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 relative">
                                        <Video className="w-10 h-10 text-slate-600" />
                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-slate-900">NEW</div>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-xl font-bold text-white">{mission.topic}</h3>
                                        <p className="text-slate-400 mt-1">"{mission.question}"</p>
                                    </div>
                                    <motion.button
                                        onClick={() => setVerifyModal(mission)}
                                        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition flex items-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Play className="w-5 h-5 fill-white" /> Review
                                    </motion.button>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {verifyModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden"
                            >
                                <div className="p-6 flex justify-between items-center border-b border-slate-800">
                                    <h3 className="font-semibold text-lg text-white">Review Submission</h3>
                                    <button onClick={() => setVerifyModal(null)} className="p-2 hover:bg-slate-800 rounded-full transition"><X className="w-5 h-5 text-slate-400" /></button>
                                </div>
                                <div className="bg-black aspect-video relative flex items-center justify-center group cursor-pointer">
                                    <motion.div
                                        className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Play className="w-6 h-6 fill-white text-white ml-1" />
                                    </motion.div>
                                </div>
                                <div className="p-6 flex gap-4">
                                    <button onClick={() => setVerifyModal(null)} className="flex-1 py-4 border border-slate-600 text-slate-400 font-medium rounded-xl hover:bg-slate-800 transition">Reject</button>
                                    <motion.button
                                        onClick={() => handleVerify(verifyModal.id)}
                                        className="flex-[2] py-4 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-500 transition flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <ShieldCheck className="w-5 h-5" /> Approve
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};
