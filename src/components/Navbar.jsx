import React from 'react';
import { Link } from 'react-router-dom';
import RaffleLogo from './RaffleLogo';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <RaffleLogo size="medium" />
            <Link
              to="/"
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              RifaSorte
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              to="/raffle"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Rifas
            </Link>
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Entrar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600 p-2">
              <svg className="icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
