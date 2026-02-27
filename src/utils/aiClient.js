import { supabase } from '../config/supabase';

export const analyzeSymptoms = async (petContext, symptoms) => {
    const { breed, age, weight_kg } = petContext;

    try {
        const { data, error } = await supabase.functions.invoke('breed-genius', {
            body: {
                symptoms,
                breed: breed || 'Unknown',
                age: age || 'Unknown',
                weight: weight_kg || 'Unknown'
            },
        });

        if (error) {
            throw new Error(error.message || 'Failed to analyze symptoms');
        }

        if (data && data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        console.error("AI Analysis Error:", err);
        throw err;
    }
};
