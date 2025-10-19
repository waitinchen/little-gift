import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { generateCard } from '@/lib/api';

export default function CardPage() {
  const router = useRouter();
  const { target, occasion, giftId, giftName, giftPrice } = router.query;
  
  const [card, setCard] = useState({ message: '', style: '' });
  const [loading, setLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (target) {
      loadCard();
    }
  }, [target, occasion]);

  const loadCard = async () => {
    try {
      setLoading(true);
      const cardData = await generateCard({
        target: target as string,
        occasion: occasion as string,
      });
      setCard(cardData);
      setCustomMessage(cardData.message);
    } catch (error) {
      console.error('Failed to generate card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = () => {
    router.push({
      pathname: '/pay',
      query: {
        target,
        giftId,
        giftName,
        giftPrice,
        message: customMessage,
      }
    });
  };

  return (
    <>
      <Head>
        <title>卡片預覽 - 小禮子</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="text-neutral-500 hover:text-neutral-700 mb-4"
          >
            ← 返回
          </button>

          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
              💌 预览你的心意卡片
            </h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
                <p className="mt-4 text-neutral-500">AI 正在生成卡片...</p>
              </div>
            ) : (
              <>
                {/* 卡片预览 */}
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-12 mb-8 shadow-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🎁</div>
                    <p className="text-xl text-neutral-800 leading-relaxed">
                      {customMessage}
                    </p>
                  </div>
                </div>

                {/* 编辑文案 */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    编辑祝福语（可选）
                  </label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* 礼物信息 */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <h3 className="font-bold text-neutral-900 mb-4">礼物信息</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-neutral-900">{giftName}</p>
                      <p className="text-sm text-neutral-500">送给：{target}</p>
                    </div>
                    <p className="text-primary-500 font-bold text-xl">Ｄ{giftPrice}</p>
                  </div>
                </div>

                {/* 确认按钮 */}
                <button
                  onClick={handleProceedToPayment}
                  className="w-full btn-primary"
                >
                  确认并继续付款 →
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
