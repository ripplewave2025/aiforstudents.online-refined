import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThinking } from '../../contexts/ThinkingContext';
import {
    FileText,
    Plus,
    Image,
    Code,
    Quote,
    List,
    Link2,
    Save,
    Download,
    Eye,
    Edit3,
    Trash2,
    GripVertical
} from 'lucide-react';

// Block types
const BLOCK_TYPES = {
    text: { icon: FileText, label: 'Text', placeholder: 'Write your thoughts...' },
    heading: { icon: Edit3, label: 'Heading', placeholder: 'Section title...' },
    quote: { icon: Quote, label: 'Quote', placeholder: 'Add a quote or key insight...' },
    list: { icon: List, label: 'List', placeholder: 'Add list items (one per line)...' },
    code: { icon: Code, label: 'Code', placeholder: '// Your code or technical notes...' },
    link: { icon: Link2, label: 'Link', placeholder: 'https://...' },
};

const BlockEditor = ({ block, onChange, onDelete, onMoveUp, onMoveDown }) => {
    const typeInfo = BLOCK_TYPES[block.type];
    const Icon = typeInfo.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-3"
        >
            {/* Block controls */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 hidden group-hover:flex flex-col gap-1">
                <button onClick={onMoveUp} className="p-1 text-slate-500 hover:text-white">▲</button>
                <GripVertical className="w-4 h-4 text-slate-600" />
                <button onClick={onMoveDown} className="p-1 text-slate-500 hover:text-white">▼</button>
            </div>

            {/* Block header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-500 uppercase tracking-wide">{typeInfo.label}</span>
                </div>
                <button
                    onClick={onDelete}
                    className="p-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Block content */}
            {block.type === 'heading' ? (
                <input
                    type="text"
                    value={block.content}
                    onChange={(e) => onChange({ ...block, content: e.target.value })}
                    placeholder={typeInfo.placeholder}
                    className="w-full bg-transparent text-xl font-bold focus:outline-none"
                />
            ) : block.type === 'code' ? (
                <textarea
                    value={block.content}
                    onChange={(e) => onChange({ ...block, content: e.target.value })}
                    placeholder={typeInfo.placeholder}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm text-emerald-400 focus:outline-none focus:border-teal-500 min-h-[100px] resize-none"
                />
            ) : block.type === 'quote' ? (
                <div className="border-l-4 border-teal-500 pl-4">
                    <textarea
                        value={block.content}
                        onChange={(e) => onChange({ ...block, content: e.target.value })}
                        placeholder={typeInfo.placeholder}
                        className="w-full bg-transparent text-slate-300 italic focus:outline-none resize-none min-h-[60px]"
                    />
                </div>
            ) : block.type === 'link' ? (
                <div className="space-y-2">
                    <input
                        type="url"
                        value={block.content}
                        onChange={(e) => onChange({ ...block, content: e.target.value })}
                        placeholder={typeInfo.placeholder}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                    />
                    <input
                        type="text"
                        value={block.label || ''}
                        onChange={(e) => onChange({ ...block, label: e.target.value })}
                        placeholder="Link description..."
                        className="w-full bg-transparent text-sm focus:outline-none"
                    />
                </div>
            ) : (
                <textarea
                    value={block.content}
                    onChange={(e) => onChange({ ...block, content: e.target.value })}
                    placeholder={typeInfo.placeholder}
                    className="w-full bg-transparent focus:outline-none resize-none min-h-[80px]"
                />
            )}
        </motion.div>
    );
};

export const ArtifactBuilderPage = () => {
    const { currentSession, reasoningLogs } = useThinking();
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [savedArtifacts, setSavedArtifacts] = useState(() => {
        const saved = localStorage.getItem('ct_artifacts');
        return saved ? JSON.parse(saved) : [];
    });
    const [isPreview, setIsPreview] = useState(false);

    // Add block
    const addBlock = (type) => {
        setBlocks([...blocks, {
            id: `block_${Date.now()}`,
            type,
            content: '',
        }]);
    };

    // Update block
    const updateBlock = (index, newBlock) => {
        const updated = [...blocks];
        updated[index] = newBlock;
        setBlocks(updated);
    };

    // Delete block
    const deleteBlock = (index) => {
        setBlocks(blocks.filter((_, i) => i !== index));
    };

    // Move block
    const moveBlock = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= blocks.length) return;
        const updated = [...blocks];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        setBlocks(updated);
    };

    // Save artifact
    const saveArtifact = () => {
        if (!title.trim() || blocks.length === 0) return;

        const artifact = {
            id: `artifact_${Date.now()}`,
            title,
            blocks,
            createdAt: new Date().toISOString(),
            sessionId: currentSession?.id
        };

        const updated = [artifact, ...savedArtifacts];
        setSavedArtifacts(updated);
        localStorage.setItem('ct_artifacts', JSON.stringify(updated));

        // Reset form
        setTitle('');
        setBlocks([]);
    };

    // Pre-fill from current session
    const prefillFromSession = () => {
        if (!currentSession) return;
        setTitle(currentSession.topic || 'Untitled');
        setBlocks([
            { id: 'b1', type: 'heading', content: 'My Question' },
            { id: 'b2', type: 'text', content: currentSession.question || '' },
            { id: 'b3', type: 'heading', content: 'Initial Belief' },
            { id: 'b4', type: 'quote', content: currentSession.initialBelief || '' },
            { id: 'b5', type: 'heading', content: 'Key Assumptions' },
            { id: 'b6', type: 'list', content: (currentSession.assumptions || []).join('\n') },
        ]);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                        <FileText className="w-8 h-8 text-purple-400" />
                        Artifact Builder
                    </h1>
                    <p className="text-slate-400">
                        Create structured thinking artifacts to share your learning.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${isPreview ? 'bg-purple-600' : 'bg-slate-700 hover:bg-slate-600'
                            }`}
                    >
                        <Eye className="w-4 h-4" />
                        {isPreview ? 'Edit' : 'Preview'}
                    </button>
                    <button
                        onClick={saveArtifact}
                        disabled={!title.trim() || blocks.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Save
                    </button>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main editor */}
                <div className="lg:col-span-2">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Artifact title..."
                            className="w-full text-3xl font-bold bg-transparent focus:outline-none"
                        />
                    </motion.div>

                    {/* Pre-fill button */}
                    {currentSession && blocks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-6"
                        >
                            <button
                                onClick={prefillFromSession}
                                className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-purple-600/30 transition-colors text-sm"
                            >
                                Pre-fill from current reasoning session
                            </button>
                        </motion.div>
                    )}

                    {/* Blocks */}
                    {isPreview ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                        >
                            <h2 className="text-2xl font-bold mb-6">{title || 'Untitled'}</h2>
                            {blocks.map((block, i) => (
                                <div key={block.id} className="mb-4">
                                    {block.type === 'heading' && (
                                        <h3 className="text-xl font-bold text-teal-400">{block.content}</h3>
                                    )}
                                    {block.type === 'text' && <p className="text-slate-300">{block.content}</p>}
                                    {block.type === 'quote' && (
                                        <blockquote className="border-l-4 border-teal-500 pl-4 italic text-slate-400">
                                            {block.content}
                                        </blockquote>
                                    )}
                                    {block.type === 'list' && (
                                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                                            {block.content.split('\n').filter(Boolean).map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {block.type === 'code' && (
                                        <pre className="bg-slate-900 p-4 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto">
                                            {block.content}
                                        </pre>
                                    )}
                                    {block.type === 'link' && block.content && (
                                        <a href={block.content} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                                            {block.label || block.content}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="pl-10">
                            {blocks.map((block, i) => (
                                <BlockEditor
                                    key={block.id}
                                    block={block}
                                    onChange={(b) => updateBlock(i, b)}
                                    onDelete={() => deleteBlock(i)}
                                    onMoveUp={() => moveBlock(i, -1)}
                                    onMoveDown={() => moveBlock(i, 1)}
                                />
                            ))}

                            {/* Add block buttons */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {Object.entries(BLOCK_TYPES).map(([type, info]) => {
                                    const Icon = info.icon;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => addBlock(type)}
                                            className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-slate-700 hover:border-slate-600 rounded-lg text-sm transition-colors"
                                        >
                                            <Icon className="w-4 h-4 text-slate-400" />
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar - Saved artifacts */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-fit"
                >
                    <h3 className="font-bold mb-4">Saved Artifacts</h3>
                    {savedArtifacts.length === 0 ? (
                        <p className="text-sm text-slate-500">No artifacts yet</p>
                    ) : (
                        <div className="space-y-3">
                            {savedArtifacts.slice(0, 5).map((artifact) => (
                                <div
                                    key={artifact.id}
                                    className="p-3 bg-slate-800/50 rounded-xl border border-slate-700"
                                >
                                    <h4 className="font-medium text-sm truncate">{artifact.title}</h4>
                                    <p className="text-xs text-slate-500">
                                        {new Date(artifact.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
