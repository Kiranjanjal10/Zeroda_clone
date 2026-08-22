import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FiTrendingUp, FiPieChart, FiList, FiDollarSign, FiLogOut, FiUser, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary-card border-b border-primary-border text-primary-text sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-xl font-bold text-trade-green tracking-wider">
              <FiTrendingUp className="mr-2" /> ZERODHA CLONE
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/dashboard" className="hover:text-trade-green px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
              <Link to="/portfolio" className="hover:text-trade-green px-3 py-2 rounded-md text-sm font-medium transition-colors"><FiPieChart className="inline mr-1"/> Portfolio</Link>
              <Link to="/orders" className="hover:text-trade-green px-3 py-2 rounded-md text-sm font-medium transition-colors"><FiList className="inline mr-1"/> Orders</Link>
              <Link to="/funds" className="hover:text-trade-green px-3 py-2 rounded-md text-sm font-medium transition-colors"><FiDollarSign className="inline mr-1"/> Funds</Link>
              <Link to="/profile" className="hover:text-trade-green px-3 py-2 rounded-md text-sm font-medium transition-colors"><FiUser className="inline mr-1"/> Profile</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="text-primary-textMuted hover:text-primary-text transition-colors focus:outline-none"
              title="Toggle Theme"
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-primary-textMuted">₹{user.balance?.toLocaleString()}</span>
                <button onClick={handleLogout} className="flex items-center text-sm hover:text-trade-red transition-colors">
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-trade-green hover:text-primary-text transition-colors">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
