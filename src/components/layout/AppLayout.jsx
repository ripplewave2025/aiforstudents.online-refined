import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
    Home,
    MessageSquare,
    Brain,
    Mic,
    BarChart3,
    LogOut,
    GraduationCap,
    Users,
    FileCheck,
    Menu,
    X,
    Map,
    FileText,
    BookOpen,
    Compass,
    Shield,
    School,
    Heart,
    Target,
    Headphones
} from 'lucide-react';

const StudentNav = [
    { to: '/student', icon: Home, label: 'Dashboard', end: true },
    { to: '/student/reasoning', icon: MessageSquare, label: 'Reasoning' },
    { to: '/student/workspace', icon: Brain, label: 'Think' },
    { to: '/student/map', icon: Map, label: 'Curiosity Map' },
    { to: '/student/artifacts', icon: FileText, label: 'Artifacts' },
    { to: '/student/reflections', icon: BookOpen, label: 'Reflect' },
    { to: '/student/vision', icon: Compass, label: 'My Vision' },
    { to: '/student/speaking', icon: Mic, label: 'Speaking' },
    { to: '/student/progress', icon: BarChart3, label: 'Progress' },
];

const TeacherNav = [
    { to: '/teacher', icon: Home, label: 'Dashboard', end: true },
    { to: '/teacher/class', icon: BarChart3, label: 'Class Insights' },
    { to: '/teacher/artifacts', icon: FileCheck, label: 'Review' },
    { to: '/teacher/plans', icon: Target, label: 'Student Plans' },
];

const ParentNav = [
    { to: '/parent', icon: Home, label: 'My Child', end: true },
    { to: '/parent/resources', icon: Headphones, label: 'Resources' },
];

const AdminNav = [
    { to: '/admin', icon: Shield, label: 'Dashboard', end: true },
    { to: '/admin/reports', icon: FileText, label: 'Reports' },
    { to: '/admin/parents', icon: Users, label: 'Parent Summaries' },
];

export const AppLayout = ({ children }) => {
    const { user, logout, isStudent, isTeacher, isParent, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const navItems = isStudent ? StudentNav
        : isTeacher ? TeacherNav
            : isParent ? ParentNav
                : isAdmin ? AdminNav
                    : [];

    // For mobile bottom nav, show only first 5 items
    const mobileNavItems = navItems.slice(0, 5);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Role-specific branding
    const getBrandColor = () => {
        if (isAdmin) return 'from-indigo-500 to-purple-500';
        if (isTeacher) return 'from-amber-500 to-orange-500';
        if (isParent) return 'from-pink-500 to-rose-500';
        return 'from-teal-500 to-emerald-500';
    };

    const getBrandIcon = () => {
        if (isAdmin) return Shield;
        if (isTeacher) return School;
        if (isParent) return Heart;
        return GraduationCap;
    };

    const getBrandLabel = () => {
        if (isAdmin) return 'Admin Portal';
        if (isTeacher) return 'Teacher Dashboard';
        if (isParent) return 'Parent Portal';
        return 'Think First';
    };

    const BrandIcon = getBrandIcon();

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex-col z-40">
                {/* Logo */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getBrandColor()} flex items-center justify-center`}>
                            <BrandIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">AIforStudents</h1>
                            <p className="text-xs text-slate-400">{getBrandLabel()}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${isActive
                                    ? 'bg-teal-600/20 text-teal-400 border border-teal-500/30'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User info & Logout */}
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getBrandColor()} flex items-center justify-center text-white font-bold`}>
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{user?.name}</p>
                            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getBrandColor()} flex items-center justify-center`}>
                        <BrandIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold">AIforStudents</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-slate-400 hover:text-white"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden fixed inset-x-0 top-16 bg-slate-900 border-b border-slate-800 z-40 p-4 max-h-[70vh] overflow-y-auto"
                >
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-teal-600/20 text-teal-400'
                                        : 'text-slate-400 hover:bg-slate-800'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Log out</span>
                        </button>
                    </nav>
                </motion.div>
            )}

            {/* Main Content */}
            <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50">
                <div className="flex justify-around py-2">
                    {mobileNavItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 px-3 py-2 ${isActive ? 'text-teal-400' : 'text-slate-400'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-xs">{item.label.split(' ')[0]}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    );
};
