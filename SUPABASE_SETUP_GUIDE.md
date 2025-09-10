# Supabase Setup Guide for TypingSpeedAcademy

This guide will help you set up a completely new Supabase project and connect it to your TypingSpeedAcademy application.

## Step 1: Create New Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create a new account
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `TypingSpeedAcademy` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your new Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Project API Keys** > **anon** **public** key (the long string)

## Step 3: Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Set Up Database Tables

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of the `supabase-setup.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the script

This will create all necessary tables:
- `user_typing_analytics` - Stores typing test results
- `user_completed_lessons` - Tracks completed exercises
- `email_subscriptions` - For paid course notifications
- `user_profiles` - Extended user information

## Step 5: Configure Authentication

1. Go to **Authentication** > **Providers**
2. Ensure **Email** provider is enabled
3. Configure email settings:
   - For development: You can disable "Confirm email" for easier testing
   - For production: Keep "Confirm email" enabled for security

### Email Templates (Optional)

1. Go to **Authentication** > **Email Templates**
2. Customize the email templates for:
   - Confirm signup
   - Reset password
   - Magic link

## Step 6: Set Up Row Level Security (RLS)

The SQL script automatically enables RLS and creates policies, but verify:

1. Go to **Authentication** > **Policies**
2. You should see policies for each table:
   - Users can only access their own data
   - Email subscriptions are publicly insertable

## Step 7: Test the Connection

1. Save all your changes
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Try to:
   - Sign up for a new account
   - Log in
   - Take a typing test
   - Check if data is saved in the Supabase dashboard

## Step 8: Verify Data in Supabase

1. Go to **Table Editor** in your Supabase dashboard
2. Check that data is being saved to:
   - `user_typing_analytics` (after taking typing tests)
   - `user_completed_lessons` (after completing exercises)
   - `user_profiles` (automatically created on signup)

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Double-check your environment variables
   - Make sure you're using the `anon` key, not the `service_role` key
   - Restart your development server after changing `.env.local`

2. **"Row Level Security" errors**:
   - Make sure RLS policies are properly set up
   - Check that users are authenticated before accessing data

3. **Email authentication not working**:
   - Check your email provider settings
   - Verify email templates are configured
   - Check spam folder for confirmation emails

4. **Database connection errors**:
   - Verify your project URL is correct
   - Check that your Supabase project is active
   - Ensure your database password is correct

### Useful Supabase Dashboard Sections:

- **Table Editor**: View and edit your data
- **SQL Editor**: Run custom queries
- **Authentication**: Manage users and auth settings
- **Logs**: Debug issues and monitor activity
- **Settings** > **API**: Get your credentials

## Security Best Practices

1. **Never commit your `.env.local` file** - It's already in `.gitignore`
2. **Use Row Level Security** - Already set up in the SQL script
3. **Validate data on the client side** - Your app already does this
4. **Use the `anon` key for client-side** - Never use `service_role` key in frontend
5. **Enable email confirmation** in production

## Next Steps

After setting up your new Supabase project:

1. **Test all features** thoroughly
2. **Backup your old data** if needed (export from old project, import to new)
3. **Update any deployment settings** (Netlify, Vercel, etc.) with new environment variables
4. **Monitor usage** in the Supabase dashboard

## Data Migration (If Needed)

If you need to migrate data from your old Supabase project:

1. Export data from old project using SQL queries
2. Clean and format the data as needed
3. Import into new project using SQL INSERT statements
4. Verify data integrity

---

**Important**: Keep your database password and API keys secure. Never share them publicly or commit them to version control.

Your TypingSpeedAcademy application should now be connected to your new Supabase project with a fresh, properly structured database!