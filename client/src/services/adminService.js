import api from './api';

export const getAdminStats = () => api.get('/admin/stats');
export const getAdminUsers = () => api.get('/admin/users');
export const getAdminOrders = () => api.get('/admin/orders');
export const getAdminUserPortfolio = (id) => api.get(`/admin/users/${id}/portfolio`);
