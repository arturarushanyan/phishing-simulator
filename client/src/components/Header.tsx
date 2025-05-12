import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Phishing Simulator</h1>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                to="/phishing-simulation"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Simulation
              </Link>
              <Link
                to="/attempts"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Attempts
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 