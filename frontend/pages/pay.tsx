import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PayPage() {
  const router = useRouter();
  const { target, giftId, giftName, giftPrice, message } = router.query;
  
  const [paying, setPaying] = useState(false);

  const handlePayment = async () => {
    setPaying(true);
    
    // Mock 付款流程（生产环境接入真实支付）
    setTimeout(() => {
      // 生成模拟订单 ID
      const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      router.push({
        pathname: '/success',
        query: { orderId: mockOrderId }
      });
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>付款 - 小禮子</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
              💳 确认付款
            </h1>

            {/* 订单摘要 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="font-bold text-neutral-900 mb-6">订单摘要</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex justify-between">
                  <span className="text-neutral-600">礼物名称</span>
                  <span className="font-medium text-neutral-900">{giftName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">送给</span>
                  <span className="font-medium text-neutral-900">{target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">祝福语</span>
                  <span className="text-sm text-neutral-600 text-right max-w-xs">{message}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xl">
                <span className="font-bold text-neutral-900">合计</span>
                <span className="font-bold text-primary-500">Ｄ{giftPrice}</span>
              </div>
            </div>

            {/* 支付方式 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="font-bold text-neutral-900 mb-4">支付方式</h3>
              <div className="space-y-3">
                <div className="p-4 border-2 border-primary-500 rounded-lg bg-primary-50">
                  <div className="flex items-center">
                    <input type="radio" checked readOnly className="mr-3" />
                    <span className="font-medium">💳 Mock 支付（测试模式）</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 px-4">
                  🚧 MVP 阶段使用模拟支付，v0.2 将接入 LINE Pay
                </p>
              </div>
            </div>

            {/* 付款按钮 */}
            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {paying ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  处理中...
                </>
              ) : (
                `确认付款 Ｄ${giftPrice}`
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
