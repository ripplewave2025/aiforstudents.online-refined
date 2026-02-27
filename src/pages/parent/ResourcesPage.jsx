import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Play,
    Volume2,
    BookOpen,
    Heart,
    MessageCircle,
    Star,
    ChevronRight,
    CheckCircle,
    Globe,
    Video,
    Headphones,
    Download
} from 'lucide-react';

// Multi-language content
const CONTENT = {
    en: {
        title: 'Resources for Parents',
        subtitle: 'Simple guides to help your child think better',
        categories: [
            { id: 'basics', label: 'Getting Started', icon: '🌟' },
            { id: 'daily', label: 'Daily Tips', icon: '📅' },
            { id: 'struggles', label: 'When They Struggle', icon: '🤗' },
            { id: 'praise', label: 'Praise Right', icon: '👏' },
        ],
        resources: {
            basics: [
                { title: 'What is Critical Thinking?', type: 'video', duration: '3 min', description: 'Simple explanation of what we teach' },
                { title: 'How This App Works', type: 'video', duration: '2 min', description: 'How your child uses the platform' },
                { title: 'Your Role as Parent', type: 'audio', duration: '4 min', description: 'How you can support from home' },
            ],
            daily: [
                { title: 'Questions to Ask at Dinner', type: 'pdf', description: 'Printable cards with good questions' },
                { title: 'Weekly Conversation Starters', type: 'audio', duration: '2 min', description: 'New topics each week' },
                { title: 'Bedtime Reflection Ritual', type: 'video', duration: '3 min', description: 'End the day with thinking' },
            ],
            struggles: [
                { title: 'When Homework is Hard', type: 'audio', duration: '3 min', description: 'How to help without doing it for them' },
                { title: 'Handling Frustration', type: 'video', duration: '4 min', description: 'Teaching emotional regulation' },
                { title: 'After a Bad Grade', type: 'audio', duration: '3 min', description: 'Focus on growth, not grades' },
            ],
            praise: [
                { title: 'Praise Effort, Not Smarts', type: 'video', duration: '3 min', description: 'The science of good praise' },
                { title: 'Words That Build Confidence', type: 'pdf', description: 'Phrases to use daily' },
                { title: 'Avoid These Mistakes', type: 'audio', duration: '2 min', description: 'Common praise problems' },
            ]
        }
    },
    ne: {
        title: 'अभिभावकहरूको लागि स्रोतहरू',
        subtitle: 'तपाईंको बच्चालाई राम्रोसँग सोच्न मद्दत गर्न सरल गाइडहरू',
        categories: [
            { id: 'basics', label: 'सुरुवात', icon: '🌟' },
            { id: 'daily', label: 'दैनिक सुझावहरू', icon: '📅' },
            { id: 'struggles', label: 'संघर्षको बेला', icon: '🤗' },
            { id: 'praise', label: 'प्रशंसा गर्नुहोस्', icon: '👏' },
        ],
        resources: {}
    },
    hi: {
        title: 'माता-पिता के लिए संसाधन',
        subtitle: 'आपके बच्चे को बेहतर सोचने में मदद करने के लिए सरल गाइड',
        categories: [
            { id: 'basics', label: 'शुरुआत', icon: '🌟' },
            { id: 'daily', label: 'दैनिक टिप्स', icon: '📅' },
            { id: 'struggles', label: 'जब वे संघर्ष करें', icon: '🤗' },
            { id: 'praise', label: 'सही तरीके से प्रशंसा', icon: '👏' },
        ],
        resources: {}
    }
};

const ResourceCard = ({ resource, onPlay }) => {
    const getIcon = () => {
        switch (resource.type) {
            case 'video': return <Video className="w-5 h-5 text-red-400" />;
            case 'audio': return <Headphones className="w-5 h-5 text-purple-400" />;
            case 'pdf': return <Download className="w-5 h-5 text-blue-400" />;
            default: return <BookOpen className="w-5 h-5 text-teal-400" />;
        }
    };

    const getButtonLabel = () => {
        switch (resource.type) {
            case 'video': return 'Watch';
            case 'audio': return 'Listen';
            case 'pdf': return 'Download';
            default: return 'Open';
        }
    };

    const getButtonColor = () => {
        switch (resource.type) {
            case 'video': return 'bg-red-600 hover:bg-red-500';
            case 'audio': return 'bg-purple-600 hover:bg-purple-500';
            case 'pdf': return 'bg-blue-600 hover:bg-blue-500';
            default: return 'bg-teal-600 hover:bg-teal-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
        >
            <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-slate-700 rounded-lg">
                    {getIcon()}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold">{resource.title}</h4>
                    <p className="text-sm text-slate-400">{resource.description}</p>
                    {resource.duration && (
                        <p className="text-xs text-slate-500 mt-1">⏱️ {resource.duration}</p>
                    )}
                </div>
            </div>
            <button
                onClick={() => onPlay(resource)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors ${getButtonColor()}`}
            >
                <Play className="w-5 h-5" />
                {getButtonLabel()}
            </button>
        </motion.div>
    );
};

export const ParentResourcesPage = () => {
    const [language, setLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('basics');

    const content = CONTENT[language] || CONTENT.en;
    const resources = content.resources[activeCategory] || CONTENT.en.resources[activeCategory];

    const handlePlay = (resource) => {
        const icon = resource.type === 'video' ? '📹' : resource.type === 'audio' ? '🔊' : '📄';
        alert(`${icon} Would ${resource.type === 'pdf' ? 'download' : 'play'}: "${resource.title}"\n\nThis feature requires media files to be uploaded.`);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-teal-400" />
                        {content.title}
                    </h1>
                    <p className="text-slate-400">{content.subtitle}</p>
                </div>

                {/* Language Selector - Large for accessibility */}
                <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-xl">
                    <Globe className="w-5 h-5 text-slate-400" />
                    {['en', 'ne', 'hi'].map(lang => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${language === lang
                                    ? 'bg-teal-600 text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {lang === 'en' ? 'EN' : lang === 'ne' ? 'नेपाली' : 'हिंदी'}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Help Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-pink-950/50 to-purple-950/50 border border-pink-500/30 rounded-2xl p-5 mb-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Headphones className="w-6 h-6 text-pink-400" />
                    <h3 className="font-bold">Listen in Your Language</h3>
                </div>
                <p className="text-sm text-slate-300">
                    All videos and audio guides are available in English, Nepali, and Hindi.
                    Select your preferred language above.
                </p>
            </motion.div>

            {/* Category Tabs - Large touch targets */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
            >
                {content.categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`p-4 rounded-xl text-center transition-colors ${activeCategory === cat.id
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                ))}
            </motion.div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {resources?.map((resource, i) => (
                    <ResourceCard
                        key={i}
                        resource={resource}
                        onPlay={handlePlay}
                    />
                ))}
            </div>

            {/* Quick Contact */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5"
            >
                <h3 className="font-bold mb-3 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    Need Help?
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                    <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-left">
                        <div className="text-2xl">📞</div>
                        <div>
                            <p className="font-medium">Call Support</p>
                            <p className="text-sm text-slate-400">Mon-Fri, 9am-5pm</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-left">
                        <div className="text-2xl">💬</div>
                        <div>
                            <p className="font-medium">Message Teacher</p>
                            <p className="text-sm text-slate-400">Get personal advice</p>
                        </div>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
