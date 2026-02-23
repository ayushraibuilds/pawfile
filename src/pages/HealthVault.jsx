import React, { useState, useEffect } from 'react';
import { QrCode, FileText, Syringe, Plus, ExternalLink, Calendar, Info, Pill, Loader2 } from 'lucide-react';
import './HealthVault.css';
import { usePets } from '../context/PetContext';
import { supabase } from '../config/supabase';

const HealthVault = () => {
    const { activePet } = usePets();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            if (!activePet) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('health_records')
                    .select('*')
                    .eq('pet_id', activePet.id)
                    .order('date', { ascending: false });

                if (error) throw error;
                setRecords(data || []);
            } catch (error) {
                console.error('Error fetching records:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [activePet]);

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    const vaccines = records.filter(r => r.record_type === 'vaccine');
    const vetVisits = records.filter(r => r.record_type === 'vet_visit');
    const prescriptions = records.filter(r => r.record_type === 'prescription');

    return (
        <div className="health-vault animate-fade-in">
            <header className="page-header">
                <div>
                    <h1 className="greeting">Health Vault</h1>
                    <p className="subtitle">Manage {activePet.name}'s medical records, vaccinations, and prescriptions.</p>
                </div>
                <button className="btn-secondary">
                    <QrCode size={18} />
                    <span>Share via QR</span>
                </button>
            </header>

            <div className="health-grid">
                <div className="grid-main">

                    <section className="glass-panel stat-cards">
                        <div className="stat-card">
                            <span className="stat-label">Weight</span>
                            <span className="stat-value">{activePet.weight_kg || '--'} <span>kg</span></span>
                            <span className="stat-trend positive">Stable</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Blood Type</span>
                            <span className="stat-value">{activePet.blood_type || 'Unknown'}</span>
                            <span className="stat-trend neutral">Universal</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Allergies</span>
                            <span className="stat-value">{activePet.allergies || 'None'}</span>
                            {activePet.allergies ? <span className="stat-trend negative">Alert</span> : <span className="stat-trend positive">Clear</span>}
                        </div>
                    </section>

                    <section className="glass-panel module-section mt-4">
                        <div className="section-header">
                            <h2><Syringe size={20} className="text-health" /> Vaccination Record</h2>
                            <button className="icon-btn"><Plus size={18} /></button>
                        </div>
                        <div className="table-responsive">
                            <table className="health-table">
                                <thead>
                                    <tr>
                                        <th>Vaccine</th>
                                        <th>Date Given</th>
                                        <th>Next Due</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}><Loader2 className="animate-spin" size={24} style={{ margin: '0 auto' }} /></td></tr>
                                    ) : vaccines.length > 0 ? (
                                        vaccines.map((vax) => (
                                            <tr key={vax.id}>
                                                <td><strong>{vax.title}</strong><br /><span className="text-muted">{vax.notes}</span></td>
                                                <td>{new Date(vax.date).toLocaleDateString()}</td>
                                                <td>--</td>
                                                <td><span className={`badge-status ${vax.completed ? 'current' : 'due'}`}>{vax.completed ? 'Current' : 'Due Soon'}</span></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No vaccination records found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="glass-panel module-section mt-4">
                        <div className="section-header">
                            <h2><FileText size={20} className="text-health" /> Recent Vet Visits</h2>
                            <button className="btn-link">View History <ExternalLink size={14} /></button>
                        </div>
                        <div className="visit-list">
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><Loader2 className="animate-spin" size={24} /></div>
                            ) : vetVisits.length > 0 ? (
                                vetVisits.map((visit) => {
                                    const dateObj = new Date(visit.date);
                                    return (
                                        <div className="visit-card" key={visit.id}>
                                            <div className="visit-date">
                                                <span className="v-month">{dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                                <span className="v-day">{dateObj.getDate().toString().padStart(2, '0')}</span>
                                            </div>
                                            <div className="visit-info">
                                                <h4>{visit.title}</h4>
                                                <p>{visit.notes || 'No notes available.'}</p>
                                            </div>
                                            <button className="btn-outline">Notes</button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No recent vet visits.</p>
                            )}
                        </div>
                    </section>

                </div>

                <div className="grid-side">

                    <section className="glass-panel module-section bg-gradient-health text-white">
                        <div className="section-header" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                            <h2 style={{ color: 'white' }}><QrCode size={20} /> Digital Vet ID</h2>
                        </div>
                        <div className="qr-container">
                            <div className="qr-box">
                                {/* SVG mock for QR code */}
                                <svg width="120" height="120" viewBox="0 0 100 100">
                                    <rect width="100" height="100" fill="#fff" rx="8" />
                                    <path d="M20,20 h20 v20 h-20 z M30,30 h0.1 v0.1 h-0.1 z" fill="#0984e3" strokeWidth="2" stroke="#0984e3" />
                                    <path d="M60,20 h20 v20 h-20 z M70,30 h0.1 v0.1 h-0.1 z" fill="#0984e3" strokeWidth="2" stroke="#0984e3" />
                                    <path d="M20,60 h20 v20 h-20 z M30,70 h0.1 v0.1 h-0.1 z" fill="#0984e3" strokeWidth="2" stroke="#0984e3" />
                                    <path d="M50,50 h10 v10 h-10 z M70,50 h10 v10 h-10 z M50,70 h10 v10 h-10 z M60,60 h10 v10 h-10 z M80,60 v20 h-10 v-10 h-10 v10 h-10 v-20 h10 v-10 h10 v10 z" fill="#0984e3" />
                                </svg>
                            </div>
                            <p className="qr-text">Scan for full medical file & emergency contact</p>
                        </div>
                    </section>

                    <section className="glass-panel module-section mt-4">
                        <div className="section-header">
                            <h2><Pill size={20} className="text-warning" /> Active Prescriptions</h2>
                            <button className="icon-btn"><Plus size={18} /></button>
                        </div>
                        <div className="prescription-list">
                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><Loader2 className="animate-spin" size={24} /></div>
                            ) : prescriptions.length > 0 ? (
                                prescriptions.map((rx) => (
                                    <div className="rx-card" key={rx.id}>
                                        <div className="rx-icon"><Pill size={24} color="#f39c12" /></div>
                                        <div className="rx-info">
                                            <h4>{rx.title}</h4>
                                            <p>{rx.notes}</p>
                                            <span className="rx-refill">Added on {new Date(rx.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No active prescriptions.</p>
                            )}
                        </div>
                    </section>

                    <section className="glass-panel module-section mt-4">
                        <div className="section-header">
                            <h2><Calendar size={20} className="text-map" /> Deworming</h2>
                        </div>
                        <div className="deworm-card">
                            <div className="deworm-status">
                                <div className="status-indicator safe"></div>
                                <span>Protected for 45 days</span>
                            </div>
                            <p className="last-dose">Last dose: <strong>Oct 01, 2025</strong></p>
                            <button className="btn-full">Log New Dose</button>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default HealthVault;
