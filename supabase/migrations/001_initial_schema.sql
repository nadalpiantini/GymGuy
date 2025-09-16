-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_plan AS ENUM ('free', 'premium');
CREATE TYPE program_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE program_type AS ENUM ('strength', 'cardio', 'hiit', 'mobility', 'hybrid');
CREATE TYPE program_status AS ENUM ('active', 'completed', 'paused', 'cancelled');
CREATE TYPE session_status AS ENUM ('pending', 'completed', 'skipped');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'cancelled', 'refunded');
CREATE TYPE leaderboard_period AS ENUM ('all_time', 'month', 'week');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.gymguy_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    locale TEXT DEFAULT 'en',
    units TEXT DEFAULT 'metric', -- 'metric' or 'imperial'
    plan user_plan DEFAULT 'free',
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Equipment table
CREATE TABLE public.gymguy_equipment (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Muscles table
CREATE TABLE public.gymguy_muscles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises table
CREATE TABLE public.gymguy_exercises (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    cues TEXT[],
    difficulty TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
    equipment_required INTEGER[] DEFAULT '{}', -- Array of equipment IDs
    primary_muscles INTEGER[] DEFAULT '{}', -- Array of muscle IDs
    secondary_muscles INTEGER[] DEFAULT '{}', -- Array of muscle IDs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workouts table
CREATE TABLE public.gymguy_workouts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.gymguy_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workout items table
CREATE TABLE public.gymguy_workout_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    workout_id UUID REFERENCES public.gymguy_workouts(id) ON DELETE CASCADE NOT NULL,
    exercise_id INTEGER REFERENCES public.gymguy_exercises(id) ON DELETE CASCADE NOT NULL,
    sets INTEGER NOT NULL DEFAULT 1,
    reps INTEGER,
    weight DECIMAL(5,2),
    tempo TEXT, -- e.g., "3-1-2-1"
    rest_seconds INTEGER DEFAULT 60,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs table
CREATE TABLE public.gymguy_programs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    level program_level NOT NULL,
    type program_type NOT NULL,
    duration_weeks INTEGER NOT NULL,
    frequency_per_week INTEGER NOT NULL,
    session_duration_minutes INTEGER,
    equipment_required INTEGER[] DEFAULT '{}',
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Program sessions table
CREATE TABLE public.gymguy_program_sessions (
    id SERIAL PRIMARY KEY,
    program_id INTEGER REFERENCES public.gymguy_programs(id) ON DELETE CASCADE NOT NULL,
    week INTEGER NOT NULL,
    day INTEGER NOT NULL, -- 1-7 (Monday-Sunday)
    name TEXT,
    blocks JSONB NOT NULL, -- Array of workout blocks with exercises
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User programs table (enrollment)
CREATE TABLE public.gymguy_user_programs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.gymguy_profiles(id) ON DELETE CASCADE NOT NULL,
    program_id INTEGER REFERENCES public.gymguy_programs(id) ON DELETE CASCADE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status program_status DEFAULT 'active',
    current_week INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, program_id)
);

-- Session logs table
CREATE TABLE public.gymguy_session_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.gymguy_profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    workout_id UUID REFERENCES public.gymguy_workouts(id) ON DELETE SET NULL,
    program_session_id INTEGER REFERENCES public.gymguy_program_sessions(id) ON DELETE SET NULL,
    duration_minutes INTEGER,
    total_volume DECIMAL(10,2), -- weight * reps * sets
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Body weight logs table
CREATE TABLE public.gymguy_bodyweight_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.gymguy_profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    weight_kg DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Payments table
CREATE TABLE public.gymguy_payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.gymguy_profiles(id) ON DELETE CASCADE NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan user_plan NOT NULL,
    status payment_status NOT NULL,
    amount DECIMAL(10,2),
    currency TEXT DEFAULT 'usd',
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leaderboard snapshots table
CREATE TABLE public.gymguy_leaderboard_snapshots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    period leaderboard_period NOT NULL,
    scope TEXT NOT NULL, -- 'workouts', 'volume', 'streak'
    ranks JSONB NOT NULL, -- Array of user rankings
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Internationalization table
CREATE TABLE public.gymguy_translations (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL,
    locale TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(key, locale)
);

-- Create indexes for better performance
CREATE INDEX idx_workouts_user_id ON public.gymguy_workouts(user_id);
CREATE INDEX idx_workout_items_workout_id ON public.gymguy_workout_items(workout_id);
CREATE INDEX idx_workout_items_exercise_id ON public.gymguy_workout_items(exercise_id);
CREATE INDEX idx_session_logs_user_id ON public.gymguy_session_logs(user_id);
CREATE INDEX idx_session_logs_date ON public.gymguy_session_logs(date);
CREATE INDEX idx_bodyweight_logs_user_id ON public.gymguy_bodyweight_logs(user_id);
CREATE INDEX idx_bodyweight_logs_date ON public.gymguy_bodyweight_logs(date);
CREATE INDEX idx_user_programs_user_id ON public.gymguy_user_programs(user_id);
CREATE INDEX idx_user_programs_program_id ON public.gymguy_user_programs(program_id);
CREATE INDEX idx_program_sessions_program_id ON public.gymguy_program_sessions(program_id);
CREATE INDEX idx_payments_user_id ON public.gymguy_payments(user_id);
CREATE INDEX idx_payments_stripe_subscription_id ON public.gymguy_payments(stripe_subscription_id);
CREATE INDEX idx_translations_key_locale ON public.gymguy_translations(key, locale);

-- Row Level Security (RLS) policies
ALTER TABLE public.gymguy_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gymguy_workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gymguy_workout_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gymguy_user_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gymguy_session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gymguy_bodyweight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gymguy_payments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.gymguy_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.gymguy_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.gymguy_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Workouts policies
CREATE POLICY "Users can view own workouts" ON public.gymguy_workouts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workouts" ON public.gymguy_workouts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workouts" ON public.gymguy_workouts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workouts" ON public.gymguy_workouts
    FOR DELETE USING (auth.uid() = user_id);

-- Workout items policies
CREATE POLICY "Users can view own workout items" ON public.gymguy_workout_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.gymguy_workouts 
            WHERE id = workout_items.workout_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own workout items" ON public.gymguy_workout_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.gymguy_workouts 
            WHERE id = workout_items.workout_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own workout items" ON public.gymguy_workout_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.gymguy_workouts 
            WHERE id = workout_items.workout_id 
            AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own workout items" ON public.gymguy_workout_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.gymguy_workouts 
            WHERE id = workout_items.workout_id 
            AND user_id = auth.uid()
        )
    );

-- User programs policies
CREATE POLICY "Users can view own programs" ON public.gymguy_user_programs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own programs" ON public.gymguy_user_programs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own programs" ON public.gymguy_user_programs
    FOR UPDATE USING (auth.uid() = user_id);

-- Session logs policies
CREATE POLICY "Users can view own session logs" ON public.gymguy_session_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own session logs" ON public.gymguy_session_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own session logs" ON public.gymguy_session_logs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own session logs" ON public.gymguy_session_logs
    FOR DELETE USING (auth.uid() = user_id);

-- Body weight logs policies
CREATE POLICY "Users can view own bodyweight logs" ON public.gymguy_bodyweight_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bodyweight logs" ON public.gymguy_bodyweight_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bodyweight logs" ON public.gymguy_bodyweight_logs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bodyweight logs" ON public.gymguy_bodyweight_logs
    FOR DELETE USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments" ON public.gymguy_payments
    FOR SELECT USING (auth.uid() = user_id);

-- Public read access for equipment, muscles, exercises, programs, program_sessions, translations
CREATE POLICY "Anyone can view equipment" ON public.gymguy_equipment FOR SELECT USING (true);
CREATE POLICY "Anyone can view muscles" ON public.gymguy_muscles FOR SELECT USING (true);
CREATE POLICY "Anyone can view exercises" ON public.gymguy_exercises FOR SELECT USING (true);
CREATE POLICY "Anyone can view programs" ON public.gymguy_programs FOR SELECT USING (true);
CREATE POLICY "Anyone can view program sessions" ON public.gymguy_program_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can view translations" ON public.gymguy_translations FOR SELECT USING (true);
CREATE POLICY "Anyone can view leaderboard snapshots" ON public.gymguy_leaderboard_snapshots FOR SELECT USING (true);

-- Functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.gymguy_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON public.gymguy_exercises
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON public.gymguy_workouts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.gymguy_programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_programs_updated_at BEFORE UPDATE ON public.gymguy_user_programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.gymguy_payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
