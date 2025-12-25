import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => api.post('/auth/register', data),

  login: (identifier: string, password: string) =>
    api.post('/auth/login', { identifier, password }),

  logout: () => api.post('/auth/logout'),

  getProfile: () => api.get('/auth/profile'),

  initiateKyc: () => api.post('/auth/kyc/initiate'),
};

// Courses API
export const coursesApi = {
  getAll: (params?: {
    sector?: string;
    mode?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/courses', { params }),

  getById: (id: string) => api.get(`/courses/${id}`),

  getPopular: (limit?: number) => api.get('/courses/popular', { params: { limit } }),

  getSectors: () => api.get('/courses/sectors'),
};

// Loans API
export const loansApi = {
  apply: (data: {
    courseId: string;
    requestedAmount: number;
    purpose?: string;
    tenureMonths?: number;
  }) => api.post('/loans/apply', data),

  getMyLoans: () => api.get('/loans/my-loans'),

  getById: (id: string) => api.get(`/loans/${id}`),

  submit: (id: string) => api.post(`/loans/${id}/submit`),

  getStats: () => api.get('/loans/stats'),
};

// Training Providers API
export const trainingProvidersApi = {
  getAll: (params?: { search?: string; page?: number; limit?: number }) =>
    api.get('/training-providers', { params }),

  getById: (id: string) => api.get(`/training-providers/${id}`),

  getDashboard: (id: string) => api.get(`/training-providers/${id}/dashboard`),
};

// Risk Scoring API
export const riskScoringApi = {
  getBorrowerScore: (userId: string, courseId?: string) =>
    api.get(`/risk-scoring/borrower/${userId}`, { params: { courseId } }),

  calculateEmi: (principal: number, annualRate: number, tenureMonths: number) =>
    api.post('/risk-scoring/emi-calculator', { principal, annualRate, tenureMonths }),
};

// Notifications API
export const notificationsApi = {
  getAll: (params?: { read?: boolean; page?: number; limit?: number }) =>
    api.get('/notifications', { params }),

  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),

  markAllAsRead: () => api.put('/notifications/read-all'),

  getUnreadCount: () => api.get('/notifications/unread-count'),
};

export default api;

