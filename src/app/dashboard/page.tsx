'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  UserCircleIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon, // Added this line
  ShieldCheckIcon,
  LightBulbIcon,
  AcademicCapIcon,
  UserGroupIcon,
  PlayCircleIcon,
  ArrowRightIcon, // Added import
  MinusSmallIcon, // Added import
  LockClosedIcon  // Added import
} from '@heroicons/react/24/outline'; // Assuming these are from outline, adjust if solid or mini
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
  bgColor = 'bg-slate-800/60', // Slightly more transparent default
  textColor = 'text-slate-100' // Brighter default text
}) => {
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-slate-400';
  const displayValue = value !== null && value !== undefined ? value.toString() : (title.toLowerCase().includes('accuracy') ? '0%' : '0');

  return (
    <div className={`relative overflow-hidden group p-5 rounded-xl shadow-xl flex flex-col justify-between h-full ${bgColor} ${textColor} border border-slate-700/50 hover:border-electric-blue/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-electric-blue/20`}>
      {/* Subtle background pattern or glow effect */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        {/* Example: Diagonal lines pattern */}
        {/* <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="p" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M0 30L30 0ZM-5 5L5 -5ZM25 35L35 25" stroke="currentColor" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg> */}
      </div>
      <div className="relative z-10 flex justify-between items-start mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">{title}</h3>
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-electric-blue opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-3xl sm:text-4xl font-bold text-light-gradient mb-1 group-hover:text-white transition-colors">{displayValue}</p>
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
        
        // Update user name and potentially other static data from user object
        setUserData(prevData => ({
          ...prevData,
          name: displayName,
          // lessonsCompleted will be updated by the specific fetch or displayed directly from lessonsCompletedCount
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
            // Reset to mock or default if no data
            setUserData(prevData => ({
              ...prevData,
              wpm: mockUserData.wpm, // Or 0 or some placeholder
              accuracy: mockUserData.accuracy, // Or 0 or some placeholder
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
    <div className="min-h-screen bg-gradient-to-br from-dark-navy to-deep-space text-subtle-white p-4 sm:p-6 lg:p-8">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-electric-blue tracking-tight">
          Welcome back, <span className="text-light-gradient">{userData.name}</span>!
        </h1>
        <p className="text-md sm:text-lg text-slate-400 mt-2">Here's your typing performance overview.</p>
      </header>

      {/* Analytics Cards Section - Enhanced Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <AnalyticsCard title="Words Per Minute" value={userData.wpm} icon={ArrowTrendingUpIcon} trend="up" />
        <AnalyticsCard title="Accuracy" value={`${userData.accuracy}%`} icon={ShieldCheckIcon} trend="stable" />
        <AnalyticsCard title="Lessons Completed" value={lessonsCompletedCount} icon={AcademicCapIcon} trend="up" />
      </div>

      {/* Main Content Area - Chart and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Progress Chart (Quick Stats removed) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart */}
          <div className="glass-panel glowing-border-blue p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <ChartBarIcon className="h-6 w-6 mr-2 text-electric-blue" /> Your Progress Over Time
              </h2>
              <div className="flex space-x-1 sm:space-x-2 bg-dark-navy/50 p-1 rounded-md">
                {(['monthly', 'weekly', 'daily', 'hourly', 'minutely'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-md transition-all duration-200 font-medium 
                               ${timeFrame === tf ? 'bg-electric-blue text-white shadow-md' : 'bg-transparent text-slate-400 hover:bg-slate-700/70 hover:text-slate-200'}`}
                  >
                    {tf.charAt(0).toUpperCase() + tf.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className={hasNoData ? 'filter blur-sm pointer-events-none' : ''}>
                {/* Pass mockUserData.progressData if hasNoData is true and chart needs a specific structure, otherwise pass actual progressData or an empty array */}
                <FuturisticLineChart data={hasNoData ? mockUserData.progressData : progressData} className="mt-4" />
              </div>
              {hasNoData && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-navy/70 rounded-lg p-4 text-center">
                  <PlayCircleIcon className="h-16 w-16 text-electric-blue mb-4" />
                  <p className="text-xl font-semibold text-subtle-white mb-2">No Typing Data Yet!</p>
                  <p className="text-sm text-slate-300 mb-6">Complete a typing exercise to see your progress.</p>
                  <Link href="/typing-test/typing-exercise" legacyBehavior>
                    <a className="btn-secondary group inline-flex items-center">
                      <PlayCircleIcon className="h-5 w-5 mr-2 transition-transform duration-300 ease-in-out group-hover:scale-110" />
                      Start Exercise
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Leaderboard */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="glass-panel glowing-border-gold p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrophyIcon className="h-6 w-6 mr-2 text-yellow-400" /> Achievements
            </h2>
            <ul className="space-y-3">
              {userData.achievements.map(ach => (
                <li key={ach.id} className="flex items-center p-2 rounded-md hover:bg-slate-700/50 transition-colors">
                  <ach.icon className="h-7 w-7 text-yellow-500 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{ach.name}</p>
                    <p className="text-xs text-slate-400">{ach.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            {userData.achievements.length === 0 && <p className="text-slate-400 text-sm">Keep practicing to unlock achievements!</p>}
          </div>

          {/* Leaderboard */}
          <div className="glass-panel glowing-border-green p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <UserGroupIcon className="h-6 w-6 mr-2 text-green-400" /> Leaderboard
            </h2>
            <div className="relative filter blur-sm pointer-events-none">
              <ul className="space-y-2">
                {mockLeaderboard.slice(0, 5).map(user => (
                  <li key={user.rank} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${user.isCurrentUser ? 'bg-electric-blue/20 border border-electric-blue/50 shadow-md' : 'hover:bg-slate-700/60'}`}>
                    <div className="flex items-center">
                      <span className={`font-bold w-6 text-center text-sm ${user.rank <= 3 ? 'text-yellow-400' : 'text-slate-300'}`}>{user.rank}</span>
                      <UserCircleIcon className={`h-7 w-7 sm:h-8 sm:w-8 ml-2 mr-3 ${user.isCurrentUser ? 'text-electric-blue' : 'text-slate-500'}`} />
                      <span className={`text-sm sm:text-base ${user.isCurrentUser ? 'font-semibold text-subtle-white' : 'text-slate-200'}`}>{user.name}</span>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm sm:text-base ${user.isCurrentUser ? 'text-electric-blue' : 'text-subtle-white'}`}>{user.wpm} WPM</p>
                      <p className={`text-xs ${user.isCurrentUser ? 'text-electric-blue/80' : 'text-slate-400'}`}>{user.accuracy}% Acc</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/leaderboard" legacyBehavior>
                <a className="block text-center mt-4 text-sm text-electric-blue hover:text-violet font-medium">View Full Leaderboard &rarr;</a>
              </Link>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-lg">
              <p className="text-2xl font-bold text-subtle-white">Coming Soon!</p>
              <p className="text-md text-slate-300 mt-2">Paid Challenges up to $10,000</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 sm:mt-12 text-center">
        <Link href="/typing-test/typing-exercise" legacyBehavior>
            <a className="btn-primary group text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-3.5">
                Start New Typing Test
                <ArrowRightIcon className="h-5 w-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </a>
        </Link>
      </div>

    </div>
  );
}