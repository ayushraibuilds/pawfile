-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Pets Table
CREATE TABLE public.pets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    weight_kg NUMERIC,
    blood_type TEXT,
    allergies TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Health Records Table
CREATE TABLE public.health_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE,
    record_type TEXT NOT NULL, -- e.g., 'vaccine', 'vet_visit', 'prescription'
    title TEXT NOT NULL,
    date DATE NOT NULL,
    notes TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reminders Table
CREATE TABLE public.reminders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Health', 'Grooming', 'Medication'
    due_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Policies for Pets Table
-- Users can only view, insert, update, and delete their own pets
CREATE POLICY "Users can view own pets" ON public.pets FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Users can insert own pets" ON public.pets FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own pets" ON public.pets FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own pets" ON public.pets FOR DELETE USING (auth.uid() = owner_id);

-- Policies for Health Records
-- Users can manage health records for pets they own
CREATE POLICY "Users can manage health records for own pets" ON public.health_records 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = health_records.pet_id
            AND pets.owner_id = auth.uid()
        )
    );

-- Policies for Reminders
-- Users can manage reminders for pets they own
CREATE POLICY "Users can manage reminders for own pets" ON public.reminders 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pets
            WHERE pets.id = reminders.pet_id
            AND pets.owner_id = auth.uid()
        )
    );
