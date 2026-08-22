import api from './api';

export const placeOrder = async (symbol, type, quantity) => {
  const response = await api.post('/orders', { symbol, type, quantity });
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};
