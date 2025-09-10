-- TypingSpeedAcademy Database Setup Script
-- Run this script in your new Supabase project's SQL Editor

-- Enable Row Level Security (RLS) for all tables
-- This ensures users can only access their own data

-- 1. User Typing Analytics Table
-- Stores WPM and accuracy data for each typing session
CREATE TABLE IF NOT EXISTS user_typing_analytics (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wpm INTEGER NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    test_duration INTEGER, -- in seconds
    test_type VARCHAR(50), -- 'timed', 'word_count', 'letter_count'
    test_language VARCHAR(20) DEFAULT 'english',
    difficulty_level VARCHAR(20), -- 'easy', 'medium', 'hard'
    errors_count INTEGER DEFAULT 0,
    chars_typed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on user_typing_analytics
ALTER TABLE user_typing_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own analytics
CREATE POLICY "Users can view own analytics" ON user_typing_analytics
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own analytics
CREATE POLICY "Users can insert own analytics" ON user_typing_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own analytics
CREATE POLICY "Users can update own analytics" ON user_typing_analytics
    FOR UPDATE USING (auth.uid() = user_id);

-- 2. User Completed Lessons Table
-- Tracks which lessons/exercises users have completed
CREATE TABLE IF NOT EXISTS user_completed_lessons (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL, -- Can be sentence text or lesson identifier
    lesson_type VARCHAR(50), -- 'sentence', 'paragraph', 'custom'
    difficulty_level VARCHAR(20), -- 'easy', 'medium', 'hard'
    language VARCHAR(20) DEFAULT 'english',
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, lesson_id) -- Prevent duplicate completions
);

-- Enable RLS on user_completed_lessons
ALTER TABLE user_completed_lessons ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own completed lessons
CREATE POLICY "Users can view own completed lessons" ON user_completed_lessons
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own completed lessons
CREATE POLICY "Users can insert own completed lessons" ON user_completed_lessons
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Email Subscriptions Table
-- For paid courses notification signups
CREATE TABLE IF NOT EXISTS email_subscriptions (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscription_type VARCHAR(50) DEFAULT 'paid_courses',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on email_subscriptions (public table, no user-specific access needed)
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert email subscriptions
CREATE POLICY "Anyone can subscribe" ON email_subscriptions
    FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users can view subscriptions (for admin purposes)
CREATE POLICY "Authenticated users can view subscriptions" ON email_subscriptions
    FOR SELECT USING (auth.role() = 'authenticated');

-- 4. User Profiles Table (Optional - for extended user information)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    display_name VARCHAR(100),
    avatar_url TEXT,
    preferred_language VARCHAR(20) DEFAULT 'english',
    preferred_difficulty VARCHAR(20) DEFAULT 'medium',
    total_tests_taken INTEGER DEFAULT 0,
    best_wpm INTEGER DEFAULT 0,
    best_accuracy DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_typing_analytics_user_id ON user_typing_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_typing_analytics_created_at ON user_typing_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_user_completed_lessons_user_id ON user_completed_lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_user_completed_lessons_completed_at ON user_completed_lessons(completed_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);

-- 6. Create a function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, display_name, created_at, updated_at)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name', NOW(), NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger to automatically create profile for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create a function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user profile with latest stats
    UPDATE user_profiles 
    SET 
        total_tests_taken = (
            SELECT COUNT(*) 
            FROM user_typing_analytics 
            WHERE user_id = NEW.user_id
        ),
        best_wpm = GREATEST(
            COALESCE(best_wpm, 0), 
            NEW.wpm
        ),
        best_accuracy = GREATEST(
            COALESCE(best_accuracy, 0), 
            NEW.accuracy
        ),
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create trigger to update user stats when new analytics are added
DROP TRIGGER IF EXISTS on_analytics_inserted ON user_typing_analytics;
CREATE TRIGGER on_analytics_inserted
    AFTER INSERT ON user_typing_analytics
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- 10. Insert some sample data (optional - remove if not needed)
-- This is just for testing purposes
/*
INSERT INTO email_subscriptions (email, subscription_type) VALUES 
('test@example.com', 'paid_courses'),
('demo@example.com', 'paid_courses');
*/

-- Setup complete!
-- Don't forget to:
-- 1. Enable Email authentication in Supabase Auth settings
-- 2. Configure your email templates
-- 3. Set up your environment variables in your application
-- 4. Test the connection with your application