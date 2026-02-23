import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layouts-wrapper">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="page-container" id="scrollable-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
