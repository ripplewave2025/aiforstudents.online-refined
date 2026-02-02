import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
    Shield,
    Users,
    School,
    BarChart3,
    Settings,
    Download,
    Upload,
    RefreshCw,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    Brain,
    FileText,
    Calendar,
    Activity
} from 'lucide-react';

// Mock school data (offline)
const MOCK_SCHOOLS = [
    { id: 's1', name: 'Himalayan Academy', students: 245, teachers: 12, avgCTI: 68 },
    { id: 's2', name: 'Valley View School', students: 189, teachers: 8, avgCTI: 72 },
    { id: 's3', name: 'Mountain Peak Institute', students: 312, teachers: 15, avgCTI: 65 },
];

const MOCK_OVERVIEW = {
    totalStudents: 746,
    totalTeachers: 35,
    totalSessions: 4521,
    avgCriticalThinkingIndex: 68,
    avgRevisionRate: 52,
    topCategories: [
        { name: 'Science', sessions: 1245 },
        { name: 'Mathematics', sessions: 892 },
        { name: 'Social Studies', sessions: 756 },
    ]
};

const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
    <div className={`p-5 rounded-2xl border ${color}`}>
        <Icon className="w-6 h-6 mb-3" />
        <p className="text-3xl font-bold mb-1">{value}</p>
        <p className="text-sm opacity-70">{label}</p>
        {subtext && <p className="text-xs mt-1 opacity-50">{subtext}</p>}
    </div>
);

const SchoolRow = ({ school, onClick }) => (
    <motion.button
        onClick={onClick}
        className="w-full flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors text-left"
        whileHover={{ x: 4 }}
    >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <School className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
            <h4 className="font-medium">{school.name}</h4>
            <p className="text-xs text-slate-500">
                {school.students} students • {school.teachers} teachers
            </p>
        </div>
        <div className="text-right">
            <p className={`text-lg font-bold ${school.avgCTI >= 70 ? 'text-emerald-400' : school.avgCTI >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                {school.avgCTI}%
            </p>
            <p className="text-xs text-slate-500">Avg CTI</p>
        </div>
    </motion.button>
);

export const AdminDashboardPage = () => {
    const { user } = useAuth();
    const [lastSync, setLastSync] = useState(() => {
        const saved = localStorage.getItem('admin_last_sync');
        return saved || new Date().toISOString();
    });
    const [isExporting, setIsExporting] = useState(false);

    // Simulate data export
    const exportData = () => {
        setIsExporting(true);
        setTimeout(() => {
            // Create mock export
            const exportData = {
                exportedAt: new Date().toISOString(),
                schools: MOCK_SCHOOLS,
                overview: MOCK_OVERVIEW,
                version: '1.0'
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `aiforstudents_export_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            setIsExporting(false);
        }, 1000);
    };

    // Simulate sync
    const syncData = () => {
        const newSync = new Date().toISOString();
        setLastSync(newSync);
        localStorage.setItem('admin_last_sync', newSync);
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                        <Shield className="w-8 h-8 text-indigo-400" />
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-400">
                        Platform-wide overview and management (Offline Mode)
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={syncData}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-xl text-sm transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Sync
                    </button>
                    <button
                        onClick={exportData}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        {isExporting ? 'Exporting...' : 'Export Data'}
                    </button>
                </div>
            </motion.div>

            {/* Offline notice */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-center gap-3"
            >
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <div className="flex-1">
                    <p className="text-sm text-amber-200">
                        <strong>Offline Mode:</strong> Data is simulated locally. Last sync: {new Date(lastSync).toLocaleString()}
                    </p>
                </div>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
                    MVP
                </span>
            </motion.div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={Users}
                    label="Total Students"
                    value={MOCK_OVERVIEW.totalStudents.toLocaleString()}
                    color="bg-blue-950/30 border-blue-500/50 text-blue-300"
                />
                <StatCard
                    icon={School}
                    label="Schools"
                    value={MOCK_SCHOOLS.length}
                    color="bg-indigo-950/30 border-indigo-500/50 text-indigo-300"
                />
                <StatCard
                    icon={Brain}
                    label="Thinking Sessions"
                    value={MOCK_OVERVIEW.totalSessions.toLocaleString()}
                    color="bg-purple-950/30 border-purple-500/50 text-purple-300"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Avg CT Index"
                    value={`${MOCK_OVERVIEW.avgCriticalThinkingIndex}%`}
                    color="bg-emerald-950/30 border-emerald-500/50 text-emerald-300"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Schools List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                >
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <School className="w-5 h-5 text-indigo-400" />
                        Schools Overview
                    </h3>
                    <div className="space-y-3">
                        {MOCK_SCHOOLS.map(school => (
                            <SchoolRow key={school.id} school={school} onClick={() => { }} />
                        ))}
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    {/* Top Categories */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4">Top Categories</h3>
                        <div className="space-y-3">
                            {MOCK_OVERVIEW.topCategories.map((cat, i) => (
                                <div key={cat.name} className="flex items-center gap-3">
                                    <span className="text-lg">{['🥇', '🥈', '🥉'][i]}</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{cat.name}</p>
                                        <div className="h-2 bg-slate-800 rounded-full mt-1">
                                            <div
                                                className="h-full bg-teal-500 rounded-full"
                                                style={{ width: `${(cat.sessions / MOCK_OVERVIEW.topCategories[0].sessions) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm text-slate-400">{cat.sessions}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NEP 2020 Compliance */}
                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                        <h3 className="font-bold text-emerald-300 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            NEP 2020 Alignment
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Critical Thinking</span>
                                <span className="text-emerald-300">✓ Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Multidisciplinary</span>
                                <span className="text-emerald-300">✓ Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Holistic Development</span>
                                <span className="text-emerald-300">✓ Active</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Technology Integration</span>
                                <span className="text-emerald-300">✓ Active</span>
                            </div>
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-3 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-teal-400" />
                            System Status
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>Local storage: Active</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                <span>Cloud sync: Offline</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span>Data export: Ready</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
