import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    HeartPulse,
    Bell,
    Bone,
    MapPin,
    ShieldAlert,
    Camera,
    Users,
    Cloud,
    Brain
} from 'lucide-react';
import './Sidebar.css';
import { usePets } from '../context/PetContext';

const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/health', label: 'Health Vault', icon: HeartPulse },
    { path: '/dashboard/breed-genius', label: 'Breed Genius', icon: Brain },
    { path: '/dashboard/reminders', label: 'Smart Reminders', icon: Bell },
    { path: '/dashboard/food', label: 'Food Brain', icon: Bone },
    { path: '/dashboard/map', label: 'Pet Map', icon: MapPin },
    { path: '/dashboard/emergency', label: 'Emergency Card', icon: ShieldAlert },
    { path: '/dashboard/pawfolio', label: 'Pawfolio', icon: Camera },
    { path: '/dashboard/sitters', label: 'Pet Sitter Network', icon: Users },
    { path: '/dashboard/rainbow-bridge', label: 'Rainbow Bridge', icon: Cloud },
];

const Sidebar = () => {
    const { activePet } = usePets();

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">🐾</span>
                    <h1 className="text-gradient">PAWFILE</h1>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            end={item.path === '/dashboard'}
                        >
                            <Icon size={20} className="nav-icon" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="pet-selector">
                    {activePet ? (
                        <>
                            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Pet Avatar" className="pet-avatar" />
                            <div className="pet-info">
                                <span className="pet-name">{activePet.name}</span>
                                <span className="pet-breed">{activePet.breed || 'Unknown Breed'}</span>
                            </div>
                        </>
                    ) : (
                        <div className="pet-info">
                            <span className="pet-name">No Pet Selected</span>
                            <span className="pet-breed">Add a pet to start</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
