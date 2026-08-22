import React, { useState, useEffect, useContext } from 'react';
import { getPortfolio } from '../services/portfolioService';
import { SocketContext } from '../context/SocketContext';
import { Link } from 'react-router-dom';
import { FiPieChart } from 'react-icons/fi';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const { livePrices } = useContext(SocketContext);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await getPortfolio();
        setPortfolio(response.data);
      } catch (error) {
        console.error('Failed to load portfolio', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  if (loading) return <div className="p-8 text-center text-xl text-primary-textMuted">Loading portfolio...</div>;
  if (!portfolio) return <div className="p-8 text-center text-trade-red">Error loading portfolio data</div>;

  // Recalculate totals with live prices
  let liveInvested = 0;
  let liveCurrent = 0;

  const enrichedHoldings = portfolio.holdings.map(h => {
    const currentPrice = livePrices[h.stockSymbol]?.currentPrice || h.currentPrice;
    const invested = h.quantity * h.averageBuyPrice;
    const currentValue = h.quantity * currentPrice;
    const pnl = currentValue - invested;
    const pnlPercent = (pnl / invested) * 100;

    liveInvested += invested;
    liveCurrent += currentValue;

    return { ...h, currentPrice, currentValue, pnl, pnlPercent };
  });

  const liveTotalPnl = liveCurrent - liveInvested;
  const liveTotalPnlPercent = liveInvested > 0 ? (liveTotalPnl / liveInvested) * 100 : 0;
  const isOverallPositive = liveTotalPnl >= 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center text-2xl font-bold text-primary-text mb-6">
        <FiPieChart className="mr-3 text-trade-green" /> My Portfolio
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg">
          <div className="text-sm text-primary-textMuted mb-2">Total Investment</div>
          <div className="text-2xl font-mono text-primary-text">₹{liveInvested.toFixed(2)}</div>
        </div>
        <div className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg">
          <div className="text-sm text-primary-textMuted mb-2">Current Value</div>
          <div className="text-2xl font-mono text-primary-text">₹{liveCurrent.toFixed(2)}</div>
        </div>
        <div className="bg-primary-card p-6 rounded-lg border border-primary-border shadow-lg col-span-1 md:col-span-2">
          <div className="text-sm text-primary-textMuted mb-2">Overall P&L</div>
          <div className={`text-3xl font-mono font-bold ${isOverallPositive ? 'text-trade-green' : 'text-trade-red'}`}>
            {isOverallPositive ? '+' : ''}{liveTotalPnl.toFixed(2)} ({isOverallPositive ? '+' : ''}{liveTotalPnlPercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="bg-primary-card rounded-lg border border-primary-border shadow-lg overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-primary-border bg-primary-bg">
          <h3 className="text-lg font-bold text-primary-text">Holdings ({enrichedHoldings.length})</h3>
        </div>
        
        {enrichedHoldings.length === 0 ? (
          <div className="p-8 text-center text-primary-textMuted">You have no holdings. Start trading!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-bg text-primary-textMuted text-sm border-b border-primary-border">
                  <th className="p-4">Instrument</th>
                  <th className="p-4 text-right">Qty.</th>
                  <th className="p-4 text-right">Avg. Cost</th>
                  <th className="p-4 text-right">LTP</th>
                  <th className="p-4 text-right">Cur. Val</th>
                  <th className="p-4 text-right">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-trade-border">
                {enrichedHoldings.map(h => {
                  const isPositive = h.pnl >= 0;
                  return (
                    <tr key={h._id} className="hover:bg-primary-bg transition-colors">
                      <td className="p-4">
                        <Link to={`/stocks/${h.stockSymbol}`} className="font-bold text-primary-text hover:text-trade-green">
                          {h.stockSymbol}
                        </Link>
                      </td>
                      <td className="p-4 text-right text-primary-textMuted font-mono">{h.quantity}</td>
                      <td className="p-4 text-right text-primary-textMuted font-mono">₹{h.averageBuyPrice.toFixed(2)}</td>
                      <td className="p-4 text-right text-primary-text font-mono">₹{h.currentPrice.toFixed(2)}</td>
                      <td className="p-4 text-right text-primary-textMuted font-mono">₹{h.currentValue.toFixed(2)}</td>
                      <td className={`p-4 text-right font-mono font-bold ${isPositive ? 'text-trade-green' : 'text-trade-red'}`}>
                        {isPositive ? '+' : ''}{h.pnl.toFixed(2)} <br/>
                        <span className="text-xs font-normal">({isPositive ? '+' : ''}{h.pnlPercent.toFixed(2)}%)</span>
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

export default Portfolio;
