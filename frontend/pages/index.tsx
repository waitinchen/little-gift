import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authStorage } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [target, setTarget] = useState('');
  const [budget, setBudget] = useState('');
  const [occasion, setOccasion] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查用户登录状态
    const userInfo = authStorage.getUser();
    const token = authStorage.getToken();
    
    if (userInfo && token) {
      setUser(userInfo);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    if (target && budget) {
      router.push({
        pathname: '/select',
        query: { target, budget, occasion }
      });
    }
  };

  return (
    <>
      <Head>
        <title>小禮子 - AI 選禮平台</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          {/* 用户状态栏 */}
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-neutral-600">
                    歡迎，{user?.first_name || user?.email}
                  </span>
                  <button
                    onClick={() => {
                      authStorage.clear();
                      setIsLoggedIn(false);
                      setUser(null);
                    }}
                    className="text-sm text-neutral-500 hover:text-neutral-700"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => router.push('/login')}
                    className="text-sm text-neutral-600 hover:text-primary-500"
                  >
                    登入
                  </button>
                  <button
                    onClick={() => router.push('/register')}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    註冊
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-500 mb-4">
              🎁 小禮子
            </h1>
            <p className="text-neutral-500 text-lg">
              讓送禮變成一件簡單、有溫度的事
            </p>
          </div>

          {/* 分类导航 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: '送同事', value: '同事', emoji: '👥' },
              { label: '送主管', value: '主管', emoji: '👔' },
              { label: '送客戶', value: '客戶', emoji: '🤝' },
              { label: '送朋友', value: '朋友', emoji: '👫' },
              { label: '送家人', value: '家人', emoji: '👨‍👩‍👧‍👦' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setTarget(cat.value)}
                className={`p-4 rounded-xl text-center transition-all ${
                  target === cat.value
                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="text-3xl mb-2">{cat.emoji}</div>
                <div className="font-medium">{cat.label}</div>
              </button>
            ))}
          </div>

          {/* 搜索表单 */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  送給誰？
                </label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">請選擇送禮對象</option>
                  <option value="同事">同事</option>
                  <option value="主管">主管</option>
                  <option value="客戶">客戶</option>
                  <option value="朋友">朋友</option>
                  <option value="家人">家人</option>
                  <option value="合作夥伴">合作夥伴</option>
                  <option value="老師">老師</option>
                  <option value="長輩">長輩</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  預算（新台幣）
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">請選擇預算範圍</option>
                  <option value="500">$500 以下</option>
                  <option value="1000">$500 - $1,000</option>
                  <option value="2000">$1,000 - $2,000</option>
                  <option value="3000">$2,000 - $3,000</option>
                  <option value="5000">$3,000 - $5,000</option>
                  <option value="10000">$5,000 - $10,000</option>
                  <option value="20000">$10,000 以上</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  場合（可選）
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">請選擇送禮場合</option>
                  <option value="生日">生日</option>
                  <option value="升職">升職</option>
                  <option value="離職">離職</option>
                  <option value="節日">節日</option>
                  <option value="感謝">感謝</option>
                  <option value="道歉">道歉</option>
                  <option value="慶祝">慶祝</option>
                  <option value="慰問">慰問</option>
                  <option value="合作">合作</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <button
                onClick={handleSearch}
                disabled={!target || !budget}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🤖 AI 幫我選禮
              </button>
            </div>
          </div>

          {/* 精選推薦 */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              精選推薦
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: '手工香薰禮盒', price: 299, image: '/images/gifts/incense.jpg' },
                { name: '創意小夜燈', price: 199, image: '/images/gifts/lamp.jpg' },
                { name: '手繪陶瓷杯', price: 159, image: '/images/gifts/cup.jpg' },
              ].map((gift) => (
                <div key={gift.name} className="gift-card p-4">
                  <div className="bg-neutral-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                    <span className="text-5xl">🎁</span>
                  </div>
                  <h3 className="font-medium text-neutral-900 mb-2">{gift.name}</h3>
                  <p className="text-primary-500 font-bold">¥{gift.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
