'use client';

import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Removed duplicate
import {
  ChartBarIcon,
  UserCircleIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  AcademicCapIcon,
  UserGroupIcon,
  PlayCircleIcon,
  ArrowRightIcon, 
  MinusSmallIcon, 
  LockClosedIcon,
  FireIcon, // Added FireIcon import
  ArchiveBoxXMarkIcon, // Added ArchiveBoxXMarkIcon import
} from '@heroicons/react/24/outline';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

// Mock data - replace with actual data fetching
const mockUserData = {
  name: 'Alex Mercer',
  wpm: 75,
  accuracy: 92,
  lessonsCompleted: 15,
  rank: 123,
  achievements: [
    { id: 1, name: 'Speed Demon', icon: ArrowTrendingUpIcon, description: 'Reached 70 WPM' },
    { id: 2, name: 'Accuracy Master', icon: ShieldCheckIcon, description: 'Achieved 90% accuracy' },
    { id: 3, name: 'Quick Learner', icon: LightBulbIcon, description: 'Completed 10 lessons' },
  ],
  progressData: [
    { date: 'Jan', wpm: 40, accuracy: 80 },
    { date: 'Feb', wpm: 45, accuracy: 82 },
    { date: 'Mar', wpm: 55, accuracy: 85 },
    { date: 'Apr', wpm: 60, accuracy: 88 },
    { date: 'May', wpm: 68, accuracy: 90 },
    { date: 'Jun', wpm: 75, accuracy: 92 },
  ],
};

const mockLeaderboard = [
  { rank: 1, name: 'CyberTypistX', wpm: 150, accuracy: 99 },
  { rank: 2, name: 'VelocityViper', wpm: 145, accuracy: 98 },
  { rank: 3, name: 'KeyNinja', wpm: 140, accuracy: 97 },
  { rank: 4, name: 'Alex Mercer', wpm: 75, accuracy: 92, isCurrentUser: true }, // Highlight current user
  { rank: 5, name: 'TypeMasterPro', wpm: 130, accuracy: 96 },
];

import FuturisticLineChart from '@/components/FuturisticLineChart';
import RechartsLineChart from '@/components/RechartsLineChart'; // Added new chart
// import { Button } from '@/components/ui/button'; // Removed this line to fix module not found error
import Link from 'next/link';

interface ProgressDataPoint {
  date: string; // This will be the formatted date string for the chart labels
  wpm: number;
  accuracy: number;
}

// Interface for the raw data fetched from Supabase and initially processed
interface RawProgressDataPoint {
  created_at_for_processing: string | Date; // Keep original for flexible processing
  wpm: number | any; // Allow 'any' temporarily for parsing, then ensure number
  accuracy: number | any; // Allow 'any' temporarily for parsing, then ensure number
}

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'stable';
  trendText?: string;
  bgColor?: string;
  textColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title,
  value,
  icon: Icon, 
  trend,
  trendText,
  bgColor = 'bg-white dark:bg-slate-800', // Light theme default, dark mode variant
  textColor = 'text-slate-700 dark:text-slate-200' // Text for light theme, dark mode variant
}) => {
  const trendColor = trend === 'up' ? 'text-emerald-500 dark:text-emerald-400' : trend === 'down' ? 'text-red-500 dark:text-red-400' : 'text-slate-500 dark:text-slate-400';
  const displayValue = value !== null && value !== undefined ? value.toString() : (title.toLowerCase().includes('accuracy') ? '0%' : '0');

  return (
    <div className={`relative overflow-hidden group p-5 rounded-xl shadow-lg flex flex-col justify-between h-full ${bgColor} ${textColor} border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-sky-500/20 dark:hover:shadow-sky-400/20`}>
      {/* Subtle background pattern or glow effect removed for cleaner light theme */}
      <div className="relative z-10 flex justify-between items-start mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</h3>
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-sky-500 dark:text-sky-400 opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">{displayValue}</p>
      {trend && (
        <div className={`flex items-center text-xs ${trendColor} mt-auto`}>
          {trend === 'up' && <ArrowTrendingUpIcon className="h-4 w-4 mr-1.5" />}
          {trend === 'down' && <ArrowTrendingDownIcon className="h-4 w-4 mr-1.5" />}
          {trend === 'stable' && <MinusSmallIcon className="h-4 w-4 mr-1.5" />}
          <span>{trendText || (trend === 'up' ? 'Trending Up' : trend === 'down' ? 'Trending Down' : 'Stable')}</span>
        </div>
      )}
    </div>
  );
};

export default function DashboardPage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  // Initialize userData with mockUserData which now has 0 for wpm/accuracy
  const [userData, setUserData] = useState(mockUserData); 
  const [progressData, setProgressData] = useState<ProgressDataPoint[]>([]);
  const [lessonsCompletedCount, setLessonsCompletedCount] = useState(0);
  const [hasNoData, setHasNoData] = useState(true);
  const [timeFrame, setTimeFrame] = useState<'monthly' | 'weekly' | 'daily' | 'hourly' | 'minutely'>('monthly');

  useEffect(() => {
    const getUserAndInitialData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        const displayName = currentUser.user_metadata?.username || 'User';
        // Fetch lessons completed count
        const { count, error: countError } = await supabase
          .from('user_completed_lessons')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id);

        if (countError) {
          console.error('Error fetching lessons completed count:', countError);
        } else {
          setLessonsCompletedCount(count || 0);
        }
        
        // Update user name AND RESET wpm/accuracy to 0, awaiting fetch
        setUserData(prevData => ({
          ...prevData, // Keep other mock data like achievements for now
          name: displayName,
          wpm: 0, // Reset, will be updated by fetchProgressData
          accuracy: 0, // Reset, will be updated by fetchProgressData
        }));
      } else {
        // Handle user not logged in - reset or show guest view
        setLessonsCompletedCount(0); // Reset count if no user
        setUserData(mockUserData); // Or some other default state for guests
      }
    };
    getUserAndInitialData();
  }, [supabase]);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (user) {
        console.log('Dashboard: Fetching data for user ID:', user.id);
        const { data, error } = await supabase
          .from('user_typing_analytics')
          .select('created_at, wpm, accuracy')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        console.log('Dashboard: Raw data from Supabase:', data);

        if (error) {
          console.error('Error fetching progress data:', error);
          // Keep mock data on error or set to empty array
          setProgressData(mockUserData.progressData);
          return;
        }

        if (data) {
          // Process data for the chart
          const processedData: RawProgressDataPoint[] = data.map(item => ({
            created_at_for_processing: item.created_at,
            wpm: Number(item.wpm) || 0, // Ensure wpm is a number, default to 0 if conversion fails
            accuracy: Number(item.accuracy) || 0, // Ensure accuracy is a number, default to 0 if conversion fails
          }));

          console.log('Dashboard: Processed data (after Number conversion):', processedData);
          console.log('Dashboard: Current timeFrame:', timeFrame);

          // Calculate analytics for the cards
          if (processedData.length > 0) {
            const latestEntry = processedData[processedData.length - 1];
            const totalAccuracy = processedData.reduce((sum, entry) => sum + Number(entry.accuracy), 0);
            const averageAccuracy = totalAccuracy / processedData.length;

            setUserData(prevData => ({
              ...prevData,
              wpm: latestEntry.wpm ? Number(latestEntry.wpm) : 0,
              accuracy: Math.round(averageAccuracy) || 0,
              // lessonsCompleted is now handled by lessonsCompletedCount state directly
            }));
          } else {
            // No actual analytics data for the user
            setUserData(prevData => ({
              ...prevData,
              wpm: 0,
              accuracy: 0,
              // lessonsCompleted is now handled by lessonsCompletedCount state directly
            }));
          }

          let chartData: ProgressDataPoint[] = [];

          if (timeFrame === 'monthly') {
            const monthlyData: { [key: string]: { wpm: number[], accuracy: number[], count: number } } = {};
            processedData.forEach(item => {
              const monthYear = new Date(item.created_at_for_processing).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              if (!monthlyData[monthYear]) {
                monthlyData[monthYear] = { wpm: [], accuracy: [], count: 0 };
              }
              monthlyData[monthYear].wpm.push(item.wpm);
              monthlyData[monthYear].accuracy.push(item.accuracy);
              monthlyData[monthYear].count++;
            });
            chartData = Object.keys(monthlyData).map(key => ({
              date: key,
              wpm: Math.round(monthlyData[key].wpm.reduce((a, b) => Number(a) + Number(b), 0) / monthlyData[key].count),
              accuracy: Math.round(monthlyData[key].accuracy.reduce((a, b) => Number(a) + Number(b), 0) / monthlyData[key].count),
            })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          } else if (timeFrame === 'weekly') {
            const weeklyData: { [key: string]: { wpm: number[], accuracy: number[], count: number } } = {};
            processedData.forEach(item => {
              const date = new Date(item.created_at_for_processing);
              const year = date.getFullYear();
              const week = Math.ceil((((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
              const weekYear = `Week ${week}, ${year}`;
              if (!weeklyData[weekYear]) {
                weeklyData[weekYear] = { wpm: [], accuracy: [], count: 0 };
              }
              weeklyData[weekYear].wpm.push(Number(item.wpm));
              weeklyData[weekYear].accuracy.push(Number(item.accuracy));
              weeklyData[weekYear].count++;
            });
            chartData = Object.keys(weeklyData).map(key => ({
              date: key,
              wpm: Math.round(weeklyData[key].wpm.reduce((a, b) => Number(a) + Number(b), 0) / weeklyData[key].count),
              accuracy: Math.round(weeklyData[key].accuracy.reduce((a, b) => Number(a) + Number(b), 0) / weeklyData[key].count),
            })).sort((a,b) => {
              const [weekA, yearA] = a.date.replace('Week ', '').split(', ');
              const [weekB, yearB] = b.date.replace('Week ', '').split(', ');
              if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
              return parseInt(weekA) - parseInt(weekB);
            });
          } else if (timeFrame === 'daily') {
            const dailyData: { [key: string]: { wpm: number[], accuracy: number[], count: number } } = {};
            processedData.forEach(item => {
              const dayMonthYear = new Date(item.created_at_for_processing).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
              if (!dailyData[dayMonthYear]) {
                dailyData[dayMonthYear] = { wpm: [], accuracy: [], count: 0 };
              }
              dailyData[dayMonthYear].wpm.push(item.wpm);
              dailyData[dayMonthYear].accuracy.push(item.accuracy);
              dailyData[dayMonthYear].count++;
            });
            chartData = Object.keys(dailyData).map(key => ({
              date: key,
              wpm: Math.round(dailyData[key].wpm.reduce((a, b) => Number(a) + Number(b), 0) / dailyData[key].count),
              accuracy: Math.round(dailyData[key].accuracy.reduce((a, b) => Number(a) + Number(b), 0) / dailyData[key].count),
            })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          } else if (timeFrame === 'hourly') {
            const hourlyData: { [key: string]: { wpm: number[], accuracy: number[], count: number } } = {};
            processedData.forEach(item => {
              const date = new Date(item.created_at_for_processing);
              const hourDayMonthYear = date.toLocaleDateString('en-US', { hour: 'numeric', day: 'numeric', month: 'short', year: 'numeric', hour12: true });
              if (!hourlyData[hourDayMonthYear]) {
                hourlyData[hourDayMonthYear] = { wpm: [], accuracy: [], count: 0 };
              }
              hourlyData[hourDayMonthYear].wpm.push(item.wpm);
              hourlyData[hourDayMonthYear].accuracy.push(item.accuracy);
              hourlyData[hourDayMonthYear].count++;
            });
            chartData = Object.keys(hourlyData).map(key => ({
              date: key,
              wpm: Math.round(hourlyData[key].wpm.reduce((a, b) => Number(a) + Number(b), 0) / hourlyData[key].count),
              accuracy: Math.round(hourlyData[key].accuracy.reduce((a, b) => Number(a) + Number(b), 0) / hourlyData[key].count),
            })).sort((a, b) => {
              // Robust date parsing for hourly data, handling AM/PM and various formats
              const parseDate = (dateStr: string) => {
                // Attempt to standardize the date string for parsing
                // Example: "1 AM, Aug 1, 2023" or "August 1, 2023, 1:00 AM"
                // This might need adjustment based on the exact format from toLocaleDateString
                const standardizedDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
                return new Date(standardizedDateStr);
              };
              return parseDate(a.date).getTime() - parseDate(b.date).getTime();
            });
          } else if (timeFrame === 'minutely') {
            // Minutely data might be too granular and lead to a very cluttered chart.
            // For now, let's keep it simple and show raw data points if 'minutely' is selected.
            // Or, we can average over, say, 5-minute intervals if needed.
            chartData = processedData.map(item => ({
                date: new Date(item.created_at_for_processing).toLocaleString('en-US', { minute: 'numeric', hour: 'numeric', day: 'numeric', month: 'short', year: 'numeric', hour12: true }),
                wpm: Number(item.wpm),
                accuracy: Number(item.accuracy)
            })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          }

          console.log('Dashboard: Final chartData for timeframe "' + timeFrame + '":', chartData);

          if (chartData && chartData.length > 0) {
            setProgressData(chartData);
            setHasNoData(false);
            console.log('Dashboard: Setting progressData (data available):', chartData, 'hasNoData: false');
          } else {
            // If no actual data, set progressData to an empty array or mock structure for the chart to render correctly if it expects data
            // For now, setting to empty and letting the conditional rendering handle the 'no data' state.
            setProgressData([]); 
            setHasNoData(true);
            console.log('Dashboard: Setting progressData (no data for timeframe or empty):', [], 'hasNoData: true');
          }
        } else {
          // Error or no data returned
          setProgressData([]);
          setHasNoData(true);
          console.log('Dashboard: Error fetching or no data returned, setting hasNoData: true');
        }
      }
    };

    if (user) { // Only fetch if user is available
      fetchProgressData();
    } else {
      // No user, so no data to fetch
      setProgressData([]);
      setHasNoData(true);
      console.log('Dashboard: No user, setting hasNoData: true');
    }
  }, [user, supabase, timeFrame]); // Rerun when user, supabase client, or timeFrame changes

  // In a real app, fetch user data: useEffect(() => { /* fetch logic */ }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-sky-800 p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-200">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500">{userData.name || 'User'}!</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">Here&apos;s your typing performance overview.</p>
      </header>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard 
          title="Words Per Minute"
          value={userData.wpm}
          icon={ChartBarIcon} 
          trend={userData.wpm > 60 ? "up" : userData.wpm > 40 ? "stable" : "down"} // Example trend logic
          trendText={userData.wpm > 60 ? "Trending Up" : userData.wpm > 40 ? "Stable" : "Needs Improvement"}
        />
        <AnalyticsCard 
          title="Accuracy"
          value={`${userData.accuracy}%`}
          icon={ShieldCheckIcon} 
          trend={userData.accuracy > 90 ? "up" : userData.accuracy > 80 ? "stable" : "down"}
          trendText={userData.accuracy > 90 ? "Excellent" : userData.accuracy > 80 ? "Good" : "Practice More"}
        />
        <AnalyticsCard 
          title="Lessons Completed"
          value={lessonsCompletedCount} 
          icon={AcademicCapIcon} 
          // trend="up" // Example, could be based on recent activity
          // trendText="Keep Going!"
        />
      </div>

      {/* Main Content Area: Progress Chart and Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Over Time Chart - Spans 2 columns on large screens */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Your Progress Over Time</h2>
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
              {['monthly', 'weekly', 'daily', 'hourly', 'minutely'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFrame(tf as typeof timeFrame)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                    ${timeFrame === tf 
                      ? 'bg-sky-500 text-white dark:bg-sky-600'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {hasNoData ? (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-100 dark:bg-slate-800 rounded-lg shadow">
              <ArchiveBoxXMarkIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 text-lg">No progress data available for this period.</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm">Try selecting a different time frame or complete some lessons.</p>
            </div>
          ) : (
            <RechartsLineChart data={progressData} className="h-[350px] sm:h-[400px] lg:h-[450px]" timeFrame={timeFrame} />
          )}
        </div>

        {/* Side Panel: Achievements & Leaderboard */}
        <div className="lg:col-span-1 space-y-6">
          {/* Achievements Card - remains unchanged */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
              <TrophyIcon className="h-6 w-6 mr-2 text-amber-500 dark:text-amber-400" /> Achievements
            </h2>
            <ul className="space-y-3">
              {userData.achievements.map((ach) => (
                <li key={ach.id} className="flex items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <ach.icon className="h-7 w-7 text-sky-500 dark:text-sky-400 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-slate-700 dark:text-slate-200">{ach.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{ach.description}</p>
                  </div>
                </li>
              ))}
              {userData.achievements.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">No achievements unlocked yet. Keep practicing!</p>
              )}
            </ul>
          </div>

          {/* Leaderboard Card - MODIFIED */}
          <div className="relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="blur-sm">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
                <UserGroupIcon className="h-6 w-6 mr-2 text-green-500 dark:text-green-400" /> Leaderboard
              </h2>
              <ul className="space-y-2">
                {mockLeaderboard.slice(0, 3).map((entry) => ( // Show fewer entries due to blur
                  <li 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors 
                      ${entry.isCurrentUser 
                        ? 'bg-sky-100 dark:bg-sky-700/50 border-l-4 border-sky-500 dark:border-sky-400'
                        : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    <div className="flex items-center">
                      <span className={`font-semibold text-sm w-6 text-center mr-2 ${entry.isCurrentUser ? 'text-sky-600 dark:text-sky-300' : 'text-slate-500 dark:text-slate-400'}`}>{entry.rank}</span>
                      <UserCircleIcon className={`h-7 w-7 mr-2 ${entry.isCurrentUser ? 'text-sky-500 dark:text-sky-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className={`text-sm font-medium ${entry.isCurrentUser ? 'text-sky-700 dark:text-sky-200' : 'text-slate-700 dark:text-slate-200'}`}>{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${entry.isCurrentUser ? 'text-sky-600 dark:text-sky-300' : 'text-slate-700 dark:text-slate-200'}`}>{entry.wpm} WPM</p>
                      <p className={`text-xs ${entry.isCurrentUser ? 'text-sky-500 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400'}`}>{entry.accuracy}% Acc</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-sm font-medium text-sky-600 dark:text-sky-400">
                View Full Leaderboard (Coming Soon)
              </div>
            </div>
            {/* Overlay for "Coming Soon" message */}
            <div className="absolute inset-0 bg-slate-800/70 dark:bg-slate-900/80 flex flex-col items-center justify-center p-6 rounded-xl text-center">
              <FireIcon className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">Paid Challenges Coming Soon!</h3>
              <p className="text-slate-200 dark:text-slate-300 mb-1">Compete for prizes up to</p>
              <p className="text-3xl font-extrabold text-amber-400 mb-4">$100,000!</p>
              <p className="text-slate-300 dark:text-slate-400 mb-6 text-sm">
                Sharpen your skills with our courses to get ready.
              </p>
              {/* Assuming Button component is globally available or imported from a different path that's correct */}
              {/* If Button is from a specific library like shadcn/ui, ensure it's correctly installed and imported */}
              {/* For now, we'll assume the <Button> usage below is correct or will be handled separately if it causes new errors */}
              <button 
                onClick={() => window.location.href='/paid-courses'} 
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center transition-colors"
              >
                Explore Paid Courses
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}