import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiShield, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { login as loginService } from '../../services/authService';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginService(email, password);
      login(data.data, data.data.token);
      toast.success('Admin login successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary-bg px-4 relative font-sans">
      <Link to="/" className="absolute top-6 left-6 text-primary-textMuted hover:text-primary-text flex items-center transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Home
      </Link>
      <div className="max-w-md w-full bg-primary-card p-8 rounded-lg shadow-lg border border-primary-border">
        <div className="flex justify-center text-blue-500 mb-4">
          <FiShield size={40} />
        </div>
        <h2 className="text-3xl font-bold text-center text-primary-text mb-2">
          Admin Portal
        </h2>
        <p className="text-center text-sm text-primary-textMuted mb-6">
          Sign in to access the control panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-textMuted mb-1">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-primary-bg border border-primary-border rounded-md text-primary-text focus:outline-none focus:border-trade-green"
              placeholder="admin@zerodha.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-textMuted mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-primary-bg border border-primary-border rounded-md text-primary-text focus:outline-none focus:border-trade-green"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-trade-green text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Logging in...' : 'Sign in to Admin Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
