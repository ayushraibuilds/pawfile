import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, AlertTriangle, Activity, CheckCircle, Bone, Stethoscope } from 'lucide-react';
import { usePets } from '../context/PetContext';
import { analyzeSymptoms } from '../utils/aiClient';
import './BreedGenius.css'; // Minimal custom CSS if needed beyond Tailwind

const BreedGenius = () => {
    const { activePet } = usePets();
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!symptoms.trim() || !activePet) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await analyzeSymptoms(activePet, symptoms);
            setResult(data);
        } catch (err) {
            setError(err.message || 'Error communicating with Breed Genius AI.');
        } finally {
            setLoading(false);
        }
    };

    if (!activePet) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                <Brain className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Select a Pet to Begin</h2>
                <p className="text-gray-500">Breed Genius needs to know your pet's specific profile to provide accurate triage.</p>
            </div>
        );
    }

    const getSeverityStyles = (severity) => {
        switch (severity) {
            case 'RED_EMERGENCY':
                return {
                    border: 'border-red-500',
                    bg: 'bg-red-500/10',
                    text: 'text-red-500',
                    icon: <AlertTriangle className="w-6 h-6 text-red-500" />
                };
            case 'YELLOW_MONITOR':
                return {
                    border: 'border-yellow-500',
                    bg: 'bg-yellow-500/10',
                    text: 'text-yellow-500',
                    icon: <Activity className="w-6 h-6 text-yellow-500" />
                };
            case 'GREEN_NORMAL':
                return {
                    border: 'border-green-500',
                    bg: 'bg-green-500/10',
                    text: 'text-green-500',
                    icon: <CheckCircle className="w-6 h-6 text-green-500" />
                };
            default:
                return {
                    border: 'border-gray-500',
                    bg: 'bg-gray-500/10',
                    text: 'text-gray-500',
                    icon: <Brain className="w-6 h-6 text-gray-500" />
                };
        }
    };

    return (
        <div className="relative flex flex-col h-full overflow-y-auto w-full p-4 md:p-8 animate-fade-in pb-24">
            <header className="mb-8">
                <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-purple-500" />
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
                        Breed Genius
                    </h1>
                </div>
                <p className="text-gray-500 mt-2">AI-Powered Symptom Triage tailored for {activePet.name}'s breed profile.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {/* Input Section */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 relative z-10">
                            <Stethoscope className="w-4 h-4" /> Describe Symptoms
                        </label>
                        <textarea
                            className="w-full h-40 p-4 bg-white/50 dark:bg-black/40 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none shadow-inner dark:text-white relative z-10"
                            placeholder="e.g., Limping on the back right leg since this morning, somewhat lethargic, not eating right away..."
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                        />

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !symptoms.trim()}
                            className="mt-4 w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <Brain className="w-5 h-5" />
                                        </motion.div>
                                        Analyzing Genotype...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="w-5 h-5" />
                                        Analyze Match
                                    </>
                                )}
                            </span>
                            {loading && (
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                            )}
                        </button>
                    </div>

                    {/* Pet Context Card */}
                    <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <Bone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">Context Loaded</h3>
                            <p className="text-xs text-gray-500">{activePet.breed} • {activePet.age} • {activePet.weight_kg}kg</p>
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="lg:col-span-2 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="h-full flex flex-col items-center justify-center space-y-4"
                            >
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-t-2 border-purple-500"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                    />
                                    <motion.div
                                        className="absolute inset-2 rounded-full border-b-2 border-indigo-400 opacity-50"
                                        animate={{ rotate: -360 }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    />
                                    <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
                                </div>
                                <motion.p
                                    className="text-purple-600 font-medium"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    Cross-referencing {activePet.breed} genetics...
                                </motion.p>
                            </motion.div>
                        )}

                        {error && !loading && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 shadow-md"
                            >
                                <AlertTriangle className="w-8 h-8 mb-2" />
                                <h3 className="text-lg font-bold mb-1">Analysis Failed</h3>
                                <p>{error}</p>
                            </motion.div>
                        )}

                        {!loading && !result && !error && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 p-8"
                            >
                                <Brain className="w-16 h-16 mb-4 opacity-50" />
                                <p className="text-lg font-medium text-center">Awaiting Symptom Input...</p>
                                <p className="text-sm text-center mt-2 max-w-sm">
                                    Our AI engine will cross-reference your pet's specific breed genetics with the symptoms provided.
                                </p>
                            </motion.div>
                        )}

                        {result && !loading && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`h-full rounded-3xl border-2 p-6 md:p-8 shadow-2xl backdrop-blur-xl ${getSeverityStyles(result.severity).bg} ${getSeverityStyles(result.severity).border}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                        {getSeverityStyles(result.severity).icon}
                                    </div>
                                    <div>
                                        <h2 className={`text-2xl font-black tracking-tight ${getSeverityStyles(result.severity).text}`}>
                                            {result.severity.replace('_', ' ')}
                                        </h2>
                                        <p className="text-sm font-medium text-gray-600">Breed-Specific AI Triage</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white/60 rounded-2xl p-5 shadow-sm border border-white/50">
                                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            <Brain className="w-4 h-4 text-purple-500" />
                                            Clinical Analysis
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-[15px]">
                                            {result.analysis}
                                        </p>
                                    </div>

                                    <div className="bg-white/60 rounded-2xl p-5 shadow-sm border border-white/50">
                                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-blue-500" />
                                            Actionable Steps
                                        </h3>
                                        <ul className="space-y-3">
                                            {result.actionable_steps && result.actionable_steps.map((step, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.15 }}
                                                    className="flex items-start gap-3 text-gray-700"
                                                >
                                                    <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm
                                                        ${idx === 0 && (result.severity === 'RED_EMERGENCY' || result.severity === 'YELLOW_MONITOR') ? 'bg-red-500' : 'bg-gray-800'}
                                                    `}>
                                                        {idx + 1}
                                                    </div>
                                                    <span className={idx === 0 && result.severity === 'RED_EMERGENCY' ? 'font-bold' : ''}>
                                                        {step}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sticky Important Disclaimer */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-red-600 text-white text-center font-medium text-sm lg:text-base shadow-[0_-10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span><strong className="tracking-wide">Breed Genius is an AI triage tool, NOT a veterinarian.</strong> Always consult a professional clinic for medical emergencies.</span>
            </div>
        </div>
    );
};

export default BreedGenius;
