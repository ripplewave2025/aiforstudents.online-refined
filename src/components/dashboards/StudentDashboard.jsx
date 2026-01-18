import React, { useState } from 'react';
import { Target, Clock, CheckCircle, Video, Lock, Bell, X, LogOut, Award, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Logo } from '../ui/Logo';

export const StudentDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('todo');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [recording, setRecording] = useState(false);

    const missions = [
        { id: 1, subject: 'Physics', topic: "Newton's Third Law", question: "State the law and give 2 real-life examples.", status: 'todo', priority: 'High', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        { id: 2, subject: 'Biology', topic: "Photosynthesis", question: "Explain the Light Dependent reaction steps.", status: 'pending', timestamp: '2 hrs ago', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        { id: 3, subject: 'Math', topic: "Quadratic Equations", question: "Derive the Quadratic Formula.", status: 'verified', completedDate: 'Oct 12', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { id: 4, subject: 'Geography', topic: "Tectonic Plates", question: "List the 3 types of plate boundaries.", status: 'todo', priority: 'Medium', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    ];

    const filteredMissions = missions.filter(m => {
        if (activeTab === 'todo') return m.status === 'todo';
        if (activeTab === 'pending') return m.status === 'pending';
        if (activeTab === 'completed') return m.status === 'verified';
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans text-slate-100">
            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-20">
                <div className="mb-12 pl-2">
                    <Logo />
                </div>

                <div className="flex-1 space-y-2">
                    {[
                        { id: 'todo', icon: Target, label: 'Active Tasks', count: missions.filter(m => m.status === 'todo').length, color: 'blue' },
                        { id: 'pending', icon: Clock, label: 'Pending Review', count: missions.filter(m => m.status === 'pending').length, color: 'yellow' },
                        { id: 'completed', icon: Award, label: 'Completed', count: missions.filter(m => m.status === 'verified').length, color: 'emerald' },
                    ].map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3.5 rounded-xl font-medium transition flex justify-between items-center ${activeTab === tab.id
                                    ? `bg-${tab.color}-600 text-white shadow-lg`
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                            whileHover={{ x: activeTab === tab.id ? 0 : 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="flex items-center gap-3"><tab.icon className="w-5 h-5" /> {tab.label}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-800'}`}>{tab.count}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold border-2 border-slate-800 shadow-lg">S</div>
                        <div>
                            <p className="font-semibold text-sm">Student</p>
                            <p className="text-xs text-slate-500">Demo Account</p>
                        </div>
                    </div>
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
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-blue-400 text-xs font-medium uppercase tracking-widest mb-1">
                            <span>Dashboard</span>
                            <ChevronRight className="w-3 h-3" />
                            <span>{activeTab === 'todo' ? 'Active' : activeTab === 'pending' ? 'Pending' : 'Completed'}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {activeTab === 'todo' && 'Active Tasks'}
                            {activeTab === 'pending' && 'Pending Review'}
                            {activeTab === 'completed' && 'Completed Work'}
                        </h1>
                    </div>
                    <button className="p-2.5 bg-slate-800 border border-slate-700 rounded-full text-slate-400 hover:text-white transition relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredMissions.map((mission, i) => (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-0 overflow-hidden group hover:border-blue-500/50">
                                <div className={`absolute top-0 left-0 w-1 h-full ${mission.status === 'verified' ? 'bg-emerald-500' : mission.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-600'}`}></div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4 pl-2">
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${mission.color}`}>{mission.subject}</span>
                                        {mission.status === 'todo' && <span className="text-[10px] font-bold bg-red-900/20 text-red-500 border border-red-500/20 px-2 py-1 rounded uppercase flex items-center gap-1"><Zap className="w-3 h-3 fill-red-500" /> Priority</span>}
                                        {mission.status === 'verified' && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 pl-2 group-hover:text-blue-400 transition-colors">{mission.topic}</h3>

                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-6 mx-2">
                                        <p className="text-slate-300 italic">"{mission.question}"</p>
                                    </div>

                                    <div className="pl-2">
                                        {mission.status === 'todo' && (
                                            <motion.button
                                                onClick={() => { setSelectedTask(mission); setShowUploadModal(true); }}
                                                className="w-full bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-500 transition flex items-center justify-center gap-2"
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                            >
                                                <Video className="w-5 h-5" /> Start Task
                                            </motion.button>
                                        )}
                                        {mission.status === 'pending' && (
                                            <button disabled className="w-full bg-yellow-900/20 text-yellow-500 font-medium py-3.5 rounded-xl border border-yellow-500/20 cursor-not-allowed flex items-center justify-center gap-2">
                                                <Clock className="w-5 h-5" /> Awaiting Review
                                            </button>
                                        )}
                                        {mission.status === 'verified' && (
                                            <button disabled className="w-full bg-emerald-900/20 text-emerald-500 font-medium py-3.5 rounded-xl border border-emerald-500/20 flex items-center justify-center gap-2">
                                                <Lock className="w-5 h-5" /> Completed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Video Upload Modal */}
            {showUploadModal && selectedTask && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <div>
                                <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Record Explanation</span>
                                <h3 className="text-xl font-bold text-white">{selectedTask.topic}</h3>
                            </div>
                            <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="p-6">
                            <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/20 mb-6">
                                <p className="text-xs font-medium text-blue-400 uppercase mb-1">Question:</p>
                                <p className="text-blue-100 text-lg">"{selectedTask.question}"</p>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-2xl h-48 flex flex-col items-center justify-center gap-4 cursor-pointer transition duration-300 ${recording ? 'border-red-500 bg-red-900/20' : 'border-slate-700 hover:border-blue-500 hover:bg-slate-800/50'}`}
                                onClick={() => setRecording(!recording)}
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${recording ? 'bg-red-500/20' : 'bg-slate-800'}`}>
                                    {recording ? <div className="w-6 h-6 bg-red-500 rounded-sm animate-pulse"></div> : <Video className="w-8 h-8 text-slate-400" />}
                                </div>
                                <p className={`font-medium ${recording ? 'text-red-400' : 'text-slate-400'}`}>{recording ? 'Recording... (Tap to stop)' : 'Tap to Record'}</p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex gap-3">
                            <button onClick={() => setShowUploadModal(false)} className="flex-1 py-3 border border-slate-700 font-medium text-slate-400 rounded-xl hover:bg-slate-800 transition">Cancel</button>
                            <button onClick={() => { setShowUploadModal(false); alert("Submitted for Review!"); }} className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition">Submit</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
