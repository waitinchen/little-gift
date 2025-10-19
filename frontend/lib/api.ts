import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 处理认证错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 清除本地存储的令牌
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      // 可以在这里触发登录重定向
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// AI 推荐礼物
export const recommendGifts = async (params: {
  target: string;
  budget: number;
  occasion?: string;
}) => {
  const { data } = await api.post('/store/ai/recommend', params);
  return data.recommendations;
};

// AI 生成卡片
export const generateCard = async (params: {
  target: string;
  occasion?: string;
  customMessage?: string;
}) => {
  const { data } = await api.post('/store/ai/generate-card', params);
  return data;
};

// 获取礼物链接
export const getGiftLink = async (orderId: string) => {
  const { data } = await api.get(`/store/gift-links/${orderId}`);
  return data;
};

// 收礼者填写地址
export const redeemGift = async (token: string, recipientInfo: {
  recipient_name: string;
  recipient_phone?: string;
  address1: string;
  address2?: string;
  city?: string;
  postal_code?: string;
  country_code?: string;
}) => {
  const { data } = await api.post(`/store/gift-links/${token}/redeem`, recipientInfo);
  return data;
};

// 用户认证相关 API
export const auth = {
  // 用户注册
  register: async (userData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) => {
    const { data } = await api.post('/store/auth/register', userData);
    return data;
  },

  // 用户登录
  login: async (credentials: {
    email: string;
    password: string;
  }) => {
    const { data } = await api.post('/store/auth/login', credentials);
    return data;
  },

  // 获取当前用户信息
  getMe: async () => {
    const { data } = await api.get('/store/auth/me');
    return data;
  },

  // 更新用户资料
  updateProfile: async (profileData: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
  }) => {
    const { data } = await api.put('/store/auth/profile', profileData);
    return data;
  },

  // 修改密码
  changePassword: async (passwordData: {
    old_password: string;
    new_password: string;
  }) => {
    const { data } = await api.post('/store/auth/change-password', passwordData);
    return data;
  },

  // 登出
  logout: async () => {
    const { data } = await api.post('/store/auth/logout');
    return data;
  }
};

// 本地存储辅助函数
export const authStorage = {
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token);
  },
  
  getToken: () => {
    return localStorage.getItem('auth_token');
  },
  
  setUser: (user: any) => {
    localStorage.setItem('user_info', JSON.stringify(user));
  },
  
  getUser: () => {
    const userStr = localStorage.getItem('user_info');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  clear: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
  }
};

export default api;
