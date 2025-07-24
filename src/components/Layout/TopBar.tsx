import React, { useState } from 'react';
import { Menu, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { NotificationSystem } from '../NotificationSystem';
import { useTheme } from '../../hooks/useTheme';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { logout } = useAuth();
  const { themeColor } = useTheme();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1" />

        <NotificationSystem />

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="ml-3 cursor-pointer flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
          >
            <div className={`w-8 h-8 bg-gradient-to-br ${
              themeColor === 'blue' ? 'from-blue-500 to-purple-500' :
              themeColor === 'purple' ? 'from-purple-500 to-pink-500' :
              themeColor === 'pink' ? 'from-pink-500 to-orange-500' :
              themeColor === 'green' ? 'from-green-500 to-blue-500' :
              'from-orange-500 to-red-500'
            } rounded-full flex items-center justify-center text-white`}>
              <User size={16} />
            </div>
            <span className="text-sm font-medium hidden sm:block">User</span>
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    Account
                  </div>
                  <button
                    onClick={() => navigate('/settings')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};