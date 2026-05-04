import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RaffleLogo from './RaffleLogo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-700" role="navigation" aria-label="Navegação principal">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1"
            aria-label="Página inicial - RifaSorte"
          >
            <RaffleLogo size="sm" />
            <span className="text-2xl font-bold text-white">RifaSorte</span>
            <span className="text-2xl ml-2 animate-bounce-gentle">🎰</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              aria-current="page"
            >
              <span className="flex items-center">
                <span className="mr-1">🏠</span>
                Início
              </span>
            </Link>
            <Link
              to="/raffle"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="flex items-center">
                <span className="mr-1">🎫</span>
                Rifas
              </span>
            </Link>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="flex items-center">
                <span className="mr-1">👤</span>
                Entrar
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-gray-900 border-t border-gray-700 py-2"
            role="menu"
          >
            <Link
              to="/"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeMenu}
              role="menuitem"
            >
              <span className="flex items-center">
                <span className="mr-2">🏠</span>
                Início
              </span>
            </Link>
            <Link
              to="/raffle"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeMenu}
              role="menuitem"
            >
              <span className="flex items-center">
                <span className="mr-2">🎫</span>
                Rifas
              </span>
            </Link>
            <Link
              to="/login"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeMenu}
              role="menuitem"
            >
              <span className="flex items-center">
                <span className="mr-2">👤</span>
                Entrar
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
