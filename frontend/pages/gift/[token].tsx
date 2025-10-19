import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { redeemGift } from '@/lib/api';

export default function GiftRedeemPage() {
  const router = useRouter();
  const { token } = router.query;
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postal_code: '',
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.address1) {
      alert('请填写必填项目');
      return;
    }

    try {
      setSubmitting(true);
      await redeemGift(token as string, {
        recipient_name: form.name,
        recipient_phone: form.phone,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        postal_code: form.postal_code,
        country_code: 'TW',
      });
      setSuccess(true);
    } catch (error) {
      alert('提交失败，请重试');
      console.error('Failed to redeem gift:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <>
        <Head>
          <title>收社成功 - 小禮子</title>
        </Head>
        <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="animate-bounce text-8xl mb-6">❤️</div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              已成功收下！
            </h1>
            <p className="text-neutral-600 mb-8">
              礼物正在准备中，请耐心等待 😊
            </p>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-sm text-neutral-500">
                送礼者已收到通知，你的心意已顺利传达 ✨
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>收礼 - 小禮子</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* 卡片展示 */}
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-12 mb-8 shadow-lg">
              <div className="text-center">
                <div className="text-6xl mb-6 animate-pulse">🎁</div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                  你收到一份礼物！
                </h1>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  给最努力的你，一点小惊喜，让今天也闪闪发光 ✨
                </p>
              </div>
            </div>

            {/* 收件表单 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                📬 填写收件资料
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    收件人姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="请输入姓名"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    联系电话
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="请输入电话号码"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    详细地址 *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address1}
                    onChange={(e) => handleChange('address1', e.target.value)}
                    placeholder="例：中山区南京东路 123 号"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    地址5行第2栏（选填）
                  </label>
                  <input
                    type="text"
                    value={form.address2}
                    onChange={(e) => handleChange('address2', e.target.value)}
                    placeholder="例：5 楼 A 室"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      城市
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="例：台北市"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      邮编
                    </label>
                    <input
                      type="text"
                      value={form.postal_code}
                      onChange={(e) => handleChange('postal_code', e.target.value)}
                      placeholder="例：100"
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      提交中...
                    </>
                  ) : (
                    '❤️ 我要收下'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
