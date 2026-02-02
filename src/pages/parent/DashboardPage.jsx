import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    User,
    Lightbulb,
    ThumbsUp,
    Play,
    Volume2,
    ChevronRight,
    MessageCircle,
    Calendar,
    Compass,
    RefreshCw
} from 'lucide-react';

// Mock linked student data - reframed for growth, not scores
const MOCK_STUDENT = {
    id: 's1',
    name: 'Tenzin Dorji',
    class: '8A',
    age: 13,
    school: 'Himalayan Academy',
    interests: ['Science', 'Technology', 'Art'],
    vision: 'I want to become a scientist and help solve environmental problems.',
    // Growth-focused data
    thinkingJourney: {
        recentTopics: ['Climate Change', 'Photosynthesis', 'Newton\'s Laws'],
        questionsThisMonth: 15,
        revisedThinking: 3,
        expressedUncertainty: 5,
    },
    growthNarrative: "Your child has been exploring questions about environmental science and physics. They've become more comfortable expressing uncertainty — this is a sign of intellectual growth.",
    goals: [
        { text: 'Ask better questions', completed: true },
        { text: 'Challenge assumptions daily', completed: false },
        { text: 'Read one science article per week', completed: true },
    ]
};

// Age-appropriate suggestions
const AGE_SUGGESTIONS = {
    '6-9': [
        { title: 'Ask "What if...?" questions', icon: '🤔', tip: 'Encourage wild imagination during play' },
        { title: 'Praise effort, not results', icon: '💪', tip: 'Say "You worked so hard!" instead of "You\'re so smart"' },
        { title: 'Read together daily', icon: '📚', tip: '15 minutes before bed builds connection and curiosity' },
    ],
    '10-13': [
        { title: 'Let them struggle (a little)', icon: '🧗', tip: 'Don\'t solve problems immediately - let them think first' },
        { title: 'Discuss news together', icon: '📰', tip: 'Ask "What do you think about this?"' },
        { title: 'Support their interests', icon: '🎯', tip: 'Even unusual hobbies build critical thinking' },
    ],
    '14-18': [
        { title: 'Respect their opinions', icon: '🗣️', tip: 'Even when you disagree, listen fully first' },
        { title: 'Discuss future plans', icon: '🎓', tip: 'Ask about their vision, not just career' },
        { title: 'Give real responsibility', icon: '🔑', tip: 'Trust builds confidence and decision-making' },
    ]
};

// Positive reinforcement techniques
const REINFORCEMENT_TECHNIQUES = [
    {
        id: 'specific-praise',
        title: 'Specific Praise',
        description: 'Instead of "Good job", say exactly what was good',
        example: '"I noticed you checked your work twice - that\'s careful thinking!"',
    },
    {
        id: 'growth-mindset',
        title: 'Growth Mindset Talk',
        description: 'Focus on the process of learning, not just outcomes',
        example: '"You didn\'t know this yesterday, but you practiced and now you do!"',
    },
    {
        id: 'curiosity-reward',
        title: 'Reward Curiosity',
        description: 'Celebrate when they ask questions, even difficult ones',
        example: '"That\'s such a great question! Let\'s find out together."',
    },
    {
        id: 'effort-acknowledgment',
        title: 'Acknowledge Effort',
        description: 'Notice when they try hard, even if they fail',
        example: '"I saw how much effort you put into this. That matters more than the grade."',
    }
];

const TechniqueCard = ({ technique, onPlay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
    >
        <h4 className="font-bold mb-2">{technique.title}</h4>
        <p className="text-sm text-slate-400 mb-3">{technique.description}</p>
        <div className="p-3 bg-teal-950/30 border border-teal-500/30 rounded-lg mb-3">
            <p className="text-sm text-teal-200 italic">"{technique.example}"</p>
        </div>
        <div className="flex gap-2">
            <button
                onClick={() => onPlay('video', technique)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
            >
                <Play className="w-4 h-4" />
                Watch Video
            </button>
            <button
                onClick={() => onPlay('audio', technique)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm transition-colors"
            >
                <Volume2 className="w-4 h-4" />
                Listen
            </button>
        </div>
    </motion.div>
);

export const ParentDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const student = MOCK_STUDENT;
    const ageGroup = student.age <= 9 ? '6-9' : student.age <= 13 ? '10-13' : '14-18';
    const suggestions = AGE_SUGGESTIONS[ageGroup];

    const handlePlayMedia = (type, technique) => {
        alert(`${type === 'video' ? '📹' : '🔊'} Would play ${type} for: ${technique.title}\n\nThis feature requires media files to be uploaded.`);
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ne', label: 'नेपाली' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'bn', label: 'বাংলা' },
    ];

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header with Language Selector */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                        <Heart className="w-8 h-8 text-pink-400" />
                        Parent Dashboard
                    </h1>
                    <p className="text-slate-400">
                        Supporting {student.name}'s learning journey
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-slate-400" />
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm"
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.label}</option>
                        ))}
                    </select>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 mb-6 overflow-x-auto pb-2"
            >
                {[
                    { id: 'overview', label: 'My Child', icon: User },
                    { id: 'tips', label: 'Parenting Tips', icon: Lightbulb },
                    { id: 'techniques', label: 'How to Help', icon: ThumbsUp },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                            ? 'bg-pink-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {/* Overview Tab - Growth focused, no scores */}
            {activeTab === 'overview' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Student Card - No scores! */}
                    <div className="bg-gradient-to-br from-pink-950/40 to-purple-950/40 border border-pink-500/30 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                                {student.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{student.name}</h2>
                                <p className="text-slate-400">Class {student.class} • Age {student.age}</p>
                                <p className="text-sm text-slate-500">{student.school}</p>
                            </div>
                        </div>

                        {/* Growth Narrative - instead of scores */}
                        <div className="p-4 bg-teal-950/30 border border-teal-500/30 rounded-xl mb-4">
                            <div className="flex items-start gap-3">
                                <Compass className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-teal-500 uppercase tracking-wide mb-1">Growth This Month</p>
                                    <p className="text-teal-200">{student.growthNarrative}</p>
                                </div>
                            </div>
                        </div>

                        {/* Vision */}
                        {student.vision && (
                            <div className="p-4 bg-slate-800/50 rounded-xl mb-4">
                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Their Vision</p>
                                <p className="text-slate-200 italic">"{student.vision}"</p>
                            </div>
                        )}

                        {/* Interests */}
                        <div className="flex flex-wrap gap-2">
                            {student.interests.map((interest, i) => (
                                <span key={i} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* What They're Exploring - topics, not scores */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            What They're Exploring
                        </h3>
                        <div className="space-y-3">
                            {student.thinkingJourney.recentTopics.map((topic, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                                    <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center">
                                        <Compass className="w-4 h-4 text-teal-400" />
                                    </div>
                                    <span className="text-slate-200">{topic}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 mt-4">
                            💡 {student.thinkingJourney.questionsThisMonth} questions asked this month
                        </p>
                    </div>

                    {/* Signs of Growth - no numbers, just observations */}
                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-emerald-400" />
                            Signs of Growth
                        </h3>
                        <div className="space-y-3 text-sm">
                            {student.thinkingJourney.revisedThinking > 0 && (
                                <p className="text-emerald-200">
                                    ✓ Revised their thinking {student.thinkingJourney.revisedThinking} time{student.thinkingJourney.revisedThinking === 1 ? '' : 's'} — this shows they're learning!
                                </p>
                            )}
                            {student.thinkingJourney.expressedUncertainty > 0 && (
                                <p className="text-emerald-200">
                                    ✓ Comfortable saying "I'm not sure" — intellectual honesty is a strength
                                </p>
                            )}
                            <p className="text-slate-500 mt-3">
                                These are signs of deep learning, not just memorization.
                            </p>
                        </div>
                    </div>

                    {/* Goals Progress */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4">Their Goals</h3>
                        <div className="space-y-2">
                            {student.goals.map((goal, i) => (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${goal.completed ? 'bg-emerald-950/30' : 'bg-slate-800/50'
                                    }`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${goal.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                                        }`}>
                                        {goal.completed && <span className="text-xs">✓</span>}
                                    </div>
                                    <span className={goal.completed ? 'line-through text-slate-500' : ''}>
                                        {goal.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Parenting Tips Tab */}
            {activeTab === 'tips' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Age-specific banner */}
                    <div className="bg-gradient-to-r from-amber-950/50 to-orange-950/50 border border-amber-500/30 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-2">
                            For Parents of {ageGroup} Year Olds
                        </h3>
                        <p className="text-slate-300 text-sm">
                            These suggestions are tailored for your child's developmental stage.
                        </p>
                    </div>

                    {/* Tips Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {suggestions.map((suggestion, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center"
                            >
                                <div className="text-4xl mb-3">{suggestion.icon}</div>
                                <h4 className="font-bold mb-2">{suggestion.title}</h4>
                                <p className="text-sm text-slate-400">{suggestion.tip}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Audio Guides */}
                    <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-purple-400" />
                            Quick Audio Guides
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Tap to listen (2-3 minutes each)
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                'How to praise effectively',
                                'Handling homework struggles',
                                'Building curiosity',
                                'When they fail at something'
                            ].map((guide, i) => (
                                <button
                                    key={i}
                                    onClick={() => alert(`🔊 Would play audio: "${guide}"`)}
                                    className="flex items-center gap-3 p-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-left transition-colors"
                                >
                                    <Play className="w-6 h-6" />
                                    <span className="text-sm font-medium">{guide}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Weekly Focus */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="font-bold mb-4">This Week's Focus</h3>
                        <div className="p-4 bg-teal-950/30 border border-teal-500/30 rounded-xl">
                            <p className="text-teal-200 font-medium mb-2">
                                🎯 Ask "What did you learn today that surprised you?"
                            </p>
                            <p className="text-sm text-slate-400">
                                This question encourages reflection and values curiosity over grades.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Techniques Tab */}
            {activeTab === 'techniques' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Intro */}
                    <div className="bg-gradient-to-br from-teal-950/40 to-emerald-950/40 border border-teal-500/30 rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <ThumbsUp className="w-5 h-5 text-teal-400" />
                            Positive Reinforcement
                        </h3>
                        <p className="text-slate-300 text-sm">
                            These techniques help build your child's confidence and love of learning.
                            Each has a short video and audio explanation you can watch or listen to.
                        </p>
                    </div>

                    {/* Techniques Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {REINFORCEMENT_TECHNIQUES.map((technique, i) => (
                            <TechniqueCard
                                key={technique.id}
                                technique={technique}
                                onPlay={handlePlayMedia}
                            />
                        ))}
                    </div>

                    {/* Daily Reminder */}
                    <div className="bg-pink-950/30 border border-pink-500/30 rounded-2xl p-6">
                        <h3 className="font-bold mb-3">💡 Daily Reminder</h3>
                        <p className="text-pink-200">
                            Your words shape how your child sees themselves.
                            Today, try to praise one thing they <strong>tried</strong>, not just achieved.
                        </p>
                    </div>

                    {/* Ask a Teacher */}
                    <button className="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition-colors">
                        <div className="flex items-center gap-3">
                            <MessageCircle className="w-6 h-6 text-blue-400" />
                            <div className="text-left">
                                <p className="font-medium">Have Questions?</p>
                                <p className="text-sm text-slate-400">Message {student.name}'s teacher</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                </motion.div>
            )}

            {/* Philosophy Note */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center text-sm text-slate-500"
            >
                <p>
                    No scores. No rankings. No pressure. <br />
                    Just understanding and supporting your child's journey.
                </p>
            </motion.div>
        </div>
    );
};
