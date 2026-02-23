import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, HeartPulse, Bone, Cloud } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page animate-fade-in">

            {/* Navigation */}
            <nav className="landing-nav glass-panel">
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
                    <div className="hero-actions">
                        <button className="btn-hero-primary" onClick={() => navigate('/auth')}>Build Your Pawfile</button>
                        <button className="btn-hero-secondary" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Explore Features</button>
                    </div>
                </div>
                <div className="hero-visual">
                    {/* Abstract floating elements representing the app modules */}
                    <div className="floating-card c-health">
                        <HeartPulse size={24} color="var(--health-color)" />
                        <span>Digital Vet ID</span>
                    </div>
                    <div className="floating-card c-food">
                        <Bone size={24} color="var(--food-color)" />
                        <span>AI Diet Coach</span>
                    </div>
                    <div className="floating-card c-sitter">
                        <ShieldCheck size={24} color="var(--sitter-color)" />
                        <span>Verified Sitters</span>
                    </div>
                    <div className="hero-image-container">
                        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Happy dog" className="hero-img" />
                        <div className="hero-glow"></div>
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
            <footer className="landing-footer">
                <div className="footer-content glass-panel">
                    <h2>Ready to give them the care they deserve?</h2>
                    <p>Join thousands of modern pet parents using Pawfile.</p>
                    <button className="btn-footer-cta" onClick={() => navigate('/auth')}>Create Free Account</button>
                </div>
                <div className="footer-bottom">
                    <span>&copy; 2026 PAWFILE. All rights reserved.</span>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
