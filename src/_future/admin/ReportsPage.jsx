import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Download,
    Filter,
    Calendar,
    School,
    Users,
    Brain,
    TrendingUp,
    BarChart3,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

// Mock report data
const MOCK_REPORTS = [
    {
        id: 'r1',
        title: 'Monthly Critical Thinking Report',
        type: 'monthly',
        period: 'January 2024',
        school: 'All Schools',
        metrics: {
            totalSessions: 1245,
            avgCTI: 68,
            improvement: 5
        }
    },
    {
        id: 'r2',
        title: 'Quarterly NEP 2020 Compliance',
        type: 'quarterly',
        period: 'Q4 2023',
        school: 'All Schools',
        metrics: {
            complianceScore: 92,
            areas: 4
        }
    },
    {
        id: 'r3',
        title: 'School Performance Summary',
        type: 'school',
        period: 'January 2024',
        school: 'Himalayan Academy',
        metrics: {
            students: 245,
            avgCTI: 72
        }
    }
];

const ReportCard = ({ report, onDownload }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-5"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${report.type === 'monthly' ? 'bg-blue-500/20' :
                        report.type === 'quarterly' ? 'bg-purple-500/20' : 'bg-teal-500/20'
                    }`}>
                    <FileText className={`w-5 h-5 ${report.type === 'monthly' ? 'text-blue-400' :
                            report.type === 'quarterly' ? 'text-purple-400' : 'text-teal-400'
                        }`} />
                </div>
                <div>
                    <h3 className="font-bold">{report.title}</h3>
                    <p className="text-xs text-slate-400">{report.period} • {report.school}</p>
                </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs capitalize ${report.type === 'monthly' ? 'bg-blue-500/20 text-blue-300' :
                    report.type === 'quarterly' ? 'bg-purple-500/20 text-purple-300' : 'bg-teal-500/20 text-teal-300'
                }`}>
                {report.type}
            </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
            {Object.entries(report.metrics).slice(0, 3).map(([key, value]) => (
                <div key={key} className="text-center p-2 bg-slate-900/50 rounded-lg">
                    <p className="text-lg font-bold">{typeof value === 'number' && key.includes('improvement') ? `+${value}%` : value}</p>
                    <p className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
            ))}
        </div>

        <button
            onClick={() => onDownload(report)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
        >
            <Download className="w-4 h-4" />
            Download Report
        </button>
    </motion.div>
);

export const ReportsPage = () => {
    const [filter, setFilter] = useState('all');
    const [generating, setGenerating] = useState(false);

    const filteredReports = MOCK_REPORTS.filter(r =>
        filter === 'all' ? true : r.type === filter
    );

    const downloadReport = (report) => {
        // Simulate report download
        const reportContent = {
            ...report,
            generatedAt: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(reportContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title.replace(/\s+/g, '_').toLowerCase()}_${report.period.replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const generateNewReport = () => {
        setGenerating(true);
        setTimeout(() => {
            alert('Report generated! (MVP: This would create a new report based on current data)');
            setGenerating(false);
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-purple-400" />
                        Reports & Analytics
                    </h1>
                    <p className="text-slate-400">
                        NEP 2020 compliance reports and performance analytics
                    </p>
                </div>
                <button
                    onClick={generateNewReport}
                    disabled={generating}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl font-medium transition-colors"
                >
                    {generating ? 'Generating...' : 'Generate Report'}
                </button>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 mb-6"
            >
                {['all', 'monthly', 'quarterly', 'school'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-xl text-sm transition-colors ${filter === type
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </motion.div>

            {/* Report Templates */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
            >
                <h3 className="font-bold mb-4">Quick Reports</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <button className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition-colors">
                        <Brain className="w-6 h-6 text-teal-400 mb-2" />
                        <h4 className="font-medium">CT Index Summary</h4>
                        <p className="text-xs text-slate-400">Platform-wide critical thinking metrics</p>
                    </button>
                    <button className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-2" />
                        <h4 className="font-medium">NEP 2020 Compliance</h4>
                        <p className="text-xs text-slate-400">Alignment with national education policy</p>
                    </button>
                    <button className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition-colors">
                        <Users className="w-6 h-6 text-blue-400 mb-2" />
                        <h4 className="font-medium">Parent Summary</h4>
                        <p className="text-xs text-slate-400">Student progress for parents</p>
                    </button>
                </div>
            </motion.div>

            {/* Reports Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReports.map((report, i) => (
                    <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                    >
                        <ReportCard report={report} onDownload={downloadReport} />
                    </motion.div>
                ))}
            </div>

            {filteredReports.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Reports Found</h3>
                    <p className="text-slate-400">No reports match the selected filter.</p>
                </div>
            )}
        </div>
    );
};
