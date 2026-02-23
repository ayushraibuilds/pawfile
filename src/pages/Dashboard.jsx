import React, { useState } from 'react';
import { HeartPulse, Bell, Bone, MapPin, ChevronRight, Activity, Plus, FileQuestion, Camera } from 'lucide-react';
import './Dashboard.css';
import { useAuth } from '../context/AuthContext';
import { usePets } from '../context/PetContext';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
    const { user } = useAuth();
    const { activePet, addPet, loadingPets } = usePets();
    const { showToast } = useToast();

    const [isAddingPet, setIsAddingPet] = useState(false);
    const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', weight_kg: '' });

    const handleAddPet = async (e) => {
        e.preventDefault();
        try {
            await addPet(newPet);
            setIsAddingPet(false);
        } catch (error) {
            alert('Failed to add pet');
        }
    };

    if (loadingPets) {
        return <div className="p-8">Loading your pets...</div>;
    }

    if (!activePet && !isAddingPet) {
        return (
            <div className="dashboard animate-fade-in" style={{ justifyContent: 'center', alignItems: 'center', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2>Welcome to PAWFILE!</h2>
                <p>Let's get started by adding your first pet to the platform.</p>
                <button className="btn-add-new" onClick={() => setIsAddingPet(true)} style={{ padding: '12px 24px', fontSize: '16px' }}>
                    <Plus size={20} style={{ marginRight: '8px' }} /> Add Your Pet
                </button>
            </div>
        );
    }

    if (!activePet && isAddingPet) {
        return (
            <div className="dashboard animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100%', paddingTop: '100px' }}>
                <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '500px' }}>
                    <h2>Add New Pet</h2>
                    <form onSubmit={handleAddPet} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Pet Name</label>
                            <input type="text" required value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Breed</label>
                            <input type="text" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Age (Years)</label>
                                <input type="number" value={newPet.age} onChange={e => setNewPet({ ...newPet, age: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Weight (kg)</label>
                                <input type="number" step="0.1" value={newPet.weight_kg} onChange={e => setNewPet({ ...newPet, weight_kg: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                            </div>
                        </div>
                        <button type="submit" className="btn-auth-submit" style={{ marginTop: '16px' }}>Save Pet Profile</button>
                    </form>
                </div>
            </div>
        );
    }

    const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there';

    return (
        <div className="dashboard animate-fade-in">
            <header className="dashboard-header">
                <div>
                    <h1 className="greeting">Good morning, {firstName}! ☀️</h1>
                    <p className="subtitle">{activePet.name} is doing great today. Here's {activePet.name}'s daily summary.</p>
                </div>
                <div className="health-score glass-panel">
                    <div className="score-circle">
                        <span>98</span>
                    </div>
                    <div className="score-text">
                        <strong>Overall Health</strong>
                        <span>Excellent condition</span>
                    </div>
                </div>
            </header>

            <div className="quick-actions">
                <button className="action-card color-health" onClick={() => showToast("Use the Health Vault to log health data.", "info")}>
                    <HeartPulse className="card-icon" />
                    <span>Log Health</span>
                </button>
                <button className="action-card color-food" onClick={() => showToast("Meal tracking coming soon!", "info")}>
                    <Bone className="card-icon" />
                    <span>Track Meal</span>
                </button>
                <button className="action-card color-map" onClick={() => showToast("Use the Pet Map to find vets.", "info")}>
                    <MapPin className="card-icon" />
                    <span>Find Vet</span>
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="grid-col grid-left">
                    <section className="dashboard-section glass-panel">
                        <div className="section-header">
                            <h2><Bell size={20} className="text-warning" /> Upcoming Reminders</h2>
                        </div>
                        <div className="reminder-list">
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <FileQuestion size={24} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                                <p>No upcoming reminders. <br /> Check the Smart Reminders tab.</p>
                            </div>
                        </div>
                    </section>

                    <section className="dashboard-section glass-panel mt-4">
                        <div className="section-header">
                            <h2><Activity size={20} className="text-health" /> Recent Activity</h2>
                        </div>
                        <div className="activity-timeline">
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Activity size={24} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                                <p>No recent activity logged yet.</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="grid-col grid-right">
                    <section className="dashboard-section glass-panel featured-photo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <Camera size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                            <h3>No Recent Photos</h3>
                            <p style={{ marginTop: '8px' }}>Upload photos in your Pawfolio to feature them here.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
