import React, { useState, useEffect } from 'react';
import { getAdminOrders } from '../../services/adminService';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAdminOrders();
        setOrders(res.data.data);
      } catch (err) {
        toast.error('Failed to load global orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-primary-textMuted p-8 text-center">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary-text mb-6">Global Trade Ledger</h1>
      
      <div className="bg-primary-card rounded-lg border border-primary-border shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-bg text-primary-textMuted text-sm border-b border-primary-border">
                <th className="p-4">Time</th>
                <th className="p-4">User ID</th>
                <th className="p-4">Symbol</th>
                <th className="p-4 text-center">Type</th>
                <th className="p-4 text-right">Qty</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-700 transition-colors">
                  <td className="p-4 text-sm text-primary-textMuted">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-sm text-primary-textMuted">{order.userId}</td>
                  <td className="p-4 font-bold text-primary-text">{order.stockSymbol}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 text-xs rounded font-bold ${
                      order.type === 'BUY' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-primary-textMuted">{order.quantity}</td>
                  <td className="p-4 text-right font-mono text-primary-textMuted">₹{order.price?.toFixed(2)}</td>
                  <td className="p-4 text-right font-mono font-bold text-primary-text">₹{order.totalAmount?.toLocaleString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-primary-textMuted">No trades have been executed yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
