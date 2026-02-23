import React, { useState, useEffect } from 'react';
import { Bone, Sparkles, ShoppingBag, ThumbsUp, ThumbsDown, Info, Loader2 } from 'lucide-react';
import './FoodBrain.css';
import { usePets } from '../context/PetContext';
import './FoodBrain.css';

const FoodBrain = () => {
    const { activePet } = usePets();

    const [formData, setFormData] = useState({
        breed: '',
        age: '',
        weight: '',
        healthIssues: '',
        activityLevel: 'Moderate (Daily walks)'
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [recommendation, setRecommendation] = useState(null);

    // Update form when active pet changes
    useEffect(() => {
        if (activePet) {
            setFormData({
                breed: activePet.breed || '',
                age: activePet.age ? `${activePet.age} Years` : '',
                weight: activePet.weight_kg ? activePet.weight_kg.toString() : '',
                healthIssues: activePet.allergies || '',
                activityLevel: 'Moderate (Daily walks)'
            });
            // Reset recommendation for new pet
            setRecommendation(null);
        }
    }, [activePet]);

    const handleGenerate = () => {
        setIsGenerating(true);
        setRecommendation(null);

        // Simulate an API call to an LLM
        setTimeout(() => {
            const isAllergicToPoultry = formData.healthIssues.toLowerCase().includes('poultry') || formData.healthIssues.toLowerCase().includes('chicken');

            const mockedResponse = {
                title: isAllergicToPoultry ? "Purina Pro Plan Sensitive Skin & Stomach" : "Royal Canin Breed Specific Adult",
                flavor: isAllergicToPoultry ? "Salmon & Rice Formula" : "Chicken & Brown Rice",
                price: "₹7,200",
                reasons: [
                    isAllergicToPoultry ? "Avoids poultry completely (matches allergy profile)." : `Tailored nutrition for ${formData.breed || 'your dog'}.`,
                    "Omega-6 for coat health.",
                    `Calorie-matched for a ${formData.weight || 'standard'}kg ${formData.activityLevel.split(' ')[0].toLowerCase()} dog.`
                ]
            };

            setRecommendation(mockedResponse);
            setIsGenerating(false);
        }, 2500); // 2.5 second delay to feel like AI is "thinking"
    };

    if (!activePet) {
        return <div className="p-8">Please add a pet from the Dashboard first.</div>;
    }

    return (
        <div className="food-brain animate-fade-in">
            <header className="page-header">
                <div>
                    <h1 className="greeting">Food Brain</h1>
                    <p className="subtitle">AI-powered diet recommendations for {activePet.name}.</p>
                </div>
            </header>

            <div className="food-grid">
                <div className="grid-left">

                    <section className="glass-panel ai-form-section">
                        <div className="section-header">
                            <h2><Sparkles size={20} className="text-food" /> AI Diet Consultant</h2>
                        </div>
                        <p className="ai-desc">Update {activePet.name}'s details below to get the latest optimal diet recommendation.</p>

                        <form className="ai-form">
                            <div className="form-group">
                                <label>Breed</label>
                                <input type="text" value={formData.breed} onChange={(e) => setFormData({ ...formData, breed: e.target.value })} className="form-control" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="text" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Weight (kg)</label>
                                    <input type="number" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} className="form-control" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Known Health Issues & Allergies</label>
                                <textarea className="form-control" rows="3" value={formData.healthIssues} onChange={(e) => setFormData({ ...formData, healthIssues: e.target.value })}></textarea>
                            </div>

                            <div className="form-group">
                                <label>Activity Level</label>
                                <select className="form-control" value={formData.activityLevel} onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}>
                                    <option>Low (Mostly indoors)</option>
                                    <option>Moderate (Daily walks)</option>
                                    <option>High (Very active, running)</option>
                                </select>
                            </div>

                            <button type="button" className="btn-primary-food" onClick={handleGenerate} disabled={isGenerating}>
                                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                                {isGenerating ? 'Analyzing pet profile...' : 'Generate AI Recommendation'}
                            </button>
                        </form>
                    </section>

                </div>

                <div className="grid-right">

                    <section className="glass-panel current-diet">
                        {recommendation ? (
                            <>
                                <div className="diet-badge">AI Suggested Optimal Diet</div>
                                <div className="diet-header">
                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                                        <Bone size={32} color="var(--food-color)" />
                                    </div>
                                    <div className="diet-info">
                                        <h3>{recommendation.title}</h3>
                                        <p className="diet-flavor">{recommendation.flavor}</p>
                                        <p className="diet-price">{recommendation.price} <span className="text-muted">/ 13kg bag</span></p>
                                    </div>
                                </div>

                                <div className="diet-why">
                                    <h4>Why this works for {activePet.name}:</h4>
                                    <ul>
                                        {recommendation.reasons.map((reason, index) => (
                                            <li key={index}>{reason}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="diet-actions">
                                    <button className="btn-buy">
                                        <ShoppingBag size={18} />
                                        One-Tap Reorder
                                    </button>
                                </div>
                            </>
                        ) : isGenerating ? (
                            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 16px', color: 'var(--food-color)' }} />
                                <p>Consulting our veterinary database...</p>
                            </div>
                        ) : (
                            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Sparkles size={32} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                                <p>Generate a recommendation to see results here.</p>
                            </div>
                        )}
                    </section>

                    <section className="glass-panel mt-4">
                        <div className="section-header">
                            <h2><Bone size={20} /> Diet History & Tracker</h2>
                        </div>
                        <div className="tracker-list">
                            <div className="track-item worked">
                                <div className="track-icon"><ThumbsUp size={18} color="#00b894" /></div>
                                <div className="track-info">
                                    <h4>Purina Pro Plan (Salmon)</h4>
                                    <p>Current • Great coat, solid stools.</p>
                                </div>
                            </div>
                            <div className="track-item failed">
                                <div className="track-icon"><ThumbsDown size={18} color="#d63031" /></div>
                                <div className="track-info">
                                    <h4>Royal Canin Golden Retriever</h4>
                                    <p>Oct 2024 - Jan 2025 • Caused itching (contains poultry).</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default FoodBrain;
