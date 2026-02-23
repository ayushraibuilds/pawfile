import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Plus, CheckCircle2, Clock, ShieldAlert, Syringe, Scissors, Pill, Loader2 } from 'lucide-react';
import './SmartReminders.css';
import { usePets } from '../context/PetContext';
import { supabase } from '../config/supabase';

const SmartReminders = () => {
    const { activePet } = usePets();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchReminders = async () => {
            if (!activePet) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('reminders')
                    .select('*')
                    .eq('pet_id', activePet.id)
                    .order('due_date', { ascending: true });

                if (error) throw error;
                setReminders(data || []);
            } catch (error) {
                console.error('Error fetching reminders:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReminders();
    }, [activePet]);

    const handleToggleComplete = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('reminders')
                .update({ is_completed: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setReminders(reminders.map(r => r.id === id ? { ...r, is_completed: !currentStatus } : r));
        } catch (error) {
            console.error('Error toggling reminder status:', error.message);
        }
    };

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    const filteredReminders = filter === 'All'
        ? reminders
        : reminders.filter(r => r.category === filter);

    const getIconForCategory = (category) => {
        switch (category) {
            case 'Health & Vax': return <Syringe size={24} color="#f39c12" />;
            case 'Grooming': return <Scissors size={24} color="#6c5ce7" />;
            case 'Medication': return <Pill size={24} color="#0984e3" />;
            default: return <Bell size={24} color="#0984e3" />;
        }
    };

    const getThemeForCategory = (category) => {
        switch (category) {
            case 'Health & Vax': return 'warning-card';
            case 'Grooming': return 'neutral-card';
            case 'Medication': return 'neutral-card';
            default: return 'neutral-card';
        }
    };

    return (
        <div className="reminders-page animate-fade-in">
            <header className="page-header">
                <div>
                    <h1 className="greeting">Smart Reminders</h1>
                    <p className="subtitle">AI-powered schedule for {activePet.name} based on breed, age, and health history.</p>
                </div>
                <button className="btn-add">
                    <Plus size={18} />
                    <span>Add Reminder</span>
                </button>
            </header>

            <div className="filters">
                <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                <button className={`filter-btn ${filter === 'Health & Vax' ? 'active' : ''}`} onClick={() => setFilter('Health & Vax')}>Health & Vax</button>
                <button className={`filter-btn ${filter === 'Grooming' ? 'active' : ''}`} onClick={() => setFilter('Grooming')}>Grooming</button>
                <button className={`filter-btn ${filter === 'Medication' ? 'active' : ''}`} onClick={() => setFilter('Medication')}>Medication</button>
            </div>

            <div className="reminders-container">
                <section className="timeline-section">
                    <h3 className="timeline-title">{filter === 'All' ? 'Upcoming Schedule' : filter}</h3>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><Loader2 className="animate-spin" size={32} /></div>
                    ) : filteredReminders.length > 0 ? (
                        filteredReminders.map(reminder => (
                            <div className={`reminder-card ${getThemeForCategory(reminder.category)} ${reminder.is_completed ? 'completed' : ''}`} key={reminder.id} style={{ opacity: reminder.is_completed ? 0.6 : 1 }}>
                                <div className="reminder-icon">
                                    {getIconForCategory(reminder.category)}
                                </div>
                                <div className="reminder-content">
                                    <h4 style={{ textDecoration: reminder.is_completed ? 'line-through' : 'none' }}>{reminder.title}</h4>
                                    <p>Auto-generated from routines.</p>
                                    <div className="reminder-meta">
                                        <span className="due-date"><Calendar size={14} /> Due: {new Date(reminder.due_date).toLocaleDateString()}</span>
                                        {!reminder.is_completed && <span className="ai-badge">AI Suggested Time</span>}
                                    </div>
                                </div>
                                <div className="reminder-actions">
                                    <button
                                        className={`btn-done ${!reminder.is_completed ? 'disabled' : ''}`}
                                        onClick={() => handleToggleComplete(reminder.id, reminder.is_completed)}
                                        style={{ background: reminder.is_completed ? '#00b894' : '', border: '1px solid #ccc' }}
                                    >
                                        <CheckCircle2 size={24} color={reminder.is_completed ? 'white' : 'var(--text-muted)'} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '20px', color: 'var(--text-muted)' }}>
                            No reminders found for this category.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default SmartReminders;
