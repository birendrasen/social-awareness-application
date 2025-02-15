import React from 'react';
import { User, LogOut, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left Section: Logo and Navigation */}
          <div className="flex items-center">
            <span className="text-xl font-bold">Social Awareness</span>
            <div className="ml-10 flex space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Home
              </a>
              <a href="/campaigns" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Campaigns
              </a>
              <button
                onClick={() => navigate('/businesses')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2"
              >
                My Businesses
              </button>
            </div>
          </div>

          {/* Right Section: Search, Notifications, User Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </button>
            
            {isLoggedIn && (
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700"></span>
                <button
                  onClick={onLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button className="text-blue-600 hover:text-blue-700">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
