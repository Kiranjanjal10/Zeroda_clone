const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');
const User = require('../models/User');
const Stock = require('../models/Stock');

let token;
let userId;

describe('Trade API', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await Stock.deleteMany({});

    // Register user
    const authRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Trade Test User',
        email: 'tradetest@example.com',
        password: 'password123'
      });
    
    token = authRes.body.data.token;
    userId = authRes.body.data.user.id;

    // Seed a stock
    await Stock.create({
      symbol: 'TEST_STOCK',
      name: 'Test Stock',
      exchange: 'NSE',
      currentPrice: 100,
      previousClose: 95
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should successfully buy a stock', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        symbol: 'TEST_STOCK',
        type: 'BUY',
        quantity: 10
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    // 10 qty * 100 price = 1000 deducted from 100000 balance
    expect(res.body.data.balance).toEqual(99000); 
  });

  it('should fail to sell a stock with insufficient quantity', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        symbol: 'TEST_STOCK',
        type: 'SELL',
        quantity: 20 // User only has 10
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toEqual('Insufficient holdings');
  });

  it('should successfully sell a stock', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        symbol: 'TEST_STOCK',
        type: 'SELL',
        quantity: 5
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    // Sold 5 at 100 = 500 added to 99000
    expect(res.body.data.balance).toEqual(99500); 
  });
});
