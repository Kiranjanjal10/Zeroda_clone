import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats } from '../../services/adminService';
import { FiShield, FiUsers, FiActivity, FiDatabase } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats(res.data.data);
      } catch (err) {
        toast.error('Failed to load admin stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-primary-textMuted p-8 text-center">Loading platform stats...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-text mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/admin/users')}
          className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg cursor-pointer hover:border-blue-500 hover:shadow-blue-900/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-textMuted mb-1">Total Users</p>
              <p className="text-3xl font-bold text-primary-text">{stats?.totalUsers || 0}</p>
            </div>
            <div className="p-4 bg-blue-500/20 rounded-full text-blue-400">
              <FiUsers size={24} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/admin/orders')}
          className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg cursor-pointer hover:border-green-500 hover:shadow-green-900/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-textMuted mb-1">Total Trades</p>
              <p className="text-3xl font-bold text-primary-text">{stats?.totalTrades || 0}</p>
            </div>
            <div className="p-4 bg-green-500/20 rounded-full text-green-400">
              <FiActivity size={24} />
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/dashboard')}
          className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg cursor-pointer hover:border-gray-500 hover:shadow-gray-700/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-textMuted mb-1">Active Stocks</p>
              <p className="text-3xl font-bold text-primary-text">{stats?.activeStocks || 0}</p>
            </div>
            <div className="p-4 bg-gray-700 rounded-full text-primary-textMuted">
              <FiDatabase size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-card rounded-lg border border-primary-border mt-8">
        <div className="p-6 border-b border-primary-border">
          <h2 className="text-xl font-bold text-primary-text flex items-center">
            <FiShield className="mr-2 text-blue-400" /> Admin Controls
          </h2>
        </div>
        <div className="p-6">
          <p className="text-primary-textMuted">
            Welcome to the secure administrative portal. From here, you can monitor platform statistics, manage users, and view system health. Use the navigation bar above to view detailed lists of users and trades across the platform.
          </p>
          <div className="mt-4 inline-flex items-center text-sm font-bold text-green-400 bg-green-900/30 px-3 py-1 rounded">
            System Status: {stats?.systemStatus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
