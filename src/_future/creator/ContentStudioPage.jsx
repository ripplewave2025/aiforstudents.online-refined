import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    HelpCircle,
    Video,
    FileCheck,
    ArrowLeft,
    ArrowRight,
    Save,
    Send,
    Plus,
    Trash2,
    Image,
    Link,
    Bold,
    Italic,
    List,
    Eye,
    Sparkles
} from 'lucide-react';

// Content Type Selector
const ContentTypeCard = ({ icon: Icon, title, description, selected, onClick, color }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${selected
                ? `${color} border-current`
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
            }`}
    >
        <Icon className={`w-10 h-10 mb-4 ${selected ? 'text-current' : 'text-slate-400'}`} />
        <h3 className={`text-lg font-bold mb-2 ${selected ? 'text-current' : 'text-white'}`}>{title}</h3>
        <p className={`text-sm ${selected ? 'opacity-80' : 'text-slate-400'}`}>{description}</p>
    </motion.button>
);

// Simple Rich Text Editor Toolbar
const EditorToolbar = () => (
    <div className="flex items-center gap-1 p-2 bg-slate-800/50 border-b border-slate-700/50">
        <button className="p-2 hover:bg-slate-700 rounded transition-colors">
            <Bold className="w-4 h-4 text-slate-400" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded transition-colors">
            <Italic className="w-4 h-4 text-slate-400" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded transition-colors">
            <List className="w-4 h-4 text-slate-400" />
        </button>
        <div className="w-px h-6 bg-slate-700 mx-2" />
        <button className="p-2 hover:bg-slate-700 rounded transition-colors">
            <Image className="w-4 h-4 text-slate-400" />
        </button>
        <button className="p-2 hover:bg-slate-700 rounded transition-colors">
            <Link className="w-4 h-4 text-slate-400" />
        </button>
    </div>
);

// Question Builder for Quiz
const QuestionBuilder = ({ questions, setQuestions }) => {
    const addQuestion = () => {
        setQuestions([...questions, {
            id: Date.now(),
            text: '',
            type: 'multiple_choice',
            options: ['', '', '', ''],
            correctAnswer: 0
        }]);
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const updateOption = (questionId, optionIndex, value) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const newOptions = [...q.options];
                newOptions[optionIndex] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    return (
        <div className="space-y-6">
            {questions.map((question, index) => (
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-400">Question {index + 1}</span>
                        <button
                            onClick={() => removeQuestion(question.id)}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                        placeholder="Enter your question..."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors mb-4"
                    />
                    <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuestion(question.id, 'correctAnswer', optIndex)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${question.correctAnswer === optIndex
                                            ? 'border-emerald-500 bg-emerald-500'
                                            : 'border-slate-600 hover:border-slate-500'
                                        }`}
                                >
                                    {question.correctAnswer === optIndex && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </button>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                                    placeholder={`Option ${optIndex + 1}`}
                                    className="flex-1 px-3 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
            <motion.button
                onClick={addQuestion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Add Question
            </motion.button>
        </div>
    );
};

export const ContentStudioPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Type, 2: Details, 3: Content, 4: Preview
    const [contentType, setContentType] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [content, setContent] = useState('');
    const [questions, setQuestions] = useState([]);
    const [saving, setSaving] = useState(false);

    const contentTypes = [
        {
            id: 'lesson',
            icon: BookOpen,
            title: 'Lesson',
            description: 'Create rich text lessons with images and embedded content',
            color: 'bg-blue-950/50 text-blue-400 border-blue-500/50'
        },
        {
            id: 'quiz',
            icon: HelpCircle,
            title: 'Quiz',
            description: 'Build interactive quizzes with multiple choice questions',
            color: 'bg-emerald-950/50 text-emerald-400 border-emerald-500/50'
        },
        {
            id: 'worksheet',
            icon: FileCheck,
            title: 'Worksheet',
            description: 'Create downloadable worksheets and exercises',
            color: 'bg-purple-950/50 text-purple-400 border-purple-500/50'
        },
        {
            id: 'video',
            icon: Video,
            title: 'Video Lesson',
            description: 'Embed video content with guided questions',
            color: 'bg-pink-950/50 text-pink-400 border-pink-500/50'
        },
    ];

    const handleSaveDraft = async () => {
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        navigate('/creator/content');
    };

    const handlePublish = async () => {
        setSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        navigate('/creator');
    };

    const canProceed = () => {
        if (step === 1) return contentType !== null;
        if (step === 2) return title.trim() !== '' && subject !== '';
        if (step === 3) {
            if (contentType === 'quiz') return questions.length > 0;
            return content.trim() !== '';
        }
        return true;
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <button
                        onClick={() => navigate('/creator')}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Content Studio</h1>
                        <p className="text-slate-400">Create engaging educational content</p>
                    </div>
                </motion.div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {['Type', 'Details', 'Content', 'Preview'].map((label, i) => (
                        <React.Fragment key={label}>
                            <div
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${step === i + 1
                                        ? 'bg-orange-500/20 text-orange-400'
                                        : step > i + 1
                                            ? 'bg-emerald-500/20 text-emerald-400'
                                            : 'bg-slate-800/50 text-slate-500'
                                    }`}
                            >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === i + 1
                                        ? 'bg-orange-500 text-white'
                                        : step > i + 1
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {step > i + 1 ? '✓' : i + 1}
                                </span>
                                <span className="hidden sm:inline">{label}</span>
                            </div>
                            {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-emerald-500' : 'bg-slate-700'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-6">What type of content do you want to create?</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contentTypes.map((type) => (
                                    <ContentTypeCard
                                        key={type.id}
                                        {...type}
                                        selected={contentType === type.id}
                                        onClick={() => setContentType(type.id)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl font-semibold text-white mb-6">Tell us about your content</h2>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter a descriptive title..."
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Briefly describe what students will learn..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Subject *</label>
                                    <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="mathematics">Mathematics</option>
                                        <option value="science">Science</option>
                                        <option value="english">English</option>
                                        <option value="social_studies">Social Studies</option>
                                        <option value="art">Art & Design</option>
                                        <option value="technology">Technology</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Grade Level</label>
                                    <select
                                        value={gradeLevel}
                                        onChange={(e) => setGradeLevel(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    >
                                        <option value="">Select grade level</option>
                                        <option value="elementary">Elementary (1-5)</option>
                                        <option value="middle">Middle School (6-8)</option>
                                        <option value="high">High School (9-12)</option>
                                        <option value="all">All Levels</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-6">
                                {contentType === 'quiz' ? 'Build your quiz' : 'Write your content'}
                            </h2>

                            {contentType === 'quiz' ? (
                                <QuestionBuilder questions={questions} setQuestions={setQuestions} />
                            ) : (
                                <div className="border border-slate-700/50 rounded-xl overflow-hidden">
                                    <EditorToolbar />
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder={
                                            contentType === 'lesson'
                                                ? "Write your lesson content here. You can include explanations, examples, and key concepts..."
                                                : contentType === 'video'
                                                    ? "Paste your video URL (YouTube, Vimeo) and add supporting notes..."
                                                    : "Create your worksheet content. Include instructions and exercises..."
                                        }
                                        rows={12}
                                        className="w-full px-4 py-4 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none resize-none"
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-6">Preview your content</h2>
                            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    {contentTypes.find(t => t.id === contentType)?.icon && (
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                            {React.createElement(contentTypes.find(t => t.id === contentType)?.icon, {
                                                className: "w-6 h-6 text-orange-400"
                                            })}
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-xs text-orange-400 uppercase tracking-wide font-medium">{contentType}</span>
                                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                                    </div>
                                </div>
                                {description && (
                                    <p className="text-slate-400 mb-6">{description}</p>
                                )}
                                <div className="flex gap-2 mb-6">
                                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 capitalize">{subject}</span>
                                    {gradeLevel && (
                                        <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 capitalize">{gradeLevel}</span>
                                    )}
                                </div>
                                <div className="border-t border-slate-700/50 pt-6">
                                    {contentType === 'quiz' ? (
                                        <div className="space-y-4">
                                            <p className="text-slate-400 text-sm">{questions.length} question(s)</p>
                                            {questions.slice(0, 2).map((q, i) => (
                                                <div key={q.id} className="bg-slate-900/50 rounded-lg p-4">
                                                    <p className="text-white font-medium">Q{i + 1}: {q.text || 'Untitled question'}</p>
                                                </div>
                                            ))}
                                            {questions.length > 2 && (
                                                <p className="text-slate-500 text-sm">+ {questions.length - 2} more questions</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="prose prose-invert max-w-none">
                                            <p className="text-slate-300 whitespace-pre-wrap">{content || 'No content yet'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className={`flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex items-center gap-3">
                        {step === 4 && (
                            <>
                                <motion.button
                                    onClick={handleSaveDraft}
                                    disabled={saving}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Draft
                                </motion.button>
                                <motion.button
                                    onClick={handlePublish}
                                    disabled={saving}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    {saving ? 'Publishing...' : 'Publish'}
                                </motion.button>
                            </>
                        )}
                        {step < 4 && (
                            <motion.button
                                onClick={() => setStep(Math.min(4, step + 1))}
                                disabled={!canProceed()}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentStudioPage;
