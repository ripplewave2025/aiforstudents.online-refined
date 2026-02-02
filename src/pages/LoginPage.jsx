import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, User, Users, Shield, ArrowRight, ChevronLeft } from 'lucide-react';

const RoleCard = ({ icon: Icon, title, description, color, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`w-full p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] ${color}`}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
    >
        <Icon className="w-8 h-8 mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
    </motion.button>
);

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState('role'); // 'role' or 'credentials'
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setStep('credentials');
        // Pre-fill demo email
        setEmail(`demo@${role}`);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password, selectedRole);
        if (result.success) {
            const routes = {
                student: '/student',
                teacher: '/teacher',
                parent: '/parent',
                admin: '/admin'
            };
            navigate(routes[selectedRole] || '/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-12"
            >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">AIforStudents</h1>
                    <p className="text-sm text-slate-400">Critical Thinking First</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                {step === 'role' && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                            <p className="text-slate-400">Choose your role to continue</p>
                        </div>

                        <div className="space-y-4">
                            <RoleCard
                                icon={User}
                                title="I'm a Student"
                                description="Practice critical thinking, record your reasoning, and track your growth."
                                color="bg-purple-950/30 border-purple-500/50 text-purple-300 hover:bg-purple-950/50"
                                onClick={() => handleRoleSelect('student')}
                            />
                            <RoleCard
                                icon={Users}
                                title="I'm a Teacher"
                                description="Guide student reasoning, review artifacts, and track class progress."
                                color="bg-teal-950/30 border-teal-500/50 text-teal-300 hover:bg-teal-950/50"
                                onClick={() => handleRoleSelect('teacher')}
                            />
                            <RoleCard
                                icon={Users}
                                title="I'm a Parent"
                                description="Track your child's thinking journey and get personalized tips."
                                color="bg-pink-950/30 border-pink-500/50 text-pink-300 hover:bg-pink-950/50"
                                onClick={() => handleRoleSelect('parent')}
                            />
                            <RoleCard
                                icon={Shield}
                                title="I'm an Admin"
                                description="View school-wide metrics and manage the system."
                                color="bg-amber-950/30 border-amber-500/50 text-amber-300 hover:bg-amber-950/50"
                                onClick={() => handleRoleSelect('admin')}
                            />
                        </div>
                    </div>
                )}

                {step === 'credentials' && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
                        <button
                            onClick={() => setStep('role')}
                            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Change role
                        </button>

                        <h2 className="text-2xl font-bold mb-2 capitalize">
                            {selectedRole} Login
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Enter your credentials to continue
                        </p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}

                            <div className="bg-teal-950/30 border border-teal-500/30 rounded-xl p-4 text-sm text-teal-300">
                                <strong>Demo Mode:</strong> Use any email containing "{selectedRole}" (e.g., demo@{selectedRole}) to log in.
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                )}

                {/* Back to home link */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        ← Back to home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
