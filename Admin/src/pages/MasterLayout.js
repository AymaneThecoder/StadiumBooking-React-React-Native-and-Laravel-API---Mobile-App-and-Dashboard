import React, { useEffect, useState } from 'react';
import '../../App.css';
import Dashboard from '../../components/admin/Dashboard';
import Profile from '../../components/admin/Profile';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import ViewRoom from '../../components/admin/Rooms/ViewRoom';

export default function MasterLayout() {
  useEffect(() => {
    document.title = 'Admin Panel';
  }, []);

  const [activeComponent, setActiveComponent] = useState('dashboard');

  const handleProfileClick = () => {
    setActiveComponent('profile');
  };

  const handleDashboardClick = () => {
    setActiveComponent('dashboard');
  };

  const handleRoomsClick = () => {
    setActiveComponent('rooms');
  };

  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 bg-gray-800">
          <div className="flex items-center justify-between px-2 py-3">
            <div className="text-white text-2xl font-medium">Admin Panel</div>
          </div>
          <nav className="flex flex-col mt-5 px-2 space-y-1">
            <button
              className={`${
                activeComponent === 'dashboard'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } py-2 px-3 rounded-md text-sm font-medium`}
              onClick={handleDashboardClick}
            >
              Dashboard
            </button>
            <button
              className={`${
                activeComponent === 'profile'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } py-2 px-3 rounded-md text-sm font-medium`}
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button
              className={`${
                activeComponent === 'rooms'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } py-2 px-3 rounded-md text-sm font-medium`}
              onClick={handleRoomsClick}
            >
              Rooms
            </button>
          </nav>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {activeComponent === 'dashboard' ? <Dashboard /> : null}
          {activeComponent === 'profile' ? <Profile /> : null}
          {activeComponent === 'rooms' ? <ViewRoom /> : null}
        </div>
      </div>
    </div>
  );
}
