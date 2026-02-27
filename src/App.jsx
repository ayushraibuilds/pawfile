import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import HealthVault from './pages/HealthVault';
import SmartReminders from './pages/SmartReminders';
import FoodBrain from './pages/FoodBrain';
import PetMap from './pages/PetMap';
import EmergencyCard from './pages/EmergencyCard';
import Pawfolio from './pages/Pawfolio';
import PetSitter from './pages/PetSitter';
import RainbowBridge from './pages/RainbowBridge';
import BreedGenius from './pages/BreedGenius';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';
import { PetProvider } from './context/PetContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

// All pages implemented

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <PetProvider>
                      <Layout />
                    </PetProvider>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="health" element={<HealthVault />} />
                <Route path="breed-genius" element={<BreedGenius />} />
                <Route path="reminders" element={<SmartReminders />} />
                <Route path="food" element={<FoodBrain />} />
                <Route path="map" element={<PetMap />} />
                <Route path="emergency" element={<EmergencyCard />} />
                <Route path="pawfolio" element={<Pawfolio />} />
                <Route path="sitters" element={<PetSitter />} />
                <Route path="rainbow-bridge" element={<RainbowBridge />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
