import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Shield,
    Eye,
    MessageCircle,
    Sparkles,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Lightbulb,
    RefreshCw,
    Target,
    Compass,
    Star,
    Zap
} from 'lucide-react';

// First-principles character traits - grounded in truth and reality
const CHARACTER_DIMENSIONS = [
    {
        id: 'honesty',
        name: 'Truth & Honesty',
        icon: Shield,
        color: 'emerald',
        description: 'Aspires to speak truth, admits mistakes openly',
        levels: [
            { value: 1, label: 'Developing', description: 'Sometimes avoids admitting mistakes' },
            { value: 2, label: 'Growing', description: 'Admits mistakes when asked directly' },
            { value: 3, label: 'Strengthening', description: 'Usually speaks truth, occasional hesitation' },
            { value: 4, label: 'Flourishing', description: 'Proactively admits mistakes and corrects them' },
            { value: 5, label: 'Exemplary', description: 'Speaks truth naturally, helps others do the same' }
        ],
        progressWords: {
            up: ['Becoming more truthful', 'Growing in honesty', 'Building trust through openness'],
            maintain: ['Maintaining integrity', 'Consistently truthful', 'Reliable in honesty'],
            focus: ['Encourage admitting small mistakes', 'Praise truth-telling moments', 'Model honest self-reflection']
        }
    },
    {
        id: 'demeanor',
        name: 'Demeanor & Composure',
        icon: Heart,
        color: 'pink',
        description: 'Emotional regulation, kindness in interactions',
        levels: [
            { value: 1, label: 'Developing', description: 'Reactions often impulsive or intense' },
            { value: 2, label: 'Growing', description: 'Working on emotional awareness' },
            { value: 3, label: 'Strengthening', description: 'Generally calm, occasional outbursts' },
            { value: 4, label: 'Flourishing', description: 'Mostly composed, recovers quickly from upset' },
            { value: 5, label: 'Exemplary', description: 'Calm under pressure, helps others regulate' }
        ],
        progressWords: {
            up: ['Developing emotional intelligence', 'Growing in self-regulation', 'Building inner calm'],
            maintain: ['Steady temperament', 'Emotionally grounded', 'Consistent composure'],
            focus: ['Practice pause-before-reacting', 'Name emotions together', 'Celebrate calm moments']
        }
    },
    {
        id: 'curiosity',
        name: 'Genuine Curiosity',
        icon: Eye,
        color: 'amber',
        description: 'Asks real questions, seeks to understand deeply',
        levels: [
            { value: 1, label: 'Developing', description: 'Rarely asks questions unprompted' },
            { value: 2, label: 'Growing', description: 'Asks surface-level questions' },
            { value: 3, label: 'Strengthening', description: 'Shows interest in understanding "why"' },
            { value: 4, label: 'Flourishing', description: 'Regularly seeks deeper understanding' },
            { value: 5, label: 'Exemplary', description: 'Asks profound questions, explores independently' }
        ],
        progressWords: {
            up: ['Deepening inquiry', 'Expanding wonder', 'Growing intellectual appetite'],
            maintain: ['Curious mind active', 'Continues to question', 'Healthy skepticism'],
            focus: ['Answer questions with questions', 'Explore topics together', 'Reward "I don\'t know" moments']
        }
    },
    {
        id: 'responsibility',
        name: 'Ownership & Responsibility',
        icon: Target,
        color: 'blue',
        description: 'Takes ownership of actions and their consequences',
        levels: [
            { value: 1, label: 'Developing', description: 'Often blames others or circumstances' },
            { value: 2, label: 'Growing', description: 'Accepts responsibility when pointed out' },
            { value: 3, label: 'Strengthening', description: 'Usually owns mistakes after reflection' },
            { value: 4, label: 'Flourishing', description: 'Proactively takes responsibility' },
            { value: 5, label: 'Exemplary', description: 'Owns outcomes and helps fix situations' }
        ],
        progressWords: {
            up: ['Building accountability', 'Growing in ownership', 'Taking more initiative'],
            maintain: ['Reliable and accountable', 'Consistent responsibility', 'Dependable'],
            focus: ['Give real responsibilities', 'Discuss cause-and-effect', 'Avoid rescuing too quickly']
        }
    },
    {
        id: 'empathy',
        name: 'Empathy & Kindness',
        icon: Sparkles,
        color: 'purple',
        description: 'Understands others\' feelings and acts with kindness',
        levels: [
            { value: 1, label: 'Developing', description: 'Focused primarily on own needs' },
            { value: 2, label: 'Growing', description: 'Notices others\' feelings when pointed out' },
            { value: 3, label: 'Strengthening', description: 'Shows concern for others regularly' },
            { value: 4, label: 'Flourishing', description: 'Actively helps others, anticipates needs' },
            { value: 5, label: 'Exemplary', description: 'Deep empathy, inspires kindness in others' }
        ],
        progressWords: {
            up: ['Heart is opening', 'Growing compassion', 'Developing sensitivity'],
            maintain: ['Consistently kind', 'Empathetic presence', 'Caring nature'],
            focus: ['Read stories about feelings', 'Ask "How might they feel?"', 'Model empathy daily']
        }
    },
    {
        id: 'resilience',
        name: 'Resilience & Grit',
        icon: RefreshCw,
        color: 'teal',
        description: 'Bounces back from setbacks, persists through difficulty',
        levels: [
            { value: 1, label: 'Developing', description: 'Easily discouraged by obstacles' },
            { value: 2, label: 'Growing', description: 'Tries again with encouragement' },
            { value: 3, label: 'Strengthening', description: 'Persists through moderate challenges' },
            { value: 4, label: 'Flourishing', description: 'Bounces back quickly, learns from failure' },
            { value: 5, label: 'Exemplary', description: 'Seeks challenges, views failure as learning' }
        ],
        progressWords: {
            up: ['Building inner strength', 'Growing persistence', 'Developing grit'],
            maintain: ['Strong resilience', 'Steady perseverance', 'Reliable determination'],
            focus: ['Celebrate struggle, not just success', 'Share your own setbacks', 'Don\'t fix everything']
        }
    }
];

// AI-generated insight based on assessment
const generateInsight = (assessments) => {
    const avgScore = Object.values(assessments).reduce((a, b) => a + b, 0) / Object.values(assessments).length;

    const strengths = Object.entries(assessments)
        .filter(([_, value]) => value >= 4)
        .map(([key]) => CHARACTER_DIMENSIONS.find(d => d.id === key)?.name);

    const growthAreas = Object.entries(assessments)
        .filter(([_, value]) => value <= 2)
        .map(([key]) => CHARACTER_DIMENSIONS.find(d => d.id === key)?.name);

    const insights = [];

    if (strengths.length > 0) {
        insights.push(`✨ ${strengths.join(' and ')} ${strengths.length === 1 ? 'is' : 'are'} real strengths. This foundation supports all other growth.`);
    }

    if (growthAreas.length > 0) {
        insights.push(`🌱 ${growthAreas.join(' and ')} ${growthAreas.length === 1 ? 'is an area' : 'are areas'} for gentle attention. Small daily moments matter more than big interventions.`);
    }

    if (avgScore >= 3.5) {
        insights.push(`💫 Overall character development is on a healthy trajectory. Continue with consistent, patient support.`);
    } else {
        insights.push(`🎯 Focus on building one trait at a time. Rushing growth creates surface change, not deep development.`);
    }

    return insights;
};

// Component for individual trait assessment
const TraitAssessment = ({ dimension, value, onChange, isExpanded, onToggle }) => {
    const Icon = dimension.icon;
    const currentLevel = dimension.levels.find(l => l.value === value) || dimension.levels[2];
    const colorClasses = {
        emerald: 'from-emerald-500 to-emerald-600 border-emerald-500/30 bg-emerald-950/20',
        pink: 'from-pink-500 to-pink-600 border-pink-500/30 bg-pink-950/20',
        amber: 'from-amber-500 to-amber-600 border-amber-500/30 bg-amber-950/20',
        blue: 'from-blue-500 to-blue-600 border-blue-500/30 bg-blue-950/20',
        purple: 'from-purple-500 to-purple-600 border-purple-500/30 bg-purple-950/20',
        teal: 'from-teal-500 to-teal-600 border-teal-500/30 bg-teal-950/20',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-2xl overflow-hidden ${colorClasses[dimension.color].split(' ').slice(1).join(' ')}`}
        >
            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[dimension.color].split(' ').slice(0, 2).join(' ')} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold">{dimension.name}</h4>
                        <p className="text-sm text-slate-400">{currentLevel.label}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Mini progress dots */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${i <= value
                                        ? `bg-gradient-to-br ${colorClasses[dimension.color].split(' ').slice(0, 2).join(' ')}`
                                        : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 space-y-4">
                            <p className="text-sm text-slate-400">{dimension.description}</p>

                            {/* Level Selector */}
                            <div className="space-y-2">
                                {dimension.levels.map(level => (
                                    <button
                                        key={level.value}
                                        onClick={() => onChange(dimension.id, level.value)}
                                        className={`w-full p-3 rounded-xl text-left transition-all ${level.value === value
                                                ? `bg-gradient-to-r ${colorClasses[dimension.color].split(' ').slice(0, 2).join(' ')} text-white`
                                                : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{level.label}</span>
                                            {level.value === value && <CheckCircle className="w-4 h-4" />}
                                        </div>
                                        <p className="text-sm opacity-80 mt-1">{level.description}</p>
                                    </button>
                                ))}
                            </div>

                            {/* Progress Words / Suggestions */}
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <h5 className="text-xs uppercase tracking-wide text-slate-500 mb-2 flex items-center gap-2">
                                    <Lightbulb className="w-3 h-3" />
                                    How to Support Growth
                                </h5>
                                <ul className="space-y-1 text-sm text-slate-300">
                                    {dimension.progressWords.focus.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-slate-500">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Main Component
export const CharacterMetrics = ({ studentName = 'Your Child' }) => {
    const [assessments, setAssessments] = useState({
        honesty: 3,
        demeanor: 3,
        curiosity: 3,
        responsibility: 3,
        empathy: 3,
        resilience: 3
    });
    const [expandedTrait, setExpandedTrait] = useState(null);
    const [showInsights, setShowInsights] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const handleChange = (traitId, value) => {
        setAssessments(prev => ({ ...prev, [traitId]: value }));
        setLastUpdated(new Date().toLocaleDateString());
    };

    const insights = generateInsight(assessments);
    const avgScore = Object.values(assessments).reduce((a, b) => a + b, 0) / 6;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <Compass className="w-6 h-6 text-amber-400" />
                            Character Assessment
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Honest observation helps {studentName} grow in what truly matters
                        </p>
                    </div>
                    {lastUpdated && (
                        <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                            Updated {lastUpdated}
                        </span>
                    )}
                </div>

                {/* First Principles Note */}
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm text-amber-200">
                                <strong>Grounded in Reality:</strong> This assessment values truth over comfort.
                                Honest observation—even when it reveals areas for growth—is the foundation of real development.
                            </p>
                            <p className="text-xs text-amber-400/70 mt-2">
                                "It is better to see clearly than to feel good about what we refuse to see." — First Principles
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overall Progress Ring */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Overall Character Development</h3>
                        <p className="text-slate-400 text-sm">Across all dimensions</p>
                    </div>
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-slate-700"
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="text-teal-500"
                                strokeWidth="3"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                strokeDasharray={`${(avgScore / 5) * 100}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold">{avgScore.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                {/* Progress words based on score */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                    {avgScore >= 4 ? (
                        <>
                            <Star className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-200">Strong character foundation. Continue nurturing with patience.</span>
                        </>
                    ) : avgScore >= 2.5 ? (
                        <>
                            <TrendingUp className="w-4 h-4 text-teal-400" />
                            <span className="text-teal-200">Growing steadily. Focus builds strength.</span>
                        </>
                    ) : (
                        <>
                            <Zap className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-200">Opportunity for growth. Small steps, consistent effort.</span>
                        </>
                    )}
                </div>
            </div>

            {/* Individual Traits */}
            <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-slate-400" />
                    Character Dimensions
                </h3>
                {CHARACTER_DIMENSIONS.map(dimension => (
                    <TraitAssessment
                        key={dimension.id}
                        dimension={dimension}
                        value={assessments[dimension.id]}
                        onChange={handleChange}
                        isExpanded={expandedTrait === dimension.id}
                        onToggle={() => setExpandedTrait(expandedTrait === dimension.id ? null : dimension.id)}
                    />
                ))}
            </div>

            {/* AI Insights */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-br from-purple-950/40 to-blue-950/40 border border-purple-500/30 rounded-2xl overflow-hidden"
            >
                <button
                    onClick={() => setShowInsights(!showInsights)}
                    className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold">AI-Assisted Insights</h4>
                            <p className="text-sm text-slate-400">Personalized guidance based on your assessment</p>
                        </div>
                    </div>
                    {showInsights ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                <AnimatePresence>
                    {showInsights && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 pt-0 space-y-3">
                                {insights.map((insight, i) => (
                                    <div key={i} className="p-3 bg-slate-800/50 rounded-xl text-sm text-slate-200">
                                        {insight}
                                    </div>
                                ))}

                                {/* Immediate Correction Suggestion */}
                                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                                    <h5 className="font-bold text-sm text-emerald-300 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        Immediate Correction Approach
                                    </h5>
                                    <p className="text-sm text-emerald-200">
                                        When you observe behavior that needs correction, address it immediately but kindly.
                                        Use: <em>"I noticed [specific behavior]. Let's talk about what really happened and how we can do better."</em>
                                    </p>
                                    <p className="text-xs text-emerald-400/70 mt-2">
                                        Delayed correction loses connection to the moment. Immediate, calm correction builds the habit of truth.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Philosophy Footer */}
            <div className="text-center text-sm text-slate-500 bg-slate-900/30 rounded-xl p-4">
                <p className="italic">
                    "Character is built in small moments of truth, not grand gestures."
                </p>
                <p className="mt-2 text-xs text-slate-600">
                    This assessment is private and for your reflection. It shapes how we tailor {studentName}'s learning experience.
                </p>
            </div>
        </div>
    );
};

export default CharacterMetrics;
