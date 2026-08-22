import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/orderService';
import { FiList } from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-8 text-center text-xl text-primary-textMuted">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center text-2xl font-bold text-primary-text mb-6">
        <FiList className="mr-3 text-trade-green" /> Order Book
      </div>

      <div className="bg-primary-card rounded-lg border border-primary-border shadow-lg overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-primary-textMuted">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-bg text-primary-textMuted text-sm border-b border-primary-border">
                  <th className="p-4">Time</th>
                  <th className="p-4">Instrument</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 text-right">Qty.</th>
                  <th className="p-4 text-right">Price</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-trade-border">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-primary-bg transition-colors text-sm">
                    <td className="p-4 text-primary-textMuted font-mono">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 font-bold text-primary-text">
                      {order.stockSymbol}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${order.type === 'BUY' ? 'bg-trade-green bg-opacity-20 text-trade-green' : 'bg-trade-red bg-opacity-20 text-trade-red'}`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="p-4 text-right text-primary-textMuted font-mono">{order.quantity}</td>
                    <td className="p-4 text-right text-primary-text font-mono">₹{order.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-gray-700 text-primary-textMuted">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
