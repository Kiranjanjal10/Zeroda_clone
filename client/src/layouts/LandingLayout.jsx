import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiTrendingUp, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';

const LandingLayout = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text font-sans flex flex-col selection:bg-blue-500/30">
      <nav className="bg-primary-card border-b border-primary-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <FiTrendingUp className="text-3xl text-blue-500 mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold tracking-tight text-primary-text">
                ZERODHA <span className="font-light text-primary-textMuted">Clone</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/about" 
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${location.pathname === '/about' ? 'text-blue-500' : 'text-primary-textMuted'}`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${location.pathname === '/contact' ? 'text-blue-500' : 'text-primary-textMuted'}`}
              >
                Contact Us
              </Link>
              
              <div className="h-6 w-px bg-primary-border mx-2"></div>
              
              <Link 
                to="/login" 
                className="text-sm font-medium text-primary-textMuted hover:text-blue-500 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="text-sm font-medium bg-blue-600 text-white px-5 py-2.5 rounded hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
              <Link 
                to="/admin/login" 
                className="text-sm font-medium text-primary-textMuted hover:text-primary-text transition-colors ml-4"
              >
                Admin
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-primary-textMuted hover:text-primary-text hover:bg-primary-bg transition-colors ml-4"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-primary-textMuted hover:text-primary-text transition-colors"
              >
                {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
              </button>
              <button className="text-primary-textMuted hover:text-primary-text">
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-primary-card border-t border-primary-border py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-textMuted text-sm">
          <p>&copy; {new Date().getFullYear()} Zerodha Clone. This is an educational project.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link to="/about" className="hover:text-primary-text">About</Link>
            <Link to="/contact" className="hover:text-primary-text">Contact</Link>
            <Link to="/admin/login" className="hover:text-primary-text">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
