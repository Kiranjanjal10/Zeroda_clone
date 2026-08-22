const Stock = require('../models/Stock');

// Will be passed io later for broadcasting
const startPriceSimulation = (io) => {
  setInterval(async () => {
    try {
      const stocks = await Stock.find();
      
      const updates = stocks.map(async (stock) => {
        // Random volatility between -0.5% and +0.5%
        const volatility = 0.005; 
        const randomChange = (Math.random() * volatility * 2) - volatility;
        
        let newPrice = stock.currentPrice * (1 + randomChange);
        
        // Ensure price doesn't drop to 0 or below (cap drop at 0.05 min)
        if (newPrice <= 0) newPrice = 0.05;
        
        // Round to 2 decimal places
        newPrice = parseFloat(newPrice.toFixed(2));
        
        // Calculate new high/low if applicable
        const newHigh = newPrice > stock.high ? newPrice : stock.high;
        const newLow = newPrice < stock.low ? newPrice : stock.low;
        
        const priceChange = newPrice - stock.previousClose;
        const changePercent = (priceChange / stock.previousClose) * 100;

        stock.currentPrice = newPrice;
        stock.high = newHigh;
        stock.low = newLow;
        stock.lastUpdated = Date.now();
        
        await stock.save();

        // If socket.io is initialized, emit to clients
        if (io) {
          io.emit('stockPriceUpdate', {
            symbol: stock.symbol,
            price: newPrice,
            currentPrice: newPrice,
            change: parseFloat(priceChange.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2))
          });
        }
      });

      await Promise.all(updates);
    } catch (error) {
      console.error('Price Simulator Error:', error);
    }
  }, 10000); // Run every 10 seconds
};

module.exports = startPriceSimulation;
