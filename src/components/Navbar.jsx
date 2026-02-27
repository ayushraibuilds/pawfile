import React, { useState } from 'react';
import { Search, Bell, Settings, Plus, LogOut, Sun, Moon } from 'lucide-react';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out', error);
        }
    };

    // Extract initials if full_name is available, or fallback to first char of email
    const getInitials = () => {
        if (user?.user_metadata?.full_name) {
            const names = user.user_metadata.full_name.split(' ');
            return names.map(n => n[0]).join('').toUpperCase().substring(0, 2);
        }
        return user?.email?.charAt(0).toUpperCase() || '?';
    };

    return (
        <header className="navbar glass-panel">
            <div className="navbar-search">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search records, sitters, foods..." className="search-input" />
            </div>

            <div className="navbar-actions">
                <button className="btn-add" onClick={() => showToast("Quick log entry coming soon!", "info")}>
                    <Plus size={16} />
                    <span>New Entry</span>
                </button>

                <div className="action-icons">
                    <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
                        {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                    </button>
                    <button className="icon-btn" onClick={() => showToast("No new notifications.", "info")} title="Notifications">
                        <Bell size={20} />
                        <span className="badge">3</span>
                    </button>
                    <button className="icon-btn" onClick={() => showToast("Settings panel coming soon.", "info")} title="Settings">
                        <Settings size={20} />
                    </button>
                    <button className="icon-btn" onClick={handleSignOut} title="Sign Out">
                        <LogOut size={20} />
                    </button>
                </div>

                <div className="user-profile">
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--primary-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        {getInitials()}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
