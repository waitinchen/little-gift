import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { recommendGifts } from '@/lib/api';

interface Gift {
  productId: string;
  name: string;
  price: number;
  image: string;
  reason: string;
}

export default function SelectPage() {
  const router = useRouter();
  const { target, budget, occasion } = router.query;
  
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  useEffect(() => {
    if (target && budget) {
      loadRecommendations();
    }
  }, [target, budget, occasion]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const recommendations = await recommendGifts({
        target: target as string,
        budget: parseInt(budget as string),
        occasion: occasion as string,
      });
      setGifts(recommendations);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGift = (gift: Gift) => {
    setSelectedGift(gift);
    router.push({
      pathname: '/card',
      query: { 
        target, 
        occasion,
        giftId: gift.productId,
        giftName: gift.name,
        giftPrice: gift.price,
      }
    });
  };

  return (
    <>
      <Head>
        <title>AI 推荐结果 - 小禮子</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="text-neutral-500 hover:text-neutral-700 mb-4"
            >
              ← 返回
            </button>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              🤖 AI 为您精选的礼物
            </h1>
            <p className="text-neutral-500">
              送给：{target} | 预算：Ｄ{budget}
              {occasion && ` | 场合：${occasion}`}
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
              <p className="mt-4 text-neutral-500">AI 正在为您精心挑选...</p>
            </div>
          )}

          {/* Recommendations */}
          {!loading && gifts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.map((gift) => (
                <div
                  key={gift.productId}
                  className="gift-card p-6 cursor-pointer hover:scale-105"
                  onClick={() => handleSelectGift(gift)}
                >
                  <div className="bg-neutral-100 rounded-lg h-64 mb-4 flex items-center justify-center">
                    <span className="text-6xl">🎁</span>
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-2">
                    {gift.name}
                  </h3>
                  <p className="text-primary-500 font-bold text-xl mb-3">
                    Ｄ{gift.price}
                  </p>
                  <p className="text-neutral-600 text-sm">
                    💡 {gift.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && gifts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">
                暂无符合条件的礼物，请调整搜索条件。
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
