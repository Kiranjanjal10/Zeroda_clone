import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FiShield, FiLogOut, FiUsers, FiActivity, FiSun, FiMoon } from 'react-icons/fi';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-primary-bg text-primary-text flex flex-col font-sans">
      <nav className="bg-primary-card border-b border-primary-border text-primary-text sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-xl font-bold text-blue-400 tracking-wider">
                <FiShield className="mr-2" /> ADMIN PORTAL
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/admin" className={`hover:text-blue-400 transition-colors flex items-center ${location.pathname === '/admin' ? 'text-blue-400' : ''}`}>
                <FiShield className="mr-1" /> Dashboard
              </Link>
              <Link to="/admin/users" className={`hover:text-blue-400 transition-colors flex items-center ${location.pathname === '/admin/users' ? 'text-blue-400' : ''}`}>
                <FiUsers className="mr-1" /> Users
              </Link>
              <Link to="/admin/orders" className={`hover:text-blue-400 transition-colors flex items-center ${location.pathname === '/admin/orders' ? 'text-blue-400' : ''}`}>
                <FiActivity className="mr-1" /> Trades
              </Link>
              <div className="border-l border-gray-600 h-6 mx-2"></div>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={toggleTheme}
                  className="text-primary-textMuted hover:text-primary-text transition-colors focus:outline-none"
                  title="Toggle Theme"
                >
                  {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-primary-textMuted">Logged in as {user?.email}</span>
                  <button onClick={handleLogout} className="flex items-center text-sm hover:text-red-400 transition-colors">
                    <FiLogOut className="mr-1" /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
