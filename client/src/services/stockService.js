import api from './api';

export const getStocks = async (search = '') => {
  const response = await api.get(`/stocks?search=${search}`);
  return response.data;
};

export const getStock = async (symbol) => {
  const response = await api.get(`/stocks/${symbol}`);
  return response.data;
};

export const getStockHistory = async (symbol, timeframe = '1D') => {
  const response = await api.get(`/stocks/${symbol}/history?timeframe=${timeframe}`);
  return response.data;
};
