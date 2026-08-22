import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { placeOrder } from '../services/orderService';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';

const OrderModal = ({ isOpen, onClose, stock, type, livePrice }) => {
  const { user, setUser } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !stock) return null;

  const currentPrice = livePrice || stock.currentPrice;
  const totalValue = currentPrice * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity <= 0) return toast.error('Quantity must be greater than zero');
    
    setLoading(true);
    try {
      const response = await placeOrder(stock.symbol, type, quantity);
      // Update user balance locally
      setUser({ ...user, balance: response.data.balance });
      toast.success(response.message);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  const isBuy = type === 'BUY';
  const buttonColor = isBuy ? 'bg-trade-green hover:bg-green-600' : 'bg-trade-red hover:bg-red-600';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100] px-4">
      <div className="bg-primary-card w-full max-w-md rounded-lg shadow-xl border border-primary-border overflow-hidden">
        
        {/* Header */}
        <div className={`px-6 py-4 flex justify-between items-center text-primary-text ${isBuy ? 'bg-trade-green bg-opacity-20' : 'bg-trade-red bg-opacity-20'}`}>
          <h3 className="text-xl font-bold">{type} {stock.symbol}</h3>
          <button onClick={onClose} className="text-primary-textMuted hover:text-primary-text transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex justify-between text-sm text-primary-textMuted">
            <span>Market Price</span>
            <span className="text-primary-text font-mono">₹{currentPrice.toFixed(2)}</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-primary-textMuted mb-1">Quantity</label>
            <input 
              type="number" 
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 bg-primary-bg border border-primary-border rounded-md text-primary-text focus:outline-none focus:border-gray-500 font-mono"
            />
          </div>

          <div className="flex justify-between items-center bg-primary-bg p-3 rounded border border-primary-border">
            <span className="text-sm text-primary-textMuted">Estimated Total</span>
            <span className="text-lg text-primary-text font-mono font-bold">₹{totalValue.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xs text-primary-textMuted pt-2 border-t border-primary-border">
            <span>Available Balance:</span>
            <span className="font-mono">₹{user.balance?.toLocaleString()}</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-primary-text py-3 rounded-md font-bold transition-colors disabled:opacity-50 mt-4 ${buttonColor}`}
          >
            {loading ? 'Processing...' : `${type} ${quantity} Qty`}
          </button>
        </form>

      </div>
    </div>
  );
};

export default OrderModal;
