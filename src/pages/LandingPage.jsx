import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HeartPulse, Bone, Cloud, Activity, Check } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page animate-fade-in bg-slate-50 dark:bg-[#121212]">

            {/* Navigation */}
            <nav className="landing-nav bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/50 dark:border-white/10">
                <div className="landing-logo">
                    <span className="logo-icon">🐾</span>
                    <h1 className="text-gradient">PAWFILE</h1>
                </div>
                <div className="landing-nav-actions">
                    <button className="btn-login-outline" onClick={() => navigate('/auth')}>Log In</button>
                    <button className="btn-get-started" onClick={() => navigate('/auth')}>Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">✨ The Complete Pet Life Platform</div>
                    <h1 className="hero-title">
                        The Digital Operating System for <span className="text-gradient">Your Best Friend</span>
                    </h1>
                    <p className="hero-subtitle">
                        Manage medical records, set smart reminders, discover optimal diets through AI, and connect with trusted pet sitters—all in one beautiful place.
                    </p>
                    <div className="hero-actions flex gap-4 mt-8">
                        <button className="btn-hero-primary" onClick={() => navigate('/auth')}>Build Your Pawfile</button>
                        <button className="btn-hero-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>View Demo</button>
                    </div>
                </div>
                <div className="hero-visual relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl -z-10 rounded-full dark:opacity-50" />
                    <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 p-4 rounded-3xl shadow-2xl">
                        {/* Mock Dashboard Image Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                                    <Bone size={20} />
                                </div>
                                <div>
                                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                                    <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800/50 rounded"></div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Activity size={14} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <ShieldCheck size={14} className="text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </div>
                        {/* Mock Dashboard Body */}
                        <div className="space-y-3">
                            <div className="h-24 w-full bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30 flex items-center p-4">
                                <div className="w-12 h-12 bg-white dark:bg-black rounded-lg shadow-sm flex items-center justify-center mb-auto">
                                    <HeartPulse size={24} className="text-purple-500" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="h-4 w-3/4 bg-purple-200 dark:bg-purple-800/50 rounded mb-2"></div>
                                    <div className="h-3 w-1/2 bg-purple-100 dark:bg-purple-900/30 rounded"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-32 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-3"></div>
                                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-2"></div>
                                    <div className="h-3 w-2/3 bg-gray-50 dark:bg-gray-800/50 rounded"></div>
                                </div>
                                <div className="h-32 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3"></div>
                                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-2"></div>
                                    <div className="h-3 w-2/3 bg-gray-50 dark:bg-gray-800/50 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 animate-bounce">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                                <Check size={20} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Vet Appointment</p>
                                <p className="text-xs text-gray-500">Scheduled for Tomorrow</p>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="features-section">
                <div className="features-header">
                    <h2>Everything you need. Nothing you don't.</h2>
                    <p>Designed specifically to reduce the mental load of pet parenting.</p>
                </div>

                <div className="features-grid">

                    <div className="feature-card">
                        <div className="feature-icon bg-gradient-health"><HeartPulse size={24} color="white" /></div>
                        <h3>Health Vault</h3>
                        <p>Digital vaccine records, allergy tracking, and one-tap secure sharing with borders or sitters.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-gradient-food"><Bone size={24} color="white" /></div>
                        <h3>Food Brain AI</h3>
                        <p>Stop guessing. Get breed-specific, personalized diet and portion recommendations powered by AI.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon bg-gradient-sitter"><ShieldCheck size={24} color="white" /></div>
                        <h3>Sitter Network</h3>
                        <p>Find, book, and effortlessly share temporary health vault access with verified local pet sitters.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #a29bfe, #ffeaa7)' }}><Cloud size={24} color="white" /></div>
                        <h3>Rainbow Bridge</h3>
                        <p>A serene, private digital memorial to honor and remember your best friends forever.</p>
                    </div>

                </div>
            </section>

            <section id="demo" className="py-24 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6">How Our Ecosystem Works</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">Everything is connected. Your pet's profile feeds our AI engines, which power your reminders, vet triage, and daily scheduling.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        <div className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 relative group hover:border-purple-500/50 transition-colors">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-xl font-black text-purple-600 dark:text-purple-400">1</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Build The Genetic Profile</h3>
                            <p className="text-gray-600 dark:text-gray-400">Enter your pet's breed, age, and weight. Pawfile instantly generates a customized baseline for their specific biological needs.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 relative group hover:border-blue-500/50 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-xl font-black text-blue-600 dark:text-blue-400">2</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Engage The AI Engine</h3>
                            <p className="text-gray-600 dark:text-gray-400">Whether it's checking symptoms with Breed Genius or optimizing meals with Food Brain, the AI uses the profile as its source of truth.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-[#1a1a1a] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 relative group hover:border-green-500/50 transition-colors">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-xl font-black text-green-600 dark:text-green-400">3</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Live With Peace of Mind</h3>
                            <p className="text-gray-600 dark:text-gray-400">Automated reminders, secure health record sharing, and instant vet triage right in your pocket. You focus on the love, we'll handle the logistics.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="landing-footer border-t border-gray-200 dark:border-gray-800 relative">
                <div className="footer-content bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-2xl relative z-10">
                    <h2 className="dark:text-white">Ready to give them the care they deserve?</h2>
                    <p className="dark:text-gray-300">Join thousands of modern pet parents using Pawfile today.</p>
                    <button className="btn-footer-cta" onClick={() => navigate('/auth')}>Create Free Account</button>
                </div>
                <div className="footer-bottom dark:text-gray-500">
                    <span>&copy; 2026 PAWFILE. All rights reserved.</span>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
