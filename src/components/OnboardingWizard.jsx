import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Calendar, Weight, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const OnboardingWizard = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        weight_kg: ''
    });

    const handleNext = () => setStep(s => Math.min(s + 1, 3));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));
    const isStepValid = () => {
        if (step === 1) return formData.name.trim().length > 0;
        if (step === 2) return formData.breed.trim().length > 0 && formData.age.toString().length > 0;
        if (step === 3) return formData.weight_kg.toString().length > 0;
        return false;
    };

    const handleSubmit = async () => {
        if (isStepValid()) {
            await onComplete(formData);
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    const [direction, setDirection] = useState(1);

    const changeStep = (newStep) => {
        setDirection(newStep > step ? 1 : -1);
        setStep(newStep);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full p-4">
            <div className="w-full max-w-lg bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 relative">

                {/* Progress Indicators */}
                <div className="flex justify-between items-center mb-8 relative z-10">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300
                                ${step === num ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' :
                                    step > num ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                {step > num ? <Check size={16} /> : num}
                            </div>
                            {num < 3 && (
                                <div className={`w-24 h-1 mx-2 rounded transition-colors duration-300
                                    ${step > num ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="relative min-h-[220px]">
                    <AnimatePresence custom={direction} mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute inset-0"
                            >
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                                        <PawPrint className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to Pawfile!</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Let's set up your first pet's profile. What is their name?</p>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="e.g. Max"
                                        className="w-full text-2xl text-center p-4 bg-white/50 dark:bg-black/20 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-0 outline-none transition-all dark:text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute inset-0"
                            >
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                                        <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Genetics & Age</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">This helps our AI (Breed Genius & Food Brain) personalize care.</p>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Breed (e.g. Golden Retriever)"
                                        className="w-full p-4 bg-white/50 dark:bg-black/20 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 outline-none transition-all dark:text-white"
                                        value={formData.breed}
                                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age in Years"
                                        className="w-full p-4 bg-white/50 dark:bg-black/20 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 outline-none transition-all dark:text-white"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute inset-0"
                            >
                                <div className="text-center mb-6">
                                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                                        <Weight className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Almost Done!</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Current weight helps calculate exact medicine and food portions.</p>
                                </div>
                                <div>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Current Weight"
                                            className="w-full text-2xl text-center p-4 pr-12 bg-white/50 dark:bg-black/20 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 outline-none transition-all dark:text-white"
                                            value={formData.weight_kg}
                                            onChange={(e) => setFormData({ ...formData, weight_kg: e.target.value })}
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">KG</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex justify-between items-center relative z-10">
                    {step > 1 ? (
                        <button
                            onClick={() => changeStep(step - 1)}
                            className="flex items-center text-gray-500 hover:text-gray-800 dark:hover:text-white font-medium transition-colors p-2"
                        >
                            <ArrowLeft size={18} className="mr-2" /> Back
                        </button>
                    ) : (
                        <div /> // Placeholder for alignment
                    )}

                    <button
                        onClick={() => step < 3 ? changeStep(step + 1) : handleSubmit()}
                        disabled={!isStepValid()}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {step === 3 ? 'Launch Dashboard' : 'Continue'}
                        {step < 3 && <ArrowRight size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingWizard;
