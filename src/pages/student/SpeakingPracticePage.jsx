import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Mic,
    Square,
    Play,
    Pause,
    RotateCcw,
    Save,
    CheckCircle2,
    Circle,
    Clock,
    Volume2
} from 'lucide-react';

const ArgumentCheck = ({ label, checked, description }) => (
    <div className={`flex items-start gap-3 p-4 rounded-xl transition-colors ${checked ? 'bg-emerald-950/30 border border-emerald-500/30' : 'bg-slate-800/50 border border-slate-700'
        }`}>
        <div className="mt-0.5">
            {checked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
                <Circle className="w-5 h-5 text-slate-500" />
            )}
        </div>
        <div>
            <h4 className={`font-semibold text-sm ${checked ? 'text-emerald-300' : 'text-slate-400'}`}>
                {label}
            </h4>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
    </div>
);

export const SpeakingPracticePage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [topic, setTopic] = useState('');
    const [selfEvaluation, setSelfEvaluation] = useState({
        claimStated: false,
        evidenceProvided: false,
        conclusionDrawn: false
    });

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    // Start recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    };

    // Play/Pause recording
    const togglePlayback = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Reset recording
    const resetRecording = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        setRecordingTime(0);
        setIsPlaying(false);
        setSelfEvaluation({
            claimStated: false,
            evidenceProvided: false,
            conclusionDrawn: false
        });
    };

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-3xl mx-auto pb-20 md:pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Speaking Practice
                </h1>
                <p className="text-slate-400">
                    Record yourself explaining a concept. Structure your argument clearly.
                </p>
            </motion.div>

            {/* Topic Input */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
            >
                <label className="block text-sm font-medium text-slate-400 mb-2">
                    What are you explaining?
                </label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Why the sky is blue, How photosynthesis works..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
            </motion.div>

            {/* Argument Structure Reminder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 mb-6"
            >
                <h3 className="font-bold text-amber-300 mb-3">Remember: Structure Your Argument</h3>
                <div className="grid gap-2 text-sm text-amber-200/80">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold">1</span>
                        <span><strong>Claim:</strong> State your point clearly</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold">2</span>
                        <span><strong>Evidence:</strong> Support with facts or examples</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold">3</span>
                        <span><strong>Conclusion:</strong> Summarize your argument</span>
                    </div>
                </div>
            </motion.div>

            {/* Recording Interface */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-6"
            >
                <div className="flex flex-col items-center">
                    {/* Timer Display */}
                    <div className="flex items-center gap-2 text-4xl font-mono mb-6">
                        <Clock className="w-8 h-8 text-slate-500" />
                        <span className={isRecording ? 'text-red-400' : 'text-white'}>
                            {formatTime(recordingTime)}
                        </span>
                    </div>

                    {/* Recording Status */}
                    {isRecording && (
                        <div className="flex items-center gap-2 text-red-400 mb-4">
                            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                            Recording...
                        </div>
                    )}

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        {!audioBlob ? (
                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                disabled={!topic.trim()}
                                className={`p-6 rounded-full transition-all ${isRecording
                                        ? 'bg-red-500 hover:bg-red-400'
                                        : topic.trim()
                                            ? 'bg-teal-500 hover:bg-teal-400'
                                            : 'bg-slate-700 cursor-not-allowed'
                                    }`}
                            >
                                {isRecording ? (
                                    <Square className="w-8 h-8 text-white" />
                                ) : (
                                    <Mic className="w-8 h-8 text-white" />
                                )}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={togglePlayback}
                                    className="p-4 bg-teal-500 hover:bg-teal-400 rounded-full transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6 text-white" />
                                    ) : (
                                        <Play className="w-6 h-6 text-white" />
                                    )}
                                </button>
                                <button
                                    onClick={resetRecording}
                                    className="p-4 bg-slate-700 hover:bg-slate-600 rounded-full transition-colors"
                                >
                                    <RotateCcw className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}
                    </div>

                    {!topic.trim() && !isRecording && !audioBlob && (
                        <p className="text-sm text-slate-500 mt-4">
                            Enter a topic above to start recording
                        </p>
                    )}

                    {/* Hidden audio element */}
                    {audioUrl && (
                        <audio
                            ref={audioRef}
                            src={audioUrl}
                            onEnded={() => setIsPlaying(false)}
                            className="hidden"
                        />
                    )}
                </div>
            </motion.div>

            {/* Self-Evaluation */}
            {audioBlob && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
                >
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-teal-400" />
                        Self-Evaluation
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Listen back and check off what you included:
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => setSelfEvaluation(prev => ({ ...prev, claimStated: !prev.claimStated }))}
                            className="w-full text-left"
                        >
                            <ArgumentCheck
                                label="Claim Stated Clearly"
                                checked={selfEvaluation.claimStated}
                                description="Did you clearly state your main point at the start?"
                            />
                        </button>
                        <button
                            onClick={() => setSelfEvaluation(prev => ({ ...prev, evidenceProvided: !prev.evidenceProvided }))}
                            className="w-full text-left"
                        >
                            <ArgumentCheck
                                label="Evidence Provided"
                                checked={selfEvaluation.evidenceProvided}
                                description="Did you give facts, examples, or reasoning to support your claim?"
                            />
                        </button>
                        <button
                            onClick={() => setSelfEvaluation(prev => ({ ...prev, conclusionDrawn: !prev.conclusionDrawn }))}
                            className="w-full text-left"
                        >
                            <ArgumentCheck
                                label="Conclusion Drawn"
                                checked={selfEvaluation.conclusionDrawn}
                                description="Did you wrap up and summarize your argument?"
                            />
                        </button>
                    </div>

                    {/* Save Button */}
                    <button
                        className="w-full flex items-center justify-center gap-2 mt-6 px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium transition-colors"
                    >
                        <Save className="w-5 h-5" />
                        Save to Artifacts
                    </button>
                </motion.div>
            )}

            {/* Tips */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/30 rounded-2xl p-6"
            >
                <h3 className="font-bold mb-3">Speaking Tips</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Speak slowly and clearly</li>
                    <li>• Pause between main points</li>
                    <li>• Imagine explaining to a curious 12-year-old</li>
                    <li>• It's okay to record multiple times</li>
                </ul>
            </motion.div>
        </div>
    );
};
