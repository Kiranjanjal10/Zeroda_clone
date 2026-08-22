import api from './api';

export const deposit = async (amount) => {
  const response = await api.post('/funds/deposit', { amount });
  return response.data;
};

export const withdraw = async (amount) => {
  const response = await api.post('/funds/withdraw', { amount });
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get('/funds/transactions');
  return response.data;
};
