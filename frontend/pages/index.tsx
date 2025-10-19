import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [target, setTarget] = useState('');
  const [budget, setBudget] = useState('');
  const [occasion, setOccasion] = useState('');

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
        <title>小禮子 - AI 选礼平台</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-500 mb-4">
              🎁 小禮子
            </h1>
            <p className="text-neutral-500 text-lg">
              让送礼变成一件简单、有温度的事
            </p>
          </div>

          {/* 分类导航 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: '送女生', value: '女生', emoji: '👧' },
              { label: '送男生', value: '男生', emoji: '👦' },
              { label: '送长辈', value: '长辈', emoji: '👴' },
              { label: '送朋友', value: '朋友', emoji: '👫' },
              { label: '送同事', value: '同事', emoji: '👥' },
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
                  送给谁？
                </label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="例：女生、男生、长辈..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  预算（元）
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="例：300"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  场合（可选）
                </label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="例：生日、节日、感谢..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={!target || !budget}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🤖 AI 帮我选礼
              </button>
            </div>
          </div>

          {/* 精选推荐 */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              精选推荐
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: '手工香薰礼盒', price: 299, image: '/images/gifts/incense.jpg' },
                { name: '创意小夜灯', price: 199, image: '/images/gifts/lamp.jpg' },
                { name: '手绘陶瓷杯', price: 159, image: '/images/gifts/cup.jpg' },
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
