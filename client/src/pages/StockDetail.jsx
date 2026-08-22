import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStock, getStockHistory } from '../services/stockService';
import { SocketContext } from '../context/SocketContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import OrderModal from '../components/OrderModal';
import { FiArrowLeft } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const StockDetail = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [history, setHistory] = useState([]);
  const [timeframe, setTimeframe] = useState('1M');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [orderModal, setOrderModal] = useState({ isOpen: false, type: 'BUY' });

  const { livePrices } = useContext(SocketContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stockRes, historyRes] = await Promise.all([
          getStock(symbol),
          getStockHistory(symbol, timeframe)
        ]);
        setStock(stockRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        setError('Failed to fetch stock details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, timeframe]);

  if (loading) return <div className="text-center py-20 text-xl">Loading stock details...</div>;
  if (error || !stock) return <div className="text-center py-20 text-trade-red">{error}</div>;

  const currentData = livePrices[stock.symbol] || stock;
  const isPositive = currentData.currentPrice >= stock.previousClose;
  const color = isPositive ? '#4caf50' : '#f44336';
  const change = currentData.currentPrice - stock.previousClose;
  const changePercent = (change / stock.previousClose) * 100;

  const chartData = {
    labels: history.map(h => new Date(h.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: history.map(h => h.price),
        borderColor: color,
        backgroundColor: `${color}20`,
        fill: true,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { grid: { color: '#333' } }
    },
    interaction: { mode: 'index', intersect: false }
  };

  const handleOrder = (type) => {
    setOrderModal({ isOpen: true, type });
  };

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center text-primary-textMuted hover:text-primary-text transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">{stock.symbol}</h1>
          <p className="text-primary-textMuted">{stock.name}</p>
          <div className="mt-2 text-sm text-primary-textMuted">{stock.sector} • {stock.exchange}</div>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <div className="text-4xl font-mono font-bold">₹{currentData.currentPrice?.toFixed(2) || currentData.price?.toFixed(2)}</div>
          <div className={`text-lg font-mono flex items-center justify-end ${isPositive ? 'text-trade-green' : 'text-trade-red'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="bg-primary-card p-4 rounded-lg border border-primary-border h-[400px]">
        <div className="flex space-x-2 mb-4">
          {['1D', '1W', '1M', '1Y'].map(tf => (
            <button 
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded text-sm transition-colors ${timeframe === tf ? 'bg-trade-border text-primary-text' : 'text-primary-textMuted hover:bg-primary-bg'}`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open', value: `₹${stock.open?.toFixed(2)}` },
          { label: 'High', value: `₹${stock.high?.toFixed(2)}` },
          { label: 'Low', value: `₹${stock.low?.toFixed(2)}` },
          { label: 'Prev Close', value: `₹${stock.previousClose?.toFixed(2)}` },
          { label: 'Volume', value: stock.volume?.toLocaleString() },
          { label: 'Market Cap', value: `₹${(stock.marketCap / 100000).toFixed(2)} Lakh Cr` },
          { label: 'P/E Ratio', value: stock.peRatio },
          { label: 'Exchange', value: stock.exchange }
        ].map(stat => (
          <div key={stat.label} className="bg-primary-bg p-4 rounded border border-primary-border">
            <div className="text-sm text-primary-textMuted mb-1">{stat.label}</div>
            <div className="text-lg font-mono">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 sticky bottom-4 z-10 p-4 bg-primary-card rounded-lg border border-primary-border shadow-2xl">
        <button 
          onClick={() => handleOrder('BUY')}
          className="flex-1 bg-trade-green hover:bg-green-600 text-primary-text font-bold py-3 rounded transition-colors"
        >
          BUY
        </button>
        <button 
          onClick={() => handleOrder('SELL')}
          className="flex-1 bg-trade-red hover:bg-red-600 text-primary-text font-bold py-3 rounded transition-colors"
        >
          SELL
        </button>
      </div>

      <OrderModal 
        isOpen={orderModal.isOpen} 
        onClose={() => setOrderModal({ isOpen: false, type: 'BUY' })} 
        stock={stock} 
        type={orderModal.type}
        livePrice={currentData.currentPrice || currentData.price}
      />
    </div>
  );
};

export default StockDetail;
