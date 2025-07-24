import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import type { LoginCredentials } from '../types/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated } = useAuth();
  const { themeColor } = useTheme();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const from = location.state?.from?.pathname || '/dashboard';

  if(isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }

  const gradientClasses = {
    blue: 'from-blue-600 to-purple-600',
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-orange-600',
    green: 'from-green-600 to-blue-600',
    orange: 'from-orange-600 to-red-600',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch {
      setError('Invalid credentials. Password must be at least 6 characters.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-8">
          <div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${gradientClasses[themeColor]} rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform`}>
                <span className="text-white font-bold text-xl">YQ</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">App</span>
            </div>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
              Sign in to access your dashboard
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-${themeColor}-500 focus:border-transparent transition-all`}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r ${gradientClasses[themeColor]} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="text-xs text-center text-gray-500 bg-gray-50 rounded-xl p-3">
              <p className="font-medium">Demo credentials</p>
              <p>Any email with password 6+ characters</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};