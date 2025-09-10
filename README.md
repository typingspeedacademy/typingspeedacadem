# TypingSpeedAcademy

This is a Next.js application for TypingSpeedAcademy, a platform to help users learn to type faster.

## Features

- Free typing practice with difficulty levels (easy, medium, hard) and language selection (English, Spanish).
- Test modes: timed (60 seconds), fixed number of words (15), fixed number of letters (15).
- Calculates Words Per Minute (WPM) and accuracy.
- Paid courses section (coming soon) with a notification sign-up.
- User authentication (Login/Signup) 준비 완료 (Supabase integration).
- Review scroll on the homepage.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### 1. Clone the repository (or download the files)

```bash
# If you have git installed
# git clone <repository_url>
# cd typingspeedacademy
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary packages:

```bash
npm install
# or
yarn install
```

### 3. Set up Supabase

**For detailed setup instructions, see [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)**

Quick setup:
1.  Create a new Supabase project at [Supabase](https://supabase.com/)
2.  Run the SQL script from `supabase-setup.sql` in your Supabase SQL Editor
3.  Get your project credentials from **Project Settings** > **API**
4.  Update the `.env.local` file with your new credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

5.  Enable Email Authentication in **Authentication** > **Providers**

### 4. Run the Development Server

Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `src/app/`: Contains the main application pages and layouts (using Next.js App Router).
    -   `page.tsx`: Homepage.
    -   `layout.tsx`: Root layout.
    -   `globals.css`: Global styles.
    -   `free-trial/page.tsx`: Free typing practice page.
    -   `paid-courses/page.tsx`: Placeholder for paid courses.
    -   `login/page.tsx`: Login page.
    -   `signup/page.tsx`: Signup page.
-   `src/utils/supabase/`: Supabase client utilities.
    -   `client.ts`: Supabase browser client setup.
-   `public/`: Static assets.
-   `package.json`: Project dependencies and scripts.
-   `next.config.mjs`: Next.js configuration.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `tsconfig.json`: TypeScript configuration.

## Deployment

This application is set up to be easily deployable on platforms like Vercel (recommended for Next.js) or Render.

### Deploying on Render

1.  Push your code to a Git repository (e.g., GitHub, GitLab).
2.  Go to [Render](https://render.com/) and create a new **Web Service**.
3.  Connect your Git repository.
4.  Configure the build settings:
    *   **Environment**: Node
    *   **Build Command**: `npm run build` (or `yarn build`)
    *   **Start Command**: `npm run start` (or `yarn start`)
5.  Add your Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the **Environment** section of your Render service settings.
6.  Deploy the service.

## Key Features Implemented

*   **Homepage**: Welcomes users and provides navigation to free trials and paid courses.
*   **Free Trial Page**:
    *   Language selection (English, Spanish).
    *   Difficulty levels (Easy, Medium, Hard).
    *   Test modes (Time, Words, Letters) with 15 sentences per level.
    *   Real-time WPM and accuracy calculation (basic implementation).
    *   Input highlighting for correct/incorrect characters.
*   **Paid Courses Page**:
    *   Blurred content to signify it's a premium/upcoming feature.
    *   Email collection form to notify users upon launch.
    *   Priced at $1.99 (display only).
*   **Login/Signup Pages**:
    *   Forms for user authentication.
    *   Client-side integration with Supabase for `signInWithPassword` and `signUp`.
    *   Basic error handling and success messages.
*   **Review Scroll**: A horizontal scrolling section on the homepage for user testimonials.
*   **Styling**: Modern UI using Tailwind CSS.
*   **Supabase Integration**: Client-side setup for authentication.

## Further Development Ideas

-   Full backend integration for storing user progress, paid course subscriptions.
-   More sophisticated WPM/accuracy calculation.
-   User dashboard to track progress.
-   Admin panel for managing courses and users.
-   More languages and sentence packs.
-   Advanced typing exercises (e.g., code snippets, punctuation practice).
-   Gamification elements (badges, leaderboards).
-   Secure payment integration for paid courses.
-   Server-side rendering/fetching for some data where appropriate.
-   Middleware for protecting routes.
-   Email confirmation flow for signups.