import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTransactions, deposit, withdraw } from '../services/fundsService';
import toast from 'react-hot-toast';
import { FiDollarSign, FiPlus, FiMinus } from 'react-icons/fi';

const Funds = () => {
  const { user, setUser } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransaction = async (type) => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) return toast.error('Enter a valid amount');
    
    setActionLoading(true);
    try {
      let response;
      if (type === 'DEPOSIT') {
        response = await deposit(numAmount);
      } else {
        response = await withdraw(numAmount);
      }
      
      setUser({ ...user, balance: response.data.balance });
      toast.success(response.message);
      setAmount('');
      fetchTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transaction failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-xl text-primary-textMuted">Loading funds...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-2xl font-bold text-primary-text">
          <FiDollarSign className="mr-3 text-trade-green" /> Funds
        </div>
        <div className="text-right">
          <div className="text-sm text-primary-textMuted">Available Margin</div>
          <div className="text-3xl font-mono text-primary-text">₹{user.balance?.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-primary-textMuted mb-1">Amount to Add/Withdraw</label>
          <input 
            type="number" 
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-primary-bg border border-primary-border rounded-lg text-primary-text focus:outline-none focus:border-trade-green font-mono text-lg"
            placeholder="₹ 0.00"
          />
        </div>
        <button 
          onClick={() => handleTransaction('DEPOSIT')}
          disabled={actionLoading}
          className="w-full sm:w-auto px-8 py-3 bg-trade-green hover:bg-green-600 text-primary-text rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <FiPlus className="mr-2" /> Add Funds
        </button>
        <button 
          onClick={() => handleTransaction('WITHDRAW')}
          disabled={actionLoading}
          className="w-full sm:w-auto px-8 py-3 bg-primary-bg hover:bg-primary-card text-primary-text border border-primary-border rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <FiMinus className="mr-2" /> Withdraw
        </button>
      </div>

      <div className="bg-primary-card rounded-lg border border-primary-border shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-primary-border bg-primary-bg">
          <h3 className="text-lg font-bold text-primary-text">Transaction History</h3>
        </div>
        
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-primary-textMuted">No transactions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-bg text-primary-textMuted text-sm border-b border-primary-border">
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-trade-border">
                {transactions.map(txn => {
                  const isPositive = ['DEPOSIT', 'SELL'].includes(txn.type);
                  return (
                    <tr key={txn._id} className="hover:bg-primary-bg transition-colors text-sm">
                      <td className="p-4 text-primary-textMuted font-mono w-48">
                        {new Date(txn.date).toLocaleString()}
                      </td>
                      <td className="p-4 text-primary-textMuted">
                        {txn.description}
                        <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-gray-700 text-primary-textMuted uppercase">
                          {txn.type}
                        </span>
                      </td>
                      <td className={`p-4 text-right font-mono font-bold ${isPositive ? 'text-trade-green' : 'text-trade-red'}`}>
                        {isPositive ? '+' : '-'}₹{txn.amount.toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Funds;
