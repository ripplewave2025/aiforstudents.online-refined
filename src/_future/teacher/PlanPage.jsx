import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    FileText,
    Download,
    Calendar,
    Target,
    Star,
    ChevronRight,
    Plus,
    Edit,
    Check,
    Clock,
    Brain,
    TrendingUp
} from 'lucide-react';

// Mock class data
const MOCK_STUDENTS = [
    { id: 's1', name: 'Tenzin Dorji', age: 13, ctIndex: 72, sessions: 15, parents: 'Dorji Family' },
    { id: 's2', name: 'Pemba Sherpa', age: 12, ctIndex: 58, sessions: 8, parents: 'Sherpa Family' },
    { id: 's3', name: 'Karma Lhamu', age: 13, ctIndex: 85, sessions: 22, parents: 'Lhamu Family' },
    { id: 's4', name: 'Dawa Tamang', age: 11, ctIndex: 45, sessions: 5, parents: 'Tamang Family' },
];

// Plan templates
const PLAN_TEMPLATES = [
    {
        id: 'struggling',
        name: 'For Struggling Students',
        description: 'Extra support plan for students below 50% CTI',
        goals: ['Increase question frequency', 'Build assumption awareness', 'Daily reflection practice'],
        parentActions: ['Daily 10-min discussion', 'Praise all questions', 'Read together weekly'],
        teacherActions: ['Weekly check-in', 'Simplified reasoning prompts', 'Pair with mentor student'],
    },
    {
        id: 'average',
        name: 'Growth Plan',
        description: 'Standard development plan for 50-70% CTI',
        goals: ['Deepen evidence gathering', 'Practice counter-arguments', 'Build speaking confidence'],
        parentActions: ['Weekly debate on topics', 'Encourage news discussion', 'Support interests'],
        teacherActions: ['Bi-weekly artifact review', 'Class participation nudges', 'Challenge questions'],
    },
    {
        id: 'advanced',
        name: 'Excellence Plan',
        description: 'For high performers above 70% CTI',
        goals: ['Lead peer discussions', 'Complex topic exploration', 'Create teaching artifacts'],
        parentActions: ['Independent project support', 'Connect to real experts', 'Stretch conversations'],
        teacherActions: ['Monthly mentoring', 'Special projects', 'Conference presentations'],
    },
];

export const TeacherPlanPage = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customGoals, setCustomGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    const getStudentTemplate = (ctIndex) => {
        if (ctIndex < 50) return PLAN_TEMPLATES[0];
        if (ctIndex < 70) return PLAN_TEMPLATES[1];
        return PLAN_TEMPLATES[2];
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setSelectedTemplate(getStudentTemplate(student.ctIndex));
        setCustomGoals([]);
    };

    const addCustomGoal = () => {
        if (newGoal.trim()) {
            setCustomGoals([...customGoals, { text: newGoal, completed: false }]);
            setNewGoal('');
        }
    };

    const downloadPlan = () => {
        if (!selectedStudent || !selectedTemplate) return;

        const plan = {
            student: selectedStudent.name,
            ctIndex: selectedStudent.ctIndex,
            template: selectedTemplate.name,
            goals: [...selectedTemplate.goals, ...customGoals.map(g => g.text)],
            parentActions: selectedTemplate.parentActions,
            teacherActions: selectedTemplate.teacherActions,
            generatedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `plan_${selectedStudent.name.replace(/\s+/g, '_').toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                    <Target className="w-8 h-8 text-amber-400" />
                    Student Development Plans
                </h1>
                <p className="text-slate-400">
                    Create personalized plans with parent suggestions
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Student List */}
                <div className="md:col-span-1">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-slate-400" />
                        Select Student
                    </h3>
                    <div className="space-y-2">
                        {MOCK_STUDENTS.map(student => (
                            <button
                                key={student.id}
                                onClick={() => handleSelectStudent(student)}
                                className={`w-full p-4 rounded-xl text-left transition-colors ${selectedStudent?.id === student.id
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-slate-800 hover:bg-slate-700'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{student.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${student.ctIndex >= 70 ? 'bg-emerald-500/20 text-emerald-300' :
                                            student.ctIndex >= 50 ? 'bg-amber-500/20 text-amber-300' :
                                                'bg-red-500/20 text-red-300'
                                        }`}>
                                        {student.ctIndex}%
                                    </span>
                                </div>
                                <p className="text-xs opacity-70">Age {student.age} • {student.sessions} sessions</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plan Builder */}
                <div className="md:col-span-2">
                    {selectedStudent ? (
                        <motion.div
                            key={selectedStudent.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {/* Student Summary */}
                            <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border border-amber-500/30 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                                        <p className="text-slate-400">Parent Contact: {selectedStudent.parents}</p>
                                    </div>
                                    <div className="p-3 bg-slate-800 rounded-xl text-center">
                                        <p className="text-2xl font-bold text-amber-400">{selectedStudent.ctIndex}%</p>
                                        <p className="text-xs text-slate-500">CTI Score</p>
                                    </div>
                                </div>
                                <p className="text-sm text-amber-200">
                                    📋 Recommended: <strong>{selectedTemplate?.name}</strong>
                                </p>
                            </div>

                            {/* Goals Section */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-400" />
                                    Student Goals
                                </h3>
                                <div className="space-y-2 mb-4">
                                    {selectedTemplate?.goals.map((goal, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                            <Target className="w-4 h-4 text-amber-400" />
                                            <span>{goal}</span>
                                        </div>
                                    ))}
                                    {customGoals.map((goal, i) => (
                                        <div key={`custom-${i}`} className="flex items-center gap-3 p-3 bg-teal-950/30 rounded-lg">
                                            <Target className="w-4 h-4 text-teal-400" />
                                            <span>{goal.text}</span>
                                            <span className="text-xs text-teal-400 ml-auto">Custom</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newGoal}
                                        onChange={(e) => setNewGoal(e.target.value)}
                                        placeholder="Add custom goal..."
                                        className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500"
                                        onKeyPress={(e) => e.key === 'Enter' && addCustomGoal()}
                                    />
                                    <button
                                        onClick={addCustomGoal}
                                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Parent Actions */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-pink-400" />
                                    Suggestions for Parents
                                </h3>
                                <div className="space-y-3">
                                    {selectedTemplate?.parentActions.map((action, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-pink-950/30 border border-pink-500/30 rounded-lg">
                                            <Check className="w-5 h-5 text-pink-400 mt-0.5" />
                                            <span className="text-pink-100">{action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Teacher Actions */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-teal-400" />
                                    Teacher Actions
                                </h3>
                                <div className="space-y-3">
                                    {selectedTemplate?.teacherActions.map((action, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-teal-950/30 border border-teal-500/30 rounded-lg">
                                            <Check className="w-5 h-5 text-teal-400 mt-0.5" />
                                            <span className="text-teal-100">{action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    onClick={downloadPlan}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-medium transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Plan
                                </button>
                                <button
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-medium transition-colors"
                                >
                                    <Users className="w-5 h-5" />
                                    Share with Parent
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex items-center justify-center h-64 bg-slate-900/30 border border-slate-800 rounded-2xl">
                            <div className="text-center text-slate-500">
                                <Users className="w-12 h-12 mx-auto mb-3" />
                                <p>Select a student to create their plan</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
