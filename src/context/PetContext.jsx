import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from './AuthContext';

const PetContext = createContext();

export const usePets = () => {
    return useContext(PetContext);
};

export const PetProvider = ({ children }) => {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [activePet, setActivePet] = useState(null);
    const [loadingPets, setLoadingPets] = useState(true);

    const fetchPets = async () => {
        if (!user) {
            setPets([]);
            setActivePet(null);
            setLoadingPets(false);
            return;
        }

        setLoadingPets(true);
        try {
            const { data, error } = await supabase
                .from('pets')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            setPets(data || []);
            // If we fetch pets and we don't have an active pet, set the first one as active
            if (data && data.length > 0 && !activePet) {
                setActivePet(data[0]);
            } else if (data && data.length === 0) {
                setActivePet(null);
            }
        } catch (error) {
            console.error('Error fetching pets:', error.message);
        } finally {
            setLoadingPets(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, [user]);

    const addPet = async (petData) => {
        try {
            const { data, error } = await supabase
                .from('pets')
                .insert([{ ...petData, owner_id: user.id }])
                .select()
                .single();

            if (error) throw error;

            setPets(prev => [...prev, data]);
            if (!activePet) {
                setActivePet(data);
            }
            return data;
        } catch (error) {
            console.error('Error adding pet:', error.message);
            throw error;
        }
    };

    const value = {
        pets,
        activePet,
        setActivePet,
        loadingPets,
        refreshPets: fetchPets,
        addPet
    };

    return (
        <PetContext.Provider value={value}>
            {children}
        </PetContext.Provider>
    );
};
