import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getStocks } from '../services/stockService';
import { getWatchlist, addWatchlist, removeWatchlist } from '../services/watchlistService';
import { SocketContext } from '../context/SocketContext';
import { FiSearch, FiStar, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { livePrices } = useContext(SocketContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [stocksRes, watchlistRes] = await Promise.all([
        getStocks(search),
        getWatchlist()
      ]);
      setStocks(stocksRes.data);
      setWatchlist(watchlistRes.data.map(s => s.symbol));
    } catch (error) {
      toast.error('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const delay = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  const toggleWatchlist = async (symbol) => {
    try {
      if (watchlist.includes(symbol)) {
        await removeWatchlist(symbol);
        setWatchlist(watchlist.filter(s => s !== symbol));
        toast.success('Removed from watchlist');
      } else {
        await addWatchlist(symbol);
        setWatchlist([...watchlist, symbol]);
        toast.success('Added to watchlist');
      }
    } catch (error) {
      toast.error('Watchlist update failed');
    }
  };

  // Simulated indices
  const indices = [
    { name: 'NIFTY 50', value: 22150.40, change: 110.20, percent: 0.50 },
    { name: 'SENSEX', value: 73500.15, change: 350.80, percent: 0.48 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indices.map(idx => (
          <div key={idx.name} className="bg-primary-card p-4 rounded-lg border border-primary-border shadow flex justify-between items-center">
            <div className="font-bold text-primary-textMuted">{idx.name}</div>
            <div className="text-right">
              <div className="text-xl font-mono text-primary-text">{idx.value.toLocaleString()}</div>
              <div className="text-sm font-mono text-trade-green">+{idx.change.toFixed(2)} (+{idx.percent}%)</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-textMuted" size={20} />
        <input 
          type="text" 
          placeholder="Search stocks (e.g. TCS, RELIANCE)..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-4 bg-primary-card border border-primary-border rounded-lg text-primary-text focus:outline-none focus:border-trade-green transition-colors shadow"
        />
      </div>

      {/* Stock List */}
      <div className="bg-primary-card rounded-lg border border-primary-border shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-primary-textMuted">Loading market data...</div>
        ) : stocks.length === 0 ? (
          <div className="p-8 text-center text-primary-textMuted">No stocks found.</div>
        ) : (
          <ul className="divide-y divide-trade-border">
            {stocks.map(stock => {
              const liveData = livePrices[stock.symbol] || stock;
              const isPositive = liveData.currentPrice >= stock.previousClose;
              const colorClass = isPositive ? 'text-trade-green' : 'text-trade-red';
              const priceChange = liveData.currentPrice - stock.previousClose;
              const percentChange = (priceChange / stock.previousClose) * 100;

              return (
                <li key={stock.symbol} className="hover:bg-primary-bg transition-colors group flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleWatchlist(stock.symbol)}
                      className={`focus:outline-none ${watchlist.includes(stock.symbol) ? 'text-yellow-400' : 'text-primary-textMuted hover:text-yellow-400'}`}
                    >
                      <FiStar size={20} fill={watchlist.includes(stock.symbol) ? 'currentColor' : 'none'} />
                    </button>
                    <div>
                      <Link to={`/stocks/${stock.symbol}`} className="text-lg font-bold hover:text-trade-green transition-colors">
                        {stock.symbol}
                      </Link>
                      <div className="text-xs text-primary-textMuted hidden sm:block">{stock.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className={`font-mono text-lg font-bold ${colorClass}`}>
                        ₹{liveData.currentPrice?.toFixed(2) || liveData.price?.toFixed(2)}
                      </div>
                      <div className={`font-mono text-sm ${colorClass}`}>
                        {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentChange.toFixed(2)}%)
                      </div>
                    </div>
                    <Link to={`/stocks/${stock.symbol}`} className="text-primary-textMuted hover:text-primary-text hidden sm:block">
                      <FiChevronRight size={24} />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
