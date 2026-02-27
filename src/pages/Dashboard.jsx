import React, { useState } from 'react';
import { HeartPulse, Bell, Bone, MapPin, Activity, FileQuestion, Camera, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { useAuth } from '../context/AuthContext';
import { usePets } from '../context/PetContext';
import { useToast } from '../context/ToastContext';
import OnboardingWizard from '../components/OnboardingWizard';

const Dashboard = () => {
    const { user } = useAuth();
    const { activePet, addPet, loadingPets } = usePets();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [isAddingPet, setIsAddingPet] = useState(false);
    const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', weight_kg: '' });

    const handleAddPet = async (petData) => {
        try {
            await addPet(petData);
            setIsAddingPet(false);
        } catch (error) {
            showToast('Failed to add pet. Please try again.', 'error');
        }
    };

    if (loadingPets) {
        return <div className="p-8">Loading your pets...</div>;
    }

    if (!activePet && !isAddingPet) {
        return (
            <div className="dashboard animate-fade-in" style={{ justifyContent: 'center', alignItems: 'center', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Brain size={64} className="text-purple-500 opacity-50 mb-2" />
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">Welcome to PAWFILE!</h2>
                <p className="text-gray-500 dark:text-gray-400">Your AI-powered operating system for pet parenting.</p>
                <button
                    onClick={() => setIsAddingPet(true)}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all w-64 text-lg"
                >
                    Start Onboarding
                </button>
            </div>
        );
    }

    if (!activePet && isAddingPet) {
        return (
            <div className="dashboard animate-fade-in h-full bg-slate-50 dark:bg-[#121212] flex items-center justify-center">
                <OnboardingWizard onComplete={handleAddPet} />
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
                <button className="action-card color-health border border-purple-200 dark:border-purple-900 shadow-sm hover:shadow-md transition-all scale-100 hover:scale-105" onClick={() => navigate('/dashboard/breed-genius')}>
                    <Brain className="card-icon text-purple-600 dark:text-purple-400" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Breed Genius Triage</span>
                </button>
                <button className="action-card color-food" onClick={() => navigate('/dashboard/food')}>
                    <Bone className="card-icon" />
                    <span>Food Brain AI</span>
                </button>
                <button className="action-card color-map" onClick={() => navigate('/dashboard/map')}>
                    <MapPin className="card-icon" />
                    <span>Find Vet Facilities</span>
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
