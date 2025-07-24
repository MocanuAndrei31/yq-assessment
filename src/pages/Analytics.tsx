import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock } from 'lucide-react';
import { fetchDashboardData } from '../services/api';
import type {DashboardData} from '../services/api';
import { useTheme } from '../hooks/useTheme';

export const Analytics: React.FC = () => {
  const { themeColor } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return <div>Failed to load data</div>;
  }

  const activeUsersData = data.activeUsers.map(item => ({
    date: new Date(item.timeBucket).toLocaleDateString(),
    users: item.value
  }));

  const waitTimeData = data.sectionData.map(section => ({
    location: section.locationName,
    waitTime: section.metrics.waitTimeSeconds
  }));

  const utilizationData = data.sectionData.map(section => ({
    location: section.locationName,
    utilization: section.metrics.workForceUtilization.total
  }));

  const gradientClasses = {
    blue: 'from-blue-600 to-purple-600',
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-orange-600',
    green: 'from-green-600 to-blue-600',
    orange: 'from-orange-600 to-red-600',
  };

  const chartColors = {
    blue: '#2563eb',
    purple: '#9333ea',
    pink: '#ec4899',
    green: '#10b981',
    orange: '#f97316',
  };

  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${gradientClasses[themeColor]} rounded-2xl p-8 text-white`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-white/80">Store metrics and performance data</p>
          </div>
          
          <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === 'daily' 
                  ? 'bg-white text-gray-900 shadow-md' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === 'weekly' 
                  ? 'bg-white text-gray-900 shadow-md' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeframe === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-md' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Active Users</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activeUsersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke={chartColors[themeColor]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Average Wait Time by Location</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waitTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `${value}s`} />
              <Legend />
              <Bar dataKey="waitTime" fill={chartColors[themeColor]} name="Wait Time (seconds)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Workforce Utilization by Location</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="utilization" fill={chartColors[themeColor]} name="Utilization %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {data.activeUsers.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-2 font-medium">Total Active Users</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              {Math.round(waitTimeData.reduce((sum, item) => sum + item.waitTime, 0) / waitTimeData.length)}s
            </div>
            <div className="text-sm text-gray-600 mt-2 font-medium">Average Wait Time</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              {Math.round(utilizationData.reduce((sum, item) => sum + item.utilization, 0) / utilizationData.length)}%
            </div>
            <div className="text-sm text-gray-600 mt-2 font-medium">Average Utilization</div>
          </div>
        </div>
      </div>
    </div>
  );
};