import React, { useState } from 'react';
import { Bell, Palette, Save } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { ThemeColor } from '../contexts/ThemeContextDefinition';

export const Settings: React.FC = () => {
  const { themeColor, setThemeColor } = useTheme();
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem('notifications') !== 'false';
  });
  const [saved, setSaved] = useState(false);

  const handleNotificationToggle = (enabled: boolean) => {
    setNotifications(enabled);
    localStorage.setItem('notifications', enabled.toString());
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={`bg-gradient-to-r ${
        themeColor === 'blue' ? 'from-blue-600 to-purple-600' :
        themeColor === 'purple' ? 'from-purple-600 to-pink-600' :
        themeColor === 'pink' ? 'from-pink-600 to-orange-600' :
        themeColor === 'green' ? 'from-green-600 to-blue-600' :
        'from-orange-600 to-red-600'
      } rounded-2xl p-8 text-white transition-all duration-500`}>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-white/80">Make the dashboard work for you</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500 mt-1">Choose how you want to be notified</p>
        </div>
        
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Dashboard Notifications</h3>
              <p className="text-sm text-gray-500">Get updates while you work</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={notifications}
              onChange={(e) => handleNotificationToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          <p className="text-sm text-gray-500 mt-1">Pick your favorite colors</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-50 rounded-lg">
              <Palette className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Theme Color</h3>
              <p className="text-sm text-gray-500">Choose your accent color</p>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { name: 'blue', class: 'bg-gradient-to-br from-blue-500 to-purple-500' },
              { name: 'purple', class: 'bg-gradient-to-br from-purple-500 to-pink-500' },
              { name: 'pink', class: 'bg-gradient-to-br from-pink-500 to-orange-500' },
              { name: 'green', class: 'bg-gradient-to-br from-green-500 to-blue-500' },
              { name: 'orange', class: 'bg-gradient-to-br from-orange-500 to-red-500' }
            ].map((color) => (
              <button
                key={color.name}
                onClick={() => setThemeColor(color.name as ThemeColor)}
                className={`w-12 h-12 rounded-xl ${color.class} hover:scale-110 transition-transform ${
                  themeColor === color.name ? 'ring-4 ring-offset-2 ring-gray-400' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        className={`w-full bg-gradient-to-r ${
          themeColor === 'blue' ? 'from-blue-600 to-purple-600' :
          themeColor === 'purple' ? 'from-purple-600 to-pink-600' :
          themeColor === 'pink' ? 'from-pink-600 to-orange-600' :
          themeColor === 'green' ? 'from-green-600 to-blue-600' :
          'from-orange-600 to-red-600'
        } text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2`}
      >
        {saved ? (
          <>
            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Changes
          </>
        )}
      </button>

      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          All set! Your changes are saved.
        </div>
      )}
    </div>
  );
};