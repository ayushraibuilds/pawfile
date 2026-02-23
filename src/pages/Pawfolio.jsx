import React from 'react';
import { Camera, Play, Sparkles, Filter, Calendar, Heart, Image as ImageIcon } from 'lucide-react';
import './Pawfolio.css';
import { usePets } from '../context/PetContext';
import { useToast } from '../context/ToastContext';

const Pawfolio = () => {
    const { activePet } = usePets();
    const { showToast } = useToast();

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    return (
        <div className="pawfolio-page animate-fade-in">
            <header className="page-header header-pawfolio">
                <div>
                    <h1 className="greeting">Pawfolio</h1>
                    <p className="subtitle">Relive {activePet.name}'s best moments. Auto-organized by AI.</p>
                </div>
                <button className="btn-upload" onClick={() => showToast("Photo upload sync is coming in the next update!", "info")}>
                    <Camera size={18} />
                    <span>Upload Memories</span>
                </button>
            </header>

            <section className="glass-panel pupdate-section" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ padding: '40px' }}>
                    <Sparkles size={32} color="var(--primary-color)" style={{ margin: '0 auto 16px' }} />
                    <h2 style={{ marginBottom: '8px' }}>AI Pupdates Empty</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Upload photos and videos of {activePet.name} to see a generated monthly highlight reel here.</p>
                </div>
            </section>

            <div className="gallery-header mt-4">
                <div className="filters">
                    <button className="filter-btn active">All Memories</button>
                    <button className="filter-btn">Videos</button>
                    <button className="filter-btn">Milestones</button>
                    <button className="filter-btn"><Filter size={14} /> Custom Filter</button>
                </div>
                <div className="gallery-view-options">
                    <span className="text-muted"><Calendar size={16} /> Sorted by Date</span>
                </div>
            </div>

            <div className="masonry-grid" style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
                <div className="empty-state">
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(162, 155, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <ImageIcon size={32} color="var(--primary-color)" />
                    </div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No memories yet</h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
                        {activePet.name}'s pawfolio is waiting to be filled with adventures, naps, and treats.
                    </p>
                    <button className="btn-outline" onClick={() => showToast("Photo upload sync is coming in the next update!", "info")}>
                        Upload First Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pawfolio;
