import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HeartPulse, Bone, Cloud, Activity, Check } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page animate-fade-in">

            {/* Navigation */}
            <nav className="landing-nav bg-surface/80 backdrop-blur-md border border-border-main/50">
                <div className="landing-logo">
                    <span className="logo-icon">🐾</span>
                    <h1 className="text-gradient">PAWFILE</h1>
                </div>
                <div className="landing-nav-actions">
                    <button className="btn-login-outline" onClick={() => navigate('/auth')}>Log In</button>
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all" onClick={() => navigate('/auth')}>Get Started</button>
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl -z-10 rounded-full" />
                    <div className="relative z-10 bg-surface/90 backdrop-blur-xl border border-border-main p-4 rounded-3xl shadow-2xl">
                        {/* Mock Dashboard Image Header */}
                        <div className="flex items-center justify-between border-b border-border-main pb-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                                    <Bone size={20} />
                                </div>
                                <div>
                                    <div className="h-4 w-24 bg-border-main rounded mb-2"></div>
                                    <div className="h-3 w-32 bg-border-main/50 rounded"></div>
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
                            <div className="h-24 w-full bg-border-main/20 rounded-xl border border-border-main/50 flex items-center p-4">
                                <div className="w-12 h-12 bg-background rounded-lg shadow-sm flex items-center justify-center mb-auto">
                                    <HeartPulse size={24} className="text-purple-500" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="h-4 w-3/4 bg-border-main rounded mb-2"></div>
                                    <div className="h-3 w-1/2 bg-border-main/50 rounded"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-32 bg-background rounded-xl border border-border-main p-4">
                                    <div className="w-8 h-8 rounded-full mb-3" style={{ background: 'var(--food-color)' }}></div>
                                    <div className="h-4 w-full bg-border-main rounded mb-2"></div>
                                    <div className="h-3 w-2/3 bg-border-main/50 rounded"></div>
                                </div>
                                <div className="h-32 bg-background rounded-xl border border-border-main p-4">
                                    <div className="w-8 h-8 rounded-full mb-3" style={{ background: 'var(--health-color)' }}></div>
                                    <div className="h-4 w-full bg-border-main rounded mb-2"></div>
                                    <div className="h-3 w-2/3 bg-border-main/50 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 bg-surface p-4 rounded-2xl shadow-xl border border-border-main flex items-center gap-3 animate-bounce">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--map-color)' }}>
                                <Check size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-main">Vet Appointment</p>
                                <p className="text-xs text-text-muted">Scheduled for Tomorrow</p>
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



            {/* Footer CTA */}
            <footer className="landing-footer border-t border-border-main relative">
                <div className="footer-content bg-surface/80 backdrop-blur-md border border-border-main/50 shadow-2xl relative z-10">
                    <h2 className="text-text-main">Ready to give them the care they deserve?</h2>
                    <p className="text-text-muted">Join thousands of modern pet parents using Pawfile today.</p>
                    <button className="btn-footer-cta" onClick={() => navigate('/auth')}>Create Free Account</button>
                </div>
                <div className="footer-bottom text-text-muted">
                    <span>&copy; 2026 PAWFILE. All rights reserved.</span>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
