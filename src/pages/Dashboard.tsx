import React, { useEffect, useState } from 'react';
import { Users, Clock, Activity, BarChart3, Table, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchDashboardData } from '../services/api';
import type { DashboardData } from '../services/api';
import { useTheme } from '../hooks/useTheme';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { themeColor } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
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
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const totalUsers = data.activeUsers.reduce((sum, item) => sum + item.value, 0);
  const avgWaitTime = Math.round(
    data.sectionData.reduce((sum, section) => sum + section.metrics.waitTimeSeconds, 0) / data.sectionData.length
  );
  const avgUtilization = Math.round(
    data.sectionData.reduce((sum, section) => sum + section.metrics.workForceUtilization.total, 0) / data.sectionData.length
  );

  const stats = [
    { label: 'Total Active Users', value: totalUsers.toLocaleString(), icon: Users },
    { label: 'Avg. Wait Time', value: `${avgWaitTime}s`, icon: Clock },
    { label: 'Avg. Utilization', value: `${avgUtilization}%`, icon: Activity },
  ];

  const gradientClasses = {
    blue: 'from-blue-600 to-purple-600',
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-orange-600',
    green: 'from-green-600 to-blue-600',
    orange: 'from-orange-600 to-red-600',
  };

  const iconGradients = {
    blue: ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-green-500 to-green-600'],
    purple: ['from-purple-500 to-purple-600', 'from-pink-500 to-pink-600', 'from-indigo-500 to-indigo-600'],
    pink: ['from-pink-500 to-pink-600', 'from-orange-500 to-orange-600', 'from-rose-500 to-rose-600'],
    green: ['from-green-500 to-green-600', 'from-blue-500 to-blue-600', 'from-teal-500 to-teal-600'],
    orange: ['from-orange-500 to-orange-600', 'from-red-500 to-red-600', 'from-yellow-500 to-yellow-600'],
  };

  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${gradientClasses[themeColor]} rounded-2xl p-8 text-white`}>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-white/80">Here's your dashboard overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon }, index) => {
          return (
            <div key={label} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 p-6">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className={`p-3 bg-gradient-to-br ${iconGradients[themeColor][index]} rounded-xl shadow-md mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/analytics')}
            className="cursor-pointer group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-center md:text-left bg-gradient-to-br from-gray-50 to-white"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto md:mx-0">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
            <p className="text-sm text-gray-500">View trends and performance data</p>
          </button>
          <button 
            onClick={() => navigate('/data-table')}
            className="cursor-pointer group p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all text-center md:text-left bg-gradient-to-br from-gray-50 to-white"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto md:mx-0">
              <Table className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Data Tables</h3>
            <p className="text-sm text-gray-500">Explore your store data</p>
          </button>
          <button className="cursor-pointer group p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all text-center md:text-left bg-gradient-to-br from-gray-50 to-white">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto md:mx-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Export Report</h3>
            <p className="text-sm text-gray-500">Export your data</p>
          </button>
        </div>
      </div>
    </div>
  );
};