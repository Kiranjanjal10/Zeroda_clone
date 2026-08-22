import React, { useState, useEffect } from 'react';
import { getAdminUsers, getAdminUserPortfolio } from '../../services/adminService';
import toast from 'react-hot-toast';
import { FiChevronDown, FiChevronUp, FiBriefcase } from 'react-icons/fi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [userPortfolio, setUserPortfolio] = useState(null);
  const [portfolioLoading, setPortfolioLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAdminUsers();
        setUsers(res.data.data);
      } catch (err) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRowClick = async (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
      return;
    }
    
    setExpandedUserId(userId);
    setPortfolioLoading(true);
    try {
      const res = await getAdminUserPortfolio(userId);
      setUserPortfolio(res.data.data);
    } catch (error) {
      toast.error('Failed to load user portfolio');
      setUserPortfolio(null);
    } finally {
      setPortfolioLoading(false);
    }
  };

  if (loading) return <div className="text-primary-textMuted p-8 text-center">Loading users...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-text mb-6">User Management</h1>
      
      <div className="bg-primary-card rounded-lg border border-primary-border shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-bg text-primary-textMuted text-sm border-b border-primary-border">
                <th className="p-4 w-10"></th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Balance</th>
                <th className="p-4 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((u) => (
                <React.Fragment key={u._id}>
                  <tr 
                    onClick={() => handleRowClick(u._id)}
                    className="hover:bg-gray-700 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 text-primary-textMuted group-hover:text-blue-400">
                      {expandedUserId === u._id ? <FiChevronUp /> : <FiChevronDown />}
                    </td>
                    <td className="p-4 font-medium text-primary-text">{u.name}</td>
                    <td className="p-4 text-primary-textMuted">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded font-bold ${u.role === 'admin' ? 'bg-blue-900/50 text-blue-400' : 'bg-gray-600 text-primary-textMuted'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-right text-primary-textMuted font-mono">
                      ₹{u.balance?.toLocaleString()}
                    </td>
                    <td className="p-4 text-right text-primary-textMuted text-sm">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  
                  {/* Expanded Row for Portfolio */}
                  {expandedUserId === u._id && (
                    <tr className="bg-primary-bg/50 border-b-2 border-gray-600">
                      <td colSpan="6" className="p-0">
                        <div className="p-6">
                          <h3 className="text-primary-text font-bold mb-4 flex items-center">
                            <FiBriefcase className="mr-2 text-blue-400" />
                            {u.name}'s Portfolio
                          </h3>
                          
                          {portfolioLoading ? (
                            <div className="text-primary-textMuted text-sm">Loading portfolio...</div>
                          ) : !userPortfolio || userPortfolio.holdings.length === 0 ? (
                            <div className="text-primary-textMuted text-sm bg-primary-card/50 p-4 rounded border border-primary-border text-center">
                              No stocks purchased yet.
                            </div>
                          ) : (
                            <div className="bg-primary-card rounded border border-primary-border overflow-hidden">
                              <table className="w-full text-left text-sm">
                                <thead className="bg-gray-700 text-primary-textMuted">
                                  <tr>
                                    <th className="p-3">Stock</th>
                                    <th className="p-3 text-right">Qty</th>
                                    <th className="p-3 text-right">Avg Price</th>
                                    <th className="p-3 text-right">Current Price</th>
                                    <th className="p-3 text-right">Invested</th>
                                    <th className="p-3 text-right">Current Val</th>
                                    <th className="p-3 text-right">P&L</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                  {userPortfolio.holdings.map((h) => (
                                    <tr key={h._id}>
                                      <td className="p-3 text-primary-text font-medium">{h.stockSymbol}</td>
                                      <td className="p-3 text-right text-primary-textMuted font-mono">{h.quantity}</td>
                                      <td className="p-3 text-right text-primary-textMuted font-mono">₹{h.averageBuyPrice}</td>
                                      <td className="p-3 text-right text-primary-textMuted font-mono">₹{h.currentPrice}</td>
                                      <td className="p-3 text-right text-primary-textMuted font-mono">₹{h.investedValue}</td>
                                      <td className="p-3 text-right text-primary-text font-mono">₹{h.currentValue}</td>
                                      <td className={`p-3 text-right font-mono font-bold ${h.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {h.profitLoss >= 0 ? '+' : ''}₹{h.profitLoss}
                                      </td>
                                    </tr>
                                  ))}
                                  <tr className="bg-gray-700/50 border-t border-gray-600 font-bold">
                                    <td colSpan="4" className="p-3 text-primary-text text-right">Total</td>
                                    <td className="p-3 text-right text-primary-text font-mono">₹{userPortfolio.investedAmount}</td>
                                    <td className="p-3 text-right text-primary-text font-mono">₹{userPortfolio.currentValue}</td>
                                    <td className={`p-3 text-right font-mono ${userPortfolio.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                      {userPortfolio.profitLoss >= 0 ? '+' : ''}₹{userPortfolio.profitLoss}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-primary-textMuted">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
