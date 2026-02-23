import React from 'react';
import { Cloud, Heart, ArrowLeft, BookOpen, Users, Phone, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RainbowBridge.css';
import { usePets } from '../context/PetContext';
import { useToast } from '../context/ToastContext';

const RainbowBridge = () => {
    const navigate = useNavigate();
    const { activePet } = usePets();
    const { showToast } = useToast();

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    return (
        <div className="rainbow-page animate-fade-in">

            <div className="rainbow-bg-effects">
                <div className="glow glow-1"></div>
                <div className="glow glow-2"></div>
            </div>

            <button className="btn-back" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} /> Back
            </button>

            <div className="memorial-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="memorial-card" style={{ maxWidth: '600px', textAlign: 'center', padding: '60px 40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Star size={48} color="#ffeaa7" fill="rgba(255, 234, 167, 0.2)" style={{ margin: '0 auto 24px' }} />
                    <h2 style={{ marginBottom: '16px', fontSize: '28px', color: 'white' }}>A Place of Honor</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
                        This sacred space is reserved for honoring pets who have crossed the Rainbow Bridge. Currently, {activePet.name} is making beautiful memories by your side.
                    </p>
                    <button
                        className="btn-tribute"
                        onClick={() => showToast("Memorial creation is only available for departed pets.", "info")}
                        style={{ margin: '0 auto', display: 'flex' }}
                    >
                        <Heart size={16} fill="white" /> Create a Memorial
                    </button>
                </div>
            </div>

            <div className="support-section">
                <h2><Cloud size={24} /> Grief Support Resources</h2>
                <p className="support-intro">Losing a best friend is incredibly hard. You don't have to go through it alone. Here are some resources that might help.</p>

                <div className="resource-grid">

                    <a href="#" className="resource-card">
                        <div className="res-icon"><Phone size={24} color="#55efc4" /></div>
                        <div className="res-content">
                            <h3>Pet Loss Hotline</h3>
                            <p>Speak to grief counselors available 24/7. Completely free and confidential.</p>
                        </div>
                    </a>

                    <a href="#" className="resource-card">
                        <div className="res-icon"><Users size={24} color="#a29bfe" /></div>
                        <div className="res-content">
                            <h3>Support Groups</h3>
                            <p>Find local or virtual communities of pet owners navigating the same journey.</p>
                        </div>
                    </a>

                    <a href="#" className="resource-card">
                        <div className="res-icon"><BookOpen size={24} color="#ffeaa7" /></div>
                        <div className="res-content">
                            <h3>Healing Articles</h3>
                            <p>Read about the grieving process, how to explain loss to children, and memorial ideas.</p>
                        </div>
                    </a>

                </div>
            </div>

        </div>
    );
};

export default RainbowBridge;
