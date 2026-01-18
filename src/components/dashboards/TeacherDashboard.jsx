import React, { useState } from 'react';
import { Target, Users, Clock, Plus, LogOut, Activity, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Logo } from '../ui/Logo';

export const TeacherDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('missions');
    const [missions] = useState([
        { id: 1, subject: 'Physics', topic: "Newton's Third Law", assignedTo: 24, completed: 18 },
        { id: 2, subject: 'Math', topic: "Quadratic Equations", assignedTo: 24, completed: 5 },
    ]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-100">
            <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-20">
                <div className="mb-12 pl-2">
                    <Logo />
                </div>

                <div className="flex-1 space-y-2">
                    <motion.button
                        onClick={() => setActiveTab('missions')}
                        className={`w-full text-left px-4 py-3.5 rounded-xl font-medium transition flex justify-between items-center ${activeTab === 'missions' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        whileHover={{ x: activeTab === 'missions' ? 0 : 5 }}
                    >
                        <span className="flex items-center gap-3"><Target className="w-5 h-5" /> Assignments</span>
                    </motion.button>
                    <motion.button
                        onClick={() => setActiveTab('students')}
                        className={`w-full text-left px-4 py-3.5 rounded-xl font-medium transition flex justify-between items-center ${activeTab === 'students' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        whileHover={{ x: activeTab === 'students' ? 0 : 5 }}
                    >
                        <span className="flex items-center gap-3"><Users className="w-5 h-5" /> Students</span>
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

            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Assignments</h1>
                        <p className="text-slate-400 mt-1">Manage student tasks and projects</p>
                    </div>
                    <motion.button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg flex items-center gap-2 transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Plus className="w-5 h-5" /> New Assignment
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Active Tasks', value: missions.length, icon: Target, color: 'blue' },
                        { label: 'Completion Rate', value: '75%', icon: Activity, color: 'emerald' },
                        { label: 'Pending Review', value: '12', icon: Clock, color: 'yellow' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                                    <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                                </div>
                                <p className={`text-4xl font-bold text-${stat.color === 'blue' ? 'white' : stat.color + '-500'}`}>{stat.value}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <GlassCard className="p-0 overflow-hidden">
                    <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                        <h3 className="font-semibold text-white">Active Assignments</h3>
                    </div>
                    <div className="divide-y divide-slate-800">
                        {missions.map((m, i) => (
                            <motion.div
                                key={m.id}
                                className="p-6 hover:bg-slate-800/50 transition group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[10px] font-medium bg-blue-900/30 text-blue-400 px-2 py-1 rounded uppercase tracking-wide border border-blue-500/30">{m.subject}</span>
                                        <h3 className="text-lg font-semibold text-white mt-2">{m.topic}</h3>
                                    </div>
                                    <button className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="bg-blue-600 h-full rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(m.completed / m.assignedTo) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">{m.completed}/{m.assignedTo}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </GlassCard>
            </main>
        </div>
    );
};
