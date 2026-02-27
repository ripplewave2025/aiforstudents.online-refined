import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    HelpCircle,
    Video,
    FileCheck,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Copy,
    MoreVertical,
    ArrowLeft,
    Plus,
    TrendingUp,
    Calendar,
    Users
} from 'lucide-react';

// Content Card Component
const ContentCard = ({ content, onEdit, onDelete, onDuplicate }) => {
    const [showMenu, setShowMenu] = useState(false);

    const typeIcons = {
        lesson: BookOpen,
        quiz: HelpCircle,
        video: Video,
        worksheet: FileCheck
    };
    const Icon = typeIcons[content.type] || BookOpen;

    const typeColors = {
        lesson: 'from-blue-500 to-blue-600',
        quiz: 'from-emerald-500 to-emerald-600',
        video: 'from-pink-500 to-pink-600',
        worksheet: 'from-purple-500 to-purple-600'
    };

    const statusColors = {
        published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        draft: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        archived: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -4 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all group"
        >
            {/* Header with gradient */}
            <div className={`h-2 bg-gradient-to-r ${typeColors[content.type]}`} />

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[content.type]} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[content.status]}`}>
                                {content.status}
                            </span>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-1 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl shadow-black/20 py-1 z-10"
                                >
                                    <button
                                        onClick={() => { onEdit(content); setShowMenu(false); }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => { onDuplicate(content); setShowMenu(false); }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Duplicate
                                    </button>
                                    <hr className="my-1 border-slate-700" />
                                    <button
                                        onClick={() => { onDelete(content); setShowMenu(false); }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {content.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {content.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {content.views}
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {content.students}
                    </div>
                    <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {content.completion}%
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {content.updatedAt}
                    </div>
                    <span className="text-xs text-slate-500 capitalize">{content.subject}</span>
                </div>
            </div>
        </motion.div>
    );
};

export const MyContentPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Mock content data
    const [contents] = useState([
        {
            id: '1',
            title: 'Introduction to Algebra',
            description: 'A comprehensive lesson on algebraic expressions, equations, and problem-solving techniques for beginners.',
            type: 'lesson',
            status: 'published',
            views: 234,
            students: 156,
            completion: 78,
            subject: 'Mathematics',
            updatedAt: '2 days ago'
        },
        {
            id: '2',
            title: 'Photosynthesis Quiz',
            description: 'Test your knowledge of photosynthesis with this interactive quiz covering light reactions and the Calvin cycle.',
            type: 'quiz',
            status: 'published',
            views: 189,
            students: 123,
            completion: 85,
            subject: 'Science',
            updatedAt: '5 days ago'
        },
        {
            id: '3',
            title: 'Essay Writing Workshop',
            description: 'Learn how to structure your essays effectively with this step-by-step worksheet guide.',
            type: 'worksheet',
            status: 'draft',
            views: 0,
            students: 0,
            completion: 0,
            subject: 'English',
            updatedAt: '1 week ago'
        },
        {
            id: '4',
            title: 'Science Experiment: Volcano',
            description: 'Watch and learn how to create a baking soda volcano while understanding chemical reactions.',
            type: 'video',
            status: 'published',
            views: 312,
            students: 201,
            completion: 92,
            subject: 'Science',
            updatedAt: '2 weeks ago'
        },
        {
            id: '5',
            title: 'Fractions Made Easy',
            description: 'An interactive lesson on understanding fractions, from basics to complex operations.',
            type: 'lesson',
            status: 'draft',
            views: 0,
            students: 0,
            completion: 0,
            subject: 'Mathematics',
            updatedAt: '3 days ago'
        },
        {
            id: '6',
            title: 'World Geography Quiz',
            description: 'Challenge yourself with questions about continents, countries, and capitals.',
            type: 'quiz',
            status: 'published',
            views: 456,
            students: 289,
            completion: 71,
            subject: 'Social Studies',
            updatedAt: '1 week ago'
        },
    ]);

    const filteredContents = contents.filter(content => {
        const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            content.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || content.type === filterType;
        const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const handleEdit = (content) => {
        // Navigate to edit mode
        navigate(`/creator/studio?edit=${content.id}`);
    };

    const handleDelete = (content) => {
        // Show confirmation and delete
        console.log('Delete:', content.id);
    };

    const handleDuplicate = (content) => {
        // Duplicate content
        console.log('Duplicate:', content.id);
    };

    const stats = [
        { label: 'Total Content', value: contents.length },
        { label: 'Published', value: contents.filter(c => c.status === 'published').length },
        { label: 'Drafts', value: contents.filter(c => c.status === 'draft').length },
        { label: 'Total Views', value: contents.reduce((acc, c) => acc + c.views, 0) },
    ];

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/creator')}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white">My Content</h1>
                            <p className="text-slate-400">Manage and edit your educational content</p>
                        </div>
                    </div>
                    <motion.button
                        onClick={() => navigate('/creator/studio')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Plus className="w-5 h-5" />
                        Create New
                    </motion.button>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                >
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-sm text-slate-400">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search content..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${showFilters
                                ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white'
                            }`}
                    >
                        <Filter className="w-5 h-5" />
                        Filters
                    </button>
                </motion.div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="flex flex-wrap gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-2">Content Type</label>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="lesson">Lessons</option>
                                        <option value="quiz">Quizzes</option>
                                        <option value="worksheet">Worksheets</option>
                                        <option value="video">Videos</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-2">Status</label>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="published">Published</option>
                                        <option value="draft">Drafts</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredContents.map((content) => (
                            <ContentCard
                                key={content.id}
                                content={content}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredContents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-slate-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">No content found</h3>
                        <p className="text-slate-400 mb-6">
                            {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                                ? 'Try adjusting your filters or search query'
                                : "You haven't created any content yet"}
                        </p>
                        <motion.button
                            onClick={() => navigate('/creator/studio')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl"
                        >
                            <Plus className="w-5 h-5" />
                            Create Your First Content
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyContentPage;
