const mongoose = require('mongoose');
require('dotenv').config();
const Stock = require('../models/Stock');
const PriceHistory = require('../models/PriceHistory');

const connectDB = require('../config/db');

const seedStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', exchange: 'NSE', currentPrice: 2850.50, sector: 'Energy', marketCap: 1900000, peRatio: 28.5 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', currentPrice: 3850.25, sector: 'IT', marketCap: 1400000, peRatio: 30.2 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', exchange: 'NSE', currentPrice: 1650.00, sector: 'Finance', marketCap: 1250000, peRatio: 18.5 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', exchange: 'NSE', currentPrice: 1050.75, sector: 'Finance', marketCap: 730000, peRatio: 17.2 },
  { symbol: 'INFY', name: 'Infosys Ltd.', exchange: 'NSE', currentPrice: 1540.30, sector: 'IT', marketCap: 640000, peRatio: 25.4 },
  { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', currentPrice: 620.15, sector: 'Finance', marketCap: 550000, peRatio: 9.8 },
  { symbol: 'ITC', name: 'ITC Ltd.', exchange: 'NSE', currentPrice: 450.60, sector: 'FMCG', marketCap: 560000, peRatio: 26.5 },
  { symbol: 'LT', name: 'Larsen & Toubro Ltd.', exchange: 'NSE', currentPrice: 3350.20, sector: 'Infrastructure', marketCap: 450000, peRatio: 35.6 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', exchange: 'NSE', currentPrice: 2560.80, sector: 'FMCG', marketCap: 600000, peRatio: 58.4 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', exchange: 'NSE', currentPrice: 1020.40, sector: 'Telecom', marketCap: 580000, peRatio: 45.2 },
  { symbol: 'AXISBANK', name: 'Axis Bank Ltd.', exchange: 'NSE', currentPrice: 1120.90, sector: 'Finance', marketCap: 340000, peRatio: 14.5 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd.', exchange: 'NSE', currentPrice: 10560.00, sector: 'Automobile', marketCap: 310000, peRatio: 28.9 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', exchange: 'NSE', currentPrice: 1250.30, sector: 'Pharma', marketCap: 300000, peRatio: 32.1 },
  { symbol: 'WIPRO', name: 'Wipro Ltd.', exchange: 'NSE', currentPrice: 480.20, sector: 'IT', marketCap: 250000, peRatio: 20.4 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd.', exchange: 'NSE', currentPrice: 750.60, sector: 'Automobile', marketCap: 280000, peRatio: 16.7 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises Ltd.', exchange: 'NSE', currentPrice: 2450.10, sector: 'Conglomerate', marketCap: 270000, peRatio: 90.5 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', exchange: 'NSE', currentPrice: 1850.50, sector: 'Finance', marketCap: 360000, peRatio: 22.3 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd.', exchange: 'NSE', currentPrice: 3120.40, sector: 'Consumer Goods', marketCap: 290000, peRatio: 65.2 },
  { symbol: 'TITAN', name: 'Titan Company Ltd.', exchange: 'NSE', currentPrice: 3560.70, sector: 'Consumer Goods', marketCap: 310000, peRatio: 80.4 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd.', exchange: 'NSE', currentPrice: 7650.80, sector: 'Finance', marketCap: 460000, peRatio: 34.6 },
];

const generateHistoryForStock = (symbol, currentPrice) => {
  const history = [];
  const now = new Date();
  
  // Generate 1 year of daily data (approx 250 trading days)
  let simulatedPrice = currentPrice;
  for (let i = 250; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Skip weekends roughly
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    // Random walk with slight drift
    const changePercent = (Math.random() - 0.48) * 0.05; // -2.4% to +2.6% daily volatility
    simulatedPrice = simulatedPrice * (1 + changePercent);
    
    history.push({
      stockSymbol: symbol,
      price: parseFloat(simulatedPrice.toFixed(2)),
      timestamp: date
    });
  }
  return history;
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Stock.deleteMany();
    await PriceHistory.deleteMany();

    console.log('Inserting stocks...');
    const insertedStocks = await Stock.insertMany(seedStocks.map(s => {
      // Add simulated OHLC data based on currentPrice
      const volatility = s.currentPrice * 0.02;
      return {
        ...s,
        previousClose: s.currentPrice - (Math.random() * volatility - volatility/2),
        open: s.currentPrice - (Math.random() * volatility/2 - volatility/4),
        high: s.currentPrice + (Math.random() * volatility),
        low: s.currentPrice - (Math.random() * volatility),
        volume: Math.floor(Math.random() * 10000000) + 1000000
      };
    }));
    console.log(`Inserted ${insertedStocks.length} stocks.`);

    console.log('Generating price history...');
    let totalHistoryRecords = 0;
    for (const stock of insertedStocks) {
      const history = generateHistoryForStock(stock.symbol, stock.currentPrice);
      await PriceHistory.insertMany(history);
      totalHistoryRecords += history.length;
    }
    console.log(`Inserted ${totalHistoryRecords} historical price records.`);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
