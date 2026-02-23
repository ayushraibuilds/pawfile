import React, { useState } from 'react';
import { Search, Star, MapPin, ShieldCheck, HeartPulse, CheckCircle2, MessageSquare, Calendar, Compass } from 'lucide-react';
import './PetSitter.css';
import { usePets } from '../context/PetContext';
import { useToast } from '../context/ToastContext';

const PetSitter = () => {
    const { activePet } = usePets();
    const { showToast } = useToast();
    const [vaultShared, setVaultShared] = useState(false);

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    return (
        <div className="sitter-page animate-fade-in">
            <header className="page-header header-sitter">
                <div>
                    <h1 className="greeting">Pet Sitter Network</h1>
                    <p className="subtitle">Book trusted, PAWFILE-verified sitters and walkers near you.</p>
                </div>
                <div className="sitter-search-bar" onClick={() => showToast("Location search is coming soon!", "info")} style={{ cursor: 'pointer' }}>
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search by name, service, or date..." readOnly style={{ pointerEvents: 'none' }} />
                </div>
            </header>

            <div className="sitter-layout" style={{ display: 'block' }}>
                <div className="glass-panel" style={{ padding: '80px 20px', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgb(253, 227, 233)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <Compass size={32} color="var(--sitter-color)" />
                    </div>
                    <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Expanding to your area</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 30px', lineHeight: '1.6' }}>
                        The PAWFILE verified sitter network hasn't launched in your city just yet. We're rigorously vetting local pet professionals to ensure {activePet.name} receives the best care possible.
                    </p>
                    <button className="btn-get-started" onClick={() => showToast("You will be notified when sitters are available!", "success")} style={{ background: 'var(--sitter-color)' }}>
                        Notify Me When Available
                    </button>

                    <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--border-color)', maxWidth: '600px', margin: '40px auto 0' }}>
                        <h4 style={{ marginBottom: '16px', color: 'var(--text-main)' }}><ShieldCheck size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} color="var(--sitter-color)" /> The PAWFILE Standard</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
                            <div>
                                <strong style={{ display: 'block', marginBottom: '4px' }}>Background Checked</strong>
                                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Every sitter passes an extensive local and national check.</span>
                            </div>
                            <div>
                                <strong style={{ display: 'block', marginBottom: '4px' }}>Premium Insurance</strong>
                                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Bookings are backed by ₹1,000,000 comprehensive pet insurance.</span>
                            </div>
                            <div>
                                <strong style={{ display: 'block', marginBottom: '4px' }}>Health Vault Sync</strong>
                                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sitters get temporary read-access to {activePet.name}'s allergies and vet info.</span>
                            </div>
                            <div>
                                <strong style={{ display: 'block', marginBottom: '4px' }}>Live Pupdates</strong>
                                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>GPS tracked walks and photo updates straight to your pawfolio.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetSitter;
