import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThinking } from '../../contexts/ThinkingContext';
import {
    Map,
    Plus,
    Circle,
    Link2,
    Sparkles,
    Brain,
    Lightbulb,
    HelpCircle,
    X,
    Maximize2
} from 'lucide-react';

// Node types with colors
const NODE_TYPES = {
    question: { icon: HelpCircle, color: 'bg-blue-500', borderColor: 'border-blue-500' },
    idea: { icon: Lightbulb, color: 'bg-amber-500', borderColor: 'border-amber-500' },
    insight: { icon: Sparkles, color: 'bg-purple-500', borderColor: 'border-purple-500' },
    connection: { icon: Link2, color: 'bg-teal-500', borderColor: 'border-teal-500' },
};

const MapNode = ({ node, onDrag, onConnect, isConnecting, selected, onClick }) => {
    const typeInfo = NODE_TYPES[node.type] || NODE_TYPES.idea;
    const Icon = typeInfo.icon;

    return (
        <motion.div
            drag
            dragMomentum={false}
            onDragEnd={(_, info) => onDrag(node.id, info.point.x, info.point.y)}
            onClick={() => onClick(node.id)}
            className={`absolute cursor-move p-4 rounded-2xl border-2 bg-slate-800 min-w-[140px] max-w-[200px] shadow-xl ${typeInfo.borderColor} ${selected ? 'ring-2 ring-white' : ''}`}
            style={{ left: node.x, top: node.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${typeInfo.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-slate-400 capitalize">{node.type}</span>
            </div>
            <p className="text-sm font-medium leading-tight">{node.text}</p>

            {/* Connection button */}
            <button
                onClick={(e) => { e.stopPropagation(); onConnect(node.id); }}
                className={`absolute -right-2 -top-2 p-1.5 rounded-full border ${isConnecting ? 'bg-teal-500 border-teal-400' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                    }`}
            >
                <Link2 className="w-3 h-3" />
            </button>
        </motion.div>
    );
};

export const CuriosityMapPage = () => {
    const { reasoningLogs } = useThinking();

    // Map state
    const [nodes, setNodes] = useState(() => {
        // Initialize with nodes from reasoning logs
        const initialNodes = [];
        reasoningLogs.slice(0, 5).forEach((log, i) => {
            if (log.question) {
                initialNodes.push({
                    id: `q_${log.id}`,
                    type: 'question',
                    text: log.question.slice(0, 80) + (log.question.length > 80 ? '...' : ''),
                    x: 100 + (i % 3) * 220,
                    y: 100 + Math.floor(i / 3) * 150
                });
            }
        });
        return initialNodes;
    });

    const [connections, setConnections] = useState([]);
    const [connectingFrom, setConnectingFrom] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isAddingNode, setIsAddingNode] = useState(false);
    const [newNodeType, setNewNodeType] = useState('idea');
    const [newNodeText, setNewNodeText] = useState('');

    // Add new node
    const addNode = () => {
        if (!newNodeText.trim()) return;

        const newNode = {
            id: `node_${Date.now()}`,
            type: newNodeType,
            text: newNodeText,
            x: 200 + Math.random() * 200,
            y: 200 + Math.random() * 150
        };

        setNodes([...nodes, newNode]);
        setNewNodeText('');
        setIsAddingNode(false);
    };

    // Update node position
    const updateNodePosition = (id, x, y) => {
        setNodes(nodes.map(n => n.id === id ? { ...n, x, y } : n));
    };

    // Handle connection
    const handleConnect = (nodeId) => {
        if (!connectingFrom) {
            setConnectingFrom(nodeId);
        } else if (connectingFrom !== nodeId) {
            // Check if connection already exists
            const exists = connections.some(
                c => (c.from === connectingFrom && c.to === nodeId) ||
                    (c.from === nodeId && c.to === connectingFrom)
            );
            if (!exists) {
                setConnections([...connections, { from: connectingFrom, to: nodeId }]);
            }
            setConnectingFrom(null);
        }
    };

    // Delete selected node
    const deleteNode = () => {
        if (!selectedNode) return;
        setNodes(nodes.filter(n => n.id !== selectedNode));
        setConnections(connections.filter(c => c.from !== selectedNode && c.to !== selectedNode));
        setSelectedNode(null);
    };

    // Get connection lines
    const getConnectionLines = () => {
        return connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
                <line
                    key={i}
                    x1={fromNode.x + 70}
                    y1={fromNode.y + 40}
                    x2={toNode.x + 70}
                    y2={toNode.y + 40}
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-60"
                />
            );
        });
    };

    return (
        <div className="max-w-full mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
                        <Map className="w-8 h-8 text-teal-400" />
                        Curiosity Map
                    </h1>
                    <p className="text-slate-400">
                        Map your questions, ideas, and connections visually.
                    </p>
                </div>
                <div className="flex gap-2">
                    {selectedNode && (
                        <button
                            onClick={deleteNode}
                            className="px-4 py-2 bg-red-600/20 text-red-400 rounded-xl hover:bg-red-600/30 transition-colors"
                        >
                            Delete
                        </button>
                    )}
                    <button
                        onClick={() => setIsAddingNode(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Node
                    </button>
                </div>
            </motion.div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-4 mb-4 text-sm"
            >
                {Object.entries(NODE_TYPES).map(([type, info]) => {
                    const Icon = info.icon;
                    return (
                        <div key={type} className="flex items-center gap-2 text-slate-400">
                            <div className={`p-1 rounded ${info.color}`}>
                                <Icon className="w-3 h-3 text-white" />
                            </div>
                            <span className="capitalize">{type}</span>
                        </div>
                    );
                })}
            </motion.div>

            {/* Canvas */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative bg-slate-900/50 border border-slate-800 rounded-2xl min-h-[500px] md:min-h-[600px] overflow-hidden"
                onClick={() => { setSelectedNode(null); setConnectingFrom(null); }}
            >
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Connection lines */}
                <svg className="absolute inset-0 pointer-events-none">
                    {getConnectionLines()}
                </svg>

                {/* Nodes */}
                {nodes.map(node => (
                    <MapNode
                        key={node.id}
                        node={node}
                        onDrag={updateNodePosition}
                        onConnect={handleConnect}
                        isConnecting={connectingFrom === node.id}
                        selected={selectedNode === node.id}
                        onClick={(id) => { setSelectedNode(id); }}
                    />
                ))}

                {/* Empty state */}
                {nodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                            <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Start Mapping Your Curiosity</h3>
                            <p className="text-slate-400 mb-4">
                                Add questions, ideas, and insights. Connect related thoughts.
                            </p>
                            <button
                                onClick={() => setIsAddingNode(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add First Node
                            </button>
                        </div>
                    </div>
                )}

                {/* Connecting indicator */}
                {connectingFrom && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm">
                        Click another node to connect
                    </div>
                )}
            </motion.div>

            {/* Add Node Modal */}
            {isAddingNode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsAddingNode(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Add New Node</h3>
                            <button onClick={() => setIsAddingNode(false)}>
                                <X className="w-5 h-5 text-slate-400 hover:text-white" />
                            </button>
                        </div>

                        {/* Type selector */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {Object.entries(NODE_TYPES).map(([type, info]) => {
                                const Icon = info.icon;
                                return (
                                    <button
                                        key={type}
                                        onClick={() => setNewNodeType(type)}
                                        className={`p-3 rounded-xl border-2 transition-all ${newNodeType === type
                                                ? `${info.borderColor} ${info.color}/20`
                                                : 'border-slate-700 hover:border-slate-600'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 mx-auto mb-1 ${newNodeType === type ? 'text-white' : 'text-slate-400'}`} />
                                        <span className="text-xs capitalize">{type}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Text input */}
                        <textarea
                            value={newNodeText}
                            onChange={(e) => setNewNodeText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors min-h-[100px] resize-none mb-4"
                            autoFocus
                        />

                        <button
                            onClick={addNode}
                            disabled={!newNodeText.trim()}
                            className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-400 rounded-xl font-medium transition-colors"
                        >
                            Add to Map
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-slate-800/30 rounded-xl"
            >
                <h4 className="font-semibold mb-2 text-sm text-slate-300">How to use:</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                    <li>• <strong>Drag</strong> nodes to rearrange them</li>
                    <li>• Click the <strong>link icon</strong> on a node, then click another to connect them</li>
                    <li>• <strong>Click</strong> a node to select it, then delete if needed</li>
                </ul>
            </motion.div>
        </div>
    );
};
