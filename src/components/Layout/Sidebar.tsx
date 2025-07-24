import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart3, Table, Settings, X, ChevronLeft } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLayout } from '../../hooks/useLayout';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { themeColor } = useTheme();
  const { isCollapsed, setIsCollapsed } = useLayout();
  
  const gradientClasses = {
    blue: 'from-blue-600 to-purple-600',
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-orange-600',
    green: 'from-green-600 to-blue-600',
    orange: 'from-orange-600 to-red-600',
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/data-table', label: 'Data Table', icon: Table },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={onClose}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 z-40 h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-xl transform transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className={`w-10 h-10 bg-gradient-to-br ${gradientClasses[themeColor]} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-white font-bold text-lg">YQ</span>
            </div>
            {!isCollapsed && <span className="text-xl font-semibold text-gray-900">App</span>}
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="cursor-pointer hidden lg:block p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => {
                const activeClasses = {
                  blue: 'from-blue-50 to-purple-50 text-blue-700 border-blue-100',
                  purple: 'from-purple-50 to-pink-50 text-purple-700 border-purple-100',
                  pink: 'from-pink-50 to-orange-50 text-pink-700 border-pink-100',
                  green: 'from-green-50 to-blue-50 text-green-700 border-green-100',
                  orange: 'from-orange-50 to-red-50 text-orange-700 border-orange-100',
                };
                
                return `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${activeClasses[themeColor]} shadow-sm border font-medium`
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }}
              onClick={() => onClose()}
              title={isCollapsed ? label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span>{label}</span>}
            </NavLink>
          ))}
          
          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="cursor-pointer hidden lg:flex w-full items-center justify-center px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
              title="Expand sidebar"
            >
              <ChevronLeft size={20} className="rotate-180" />
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};