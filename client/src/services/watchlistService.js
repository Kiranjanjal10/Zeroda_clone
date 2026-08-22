import api from './api';

export const getWatchlist = async () => {
  const response = await api.get('/watchlist');
  return response.data;
};

export const addWatchlist = async (symbol) => {
  const response = await api.post('/watchlist', { symbol });
  return response.data;
};

export const removeWatchlist = async (symbol) => {
  const response = await api.delete(`/watchlist/${symbol}`);
  return response.data;
};
