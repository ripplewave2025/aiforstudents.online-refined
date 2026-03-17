import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    PlusCircle,
    FileText,
    BarChart3,
    Users,
    Eye,
    TrendingUp,
    BookOpen,
    Video,
    HelpCircle,
    FileCheck,
    ArrowRight,
    Sparkles
} from 'lucide-react';

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
                <span className={`text-sm font-medium ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
    </motion.div>
);

// Quick Action Card
const QuickActionCard = ({ icon: Icon, title, description, onClick, color }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full text-left bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-all group"
    >
        <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 group-hover:text-orange-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
        </div>
    </motion.button>
);

// Recent Content Item
const ContentItem = ({ title, type, views, status, date }) => {
    const typeIcons = {
        lesson: BookOpen,
        quiz: HelpCircle,
        video: Video,
        worksheet: FileCheck
    };
    const Icon = typeIcons[type] || FileText;

    const statusColors = {
        published: 'bg-emerald-500/20 text-emerald-400',
        draft: 'bg-amber-500/20 text-amber-400',
        review: 'bg-blue-500/20 text-blue-400'
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{title}</h4>
                <p className="text-xs text-slate-500 capitalize">{type} • {date}</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Eye className="w-4 h-4" />
                    {views}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

export const CreatorDashboardPage = () => {
    const navigate = useNavigate();
    const { profile } = useAuth();

    // Mock data for dashboard
    const stats = [
        { icon: FileText, label: 'Total Content', value: '24', trend: 12, color: 'from-orange-500 to-orange-600' },
        { icon: Eye, label: 'Total Views', value: '1.2K', trend: 8, color: 'from-blue-500 to-blue-600' },
        { icon: Users, label: 'Students Reached', value: '156', trend: 15, color: 'from-emerald-500 to-emerald-600' },
        { icon: TrendingUp, label: 'Engagement Rate', value: '78%', trend: 5, color: 'from-purple-500 to-purple-600' },
    ];

    const recentContent = [
        { title: 'Introduction to Algebra', type: 'lesson', views: 234, status: 'published', date: '2 days ago' },
        { title: 'Photosynthesis Quiz', type: 'quiz', views: 156, status: 'published', date: '5 days ago' },
        { title: 'Essay Writing Tips', type: 'worksheet', views: 89, status: 'draft', date: '1 week ago' },
        { title: 'Science Experiment Demo', type: 'video', views: 312, status: 'published', date: '2 weeks ago' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-8 h-8 text-orange-400" />
                        <h1 className="text-3xl font-bold text-white">Creator Studio</h1>
                    </div>
                    <p className="text-slate-400">
                        Welcome back, <span className="text-orange-400">{profile?.name || 'Creator'}</span>!
                        Ready to inspire more students today?
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <StatCard {...stat} />
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-1"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <QuickActionCard
                                icon={PlusCircle}
                                title="Create New Content"
                                description="Start building a lesson, quiz, or worksheet"
                                onClick={() => navigate('/creator/studio')}
                                color="from-orange-500 to-amber-500"
                            />
                            <QuickActionCard
                                icon={FileText}
                                title="View My Content"
                                description="Manage and edit your existing content"
                                onClick={() => navigate('/creator/content')}
                                color="from-blue-500 to-cyan-500"
                            />
                            <QuickActionCard
                                icon={BarChart3}
                                title="Analytics"
                                description="See detailed performance metrics"
                                onClick={() => navigate('/creator/analytics')}
                                color="from-purple-500 to-pink-500"
                            />
                        </div>
                    </motion.div>

                    {/* Recent Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">Recent Content</h2>
                            <button
                                onClick={() => navigate('/creator/content')}
                                className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                            >
                                View all →
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentContent.map((content, i) => (
                                <motion.div
                                    key={content.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <ContentItem {...content} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-6"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Creator Tip of the Day</h3>
                            <p className="text-slate-300">
                                Students learn best when they can explore and ask questions. Try adding open-ended
                                reflection prompts at the end of your lessons to encourage critical thinking!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CreatorDashboardPage;
