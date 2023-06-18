import React, { useState } from 'react';
import { AiFillHome, AiOutlineUser, AiOutlineCalendar, AiOutlineLayout } from 'react-icons/ai';
import Users from './Users';
import ViewRoom from '../components/Stade/ViewStade';
import Bookings from './Bookings';
import Homeadmin from './Homeadmin';

function Dashboard() {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleClick = (linkName) => {
    setActiveLink(linkName);
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'Users':
        return <Users />;
      case 'Stades':
        return <ViewRoom />;
      case 'Reservations':
        return <Bookings />;
      default:
        return <Homeadmin />;
    }
  };

  return (
    <>
      {/* Navbar */}
      {/* <NavBar /> */}
      {/* Sidebar */}
      <div className="flex flex-row">
        <div className="bg-gray-800 text-white h-screen w-56 py-4 flex-none">
          <div className="px-2 mb-5">
            <span className="text-lg font-bold uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          <div className="px-2">
            <ul>
              <li>
                <a
                  href="#"
                  className={`py-2 px-4 text-sm font-semibold flex items-center ${
                    activeLink === 'Dashboard' ? 'bg-gray-900' : ''
                  }`}
                  onClick={() => handleClick('Dashboard')}
                >
                  <AiFillHome className="mr-2" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#users"
                  className={`py-2 px-4 text-sm font-semibold flex items-center ${
                    activeLink === 'Users' ? 'bg-gray-900' : ''
                  }`}
                  onClick={() => handleClick('Users')}
                >
                  <AiOutlineUser className="mr-2" />
                  Users
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  className={`block py-2 px-4 text-sm font-semibold flex items-center ${
                    activeLink === 'Reservations' ? 'bg-gray-900' : ''
                  }`}
                  onClick={() => handleClick('Reservations')}
                >
                  <AiOutlineCalendar className="mr-2" />
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="#stades"
                  className={`block py-2 px-4 text-sm font-semibold flex items-center ${
                    activeLink === 'Rooms' ? 'bg-gray-900' : ''
                  }`}
                  onClick={() => handleClick('Stades')}
                >
                  <AiOutlineLayout className="mr-2" />
                  Stades
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow p-4">
          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
