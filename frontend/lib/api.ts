import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;
