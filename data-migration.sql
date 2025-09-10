-- Data Migration Script for TypingSpeedAcademy
-- Use this script to migrate data from your old Supabase project to the new one

-- IMPORTANT: Run this script in your OLD Supabase project first to export data,
-- then modify and run in your NEW Supabase project to import data

-- =====================================================
-- STEP 1: EXPORT DATA FROM OLD PROJECT
-- =====================================================
-- Run these queries in your OLD Supabase project's SQL Editor
-- Copy the results and save them for importing into the new project

-- Export user typing analytics
-- Copy the output of this query:
SELECT 
    user_id,
    wpm,
    accuracy,
    created_at,
    -- Add any other columns that exist in your old table
    'exported_data' as source
FROM user_typing_analytics
ORDER BY created_at;

-- Export user completed lessons
-- Copy the output of this query:
SELECT 
    user_id,
    lesson_id,
    completed_at,
    -- Add any other columns that exist in your old table
    'exported_data' as source
FROM user_completed_lessons
ORDER BY completed_at;

-- Export email subscriptions (if this table exists)
-- Copy the output of this query:
SELECT 
    email,
    created_at,
    -- Add any other columns that exist in your old table
    'exported_data' as source
FROM email_subscriptions
ORDER BY created_at;

-- =====================================================
-- STEP 2: IMPORT DATA INTO NEW PROJECT
-- =====================================================
-- Run these INSERT statements in your NEW Supabase project
-- Replace the sample data with your actual exported data

-- IMPORTANT: Make sure users exist in auth.users before importing their data
-- You may need to ask users to re-register, or manually create user accounts

-- Import user typing analytics
-- Replace the VALUES with your exported data
/*
INSERT INTO user_typing_analytics (user_id, wpm, accuracy, created_at)
VALUES 
    ('user-uuid-1', 65, 95.5, '2024-01-01 10:00:00+00'),
    ('user-uuid-2', 72, 98.2, '2024-01-02 11:00:00+00'),
    -- Add more rows as needed
    ('user-uuid-n', 80, 96.8, '2024-01-03 12:00:00+00');
*/

-- Import user completed lessons
-- Replace the VALUES with your exported data
/*
INSERT INTO user_completed_lessons (user_id, lesson_id, completed_at)
VALUES 
    ('user-uuid-1', 'The quick brown fox jumps over the lazy dog.', '2024-01-01 10:05:00+00'),
    ('user-uuid-2', 'Practice makes perfect.', '2024-01-02 11:05:00+00'),
    -- Add more rows as needed
    ('user-uuid-n', 'All that glitters is not gold.', '2024-01-03 12:05:00+00');
*/

-- Import email subscriptions
-- Replace the VALUES with your exported data
/*
INSERT INTO email_subscriptions (email, created_at)
VALUES 
    ('user1@example.com', '2024-01-01 09:00:00+00'),
    ('user2@example.com', '2024-01-02 10:00:00+00'),
    -- Add more rows as needed
    ('usern@example.com', '2024-01-03 11:00:00+00');
*/

-- =====================================================
-- STEP 3: VERIFY DATA MIGRATION
-- =====================================================
-- Run these queries in your NEW Supabase project to verify the migration

-- Check user typing analytics count
SELECT COUNT(*) as total_analytics_records FROM user_typing_analytics;

-- Check user completed lessons count
SELECT COUNT(*) as total_completed_lessons FROM user_completed_lessons;

-- Check email subscriptions count
SELECT COUNT(*) as total_email_subscriptions FROM email_subscriptions;

-- Check data integrity
SELECT 
    'user_typing_analytics' as table_name,
    COUNT(*) as record_count,
    MIN(created_at) as earliest_record,
    MAX(created_at) as latest_record
FROM user_typing_analytics
UNION ALL
SELECT 
    'user_completed_lessons' as table_name,
    COUNT(*) as record_count,
    MIN(completed_at) as earliest_record,
    MAX(completed_at) as latest_record
FROM user_completed_lessons
UNION ALL
SELECT 
    'email_subscriptions' as table_name,
    COUNT(*) as record_count,
    MIN(created_at) as earliest_record,
    MAX(created_at) as latest_record
FROM email_subscriptions;

-- =====================================================
-- MIGRATION NOTES
-- =====================================================
/*

1. USER ACCOUNTS:
   - Users will need to re-register in the new project
   - OR you can manually create accounts and then import data
   - Make sure user_id UUIDs match between old and new projects

2. DATA VALIDATION:
   - Check that all foreign key relationships are valid
   - Verify that user_ids exist in auth.users before importing
   - Test a few records manually before bulk import

3. BACKUP:
   - Always backup your new project before running imports
   - Test the migration with a small dataset first

4. ALTERNATIVE APPROACH:
   - Consider using Supabase's built-in backup/restore features
   - Or use pg_dump/pg_restore for larger datasets

5. POST-MIGRATION:
   - Update user_profiles table with correct statistics
   - Run the update_user_stats() function for all users
   - Test all application features thoroughly

*/

-- Update user profiles after migration (run this after importing data)
/*
UPDATE user_profiles 
SET 
    total_tests_taken = (
        SELECT COUNT(*) 
        FROM user_typing_analytics 
        WHERE user_id = user_profiles.id
    ),
    best_wpm = (
        SELECT MAX(wpm) 
        FROM user_typing_analytics 
        WHERE user_id = user_profiles.id
    ),
    best_accuracy = (
        SELECT MAX(accuracy) 
        FROM user_typing_analytics 
        WHERE user_id = user_profiles.id
    ),
    updated_at = NOW()
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM user_typing_analytics
);
*/