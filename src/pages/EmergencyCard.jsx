import React, { useState } from 'react';
import { ShieldAlert, Phone, AlertTriangle, Syringe, MapPin, Share2, Download, HeartPulse, Camera } from 'lucide-react';
import './EmergencyCard.css';
import { usePets } from '../context/PetContext';
import { useToast } from '../context/ToastContext';

const EmergencyCard = () => {
    const [isLost, setIsLost] = useState(false);
    const { activePet } = usePets();
    const { showToast } = useToast();

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    return (
        <div className={`emergency-page animate-fade-in ${isLost ? 'lost-mode-active' : ''}`}>
            <header className="page-header">
                <div>
                    <h1 className="greeting">Emergency Card</h1>
                    <p className="subtitle">This preview shows what someone sees if they scan {activePet.name}'s collar.</p>
                </div>
                <div className="lost-toggle-container">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isLost}
                            onChange={() => setIsLost(!isLost)}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span className="toggle-label">{isLost ? 'Lost Mode Active' : 'Toggle Lost Mode'}</span>
                </div>
            </header>

            <div className="card-preview-container">

                <div className={`id-card ${isLost ? 'id-card-lost' : ''}`}>

                    {isLost && (
                        <div className="lost-banner">
                            <AlertTriangle size={20} />
                            PLEASE HELP, I'M LOST!
                        </div>
                    )}

                    <div className="id-card-header">
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px', flexShrink: 0 }}>
                            <Camera size={32} color="rgba(255,255,255,0.8)" />
                        </div>
                        <div className="id-title">
                            <h2>{activePet.name}</h2>
                            <p>{activePet.breed} • {activePet.age} yrs • {activePet.weight_kg} kg</p>
                        </div>
                    </div>

                    <div className="id-card-body">

                        <div className="info-section">
                            <h3><Phone size={16} /> Owner Contact</h3>
                            <div className="contact-box">
                                <p><strong>Primary Owner</strong></p>
                                <p className="phone">Registered Phone Number</p>
                                <button className="btn-call full-width" onClick={() => showToast("Calling owner...", "info")}>Tap to Call Owner</button>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-col">
                                <h3><HeartPulse size={16} /> Medical</h3>
                                <ul className="traits-list">
                                    <li><strong>Blood:</strong> Unknown</li>
                                    <li className="text-danger"><strong>Allergy:</strong> {activePet.allergies || 'None listed'}</li>
                                    <li><strong>Status:</strong> Unknown</li>
                                </ul>
                            </div>
                            <div className="info-col">
                                <h3><Syringe size={16} /> Vet Check</h3>
                                <ul className="traits-list">
                                    <li><strong>Rabies:</strong> Current</li>
                                    <li><strong>Chip:</strong> #9810283910</li>
                                </ul>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3><MapPin size={16} /> Primary Vet</h3>
                            <div className="vet-box">
                                <p><strong>No primary vet listed</strong></p>
                                <p>Update in Health Vault</p>
                                <div className="vet-actions">
                                    <button className="btn-outline-small" onClick={() => showToast("Add a vet first.", "error")}>Call Vet</button>
                                    <button className="btn-outline-small" onClick={() => showToast("Add a vet first.", "error")}>Directions</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="id-card-footer">
                        <div className="qr-mini">
                            {/* Mini QR Mock */}
                            <svg width="60" height="60" viewBox="0 0 100 100">
                                <rect width="100" height="100" fill="#fff" />
                                <path d="M10,10 h30 v30 h-30 z M60,10 h30 v30 h-30 z M10,60 h30 v30 h-30 z" fill="#2d3436" />
                                <path d="M40,40 h20 v20 h-20 z" fill="#2d3436" />
                            </svg>
                        </div>
                        <p>Scan collar for live updates.</p>
                    </div>
                </div>

            </div>

            <div className="card-actions-bar glass-panel">
                <button className="action-btn" onClick={() => showToast("Generating PDF...", "success")}>
                    <Download size={18} /> Download PDF
                </button>
                <button className="action-btn" onClick={() => showToast("Link copied to clipboard!", "success")}>
                    <Share2 size={18} /> Share Digital Link
                </button>
                <button className="action-btn primary" onClick={() => showToast("Store coming soon!", "info")}>
                    <ShieldAlert size={18} /> Order Physical Collar Tag
                </button>
            </div>

        </div>
    );
};

export default EmergencyCard;
