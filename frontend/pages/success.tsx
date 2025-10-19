import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getGiftLink } from '@/lib/api';

export default function SuccessPage() {
  const router = useRouter();
  const { orderId } = router.query;
  
  const [giftLink, setGiftLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderId) {
      loadGiftLink();
    }
  }, [orderId]);

  const loadGiftLink = async () => {
    try {
      setLoading(true);
      const data = await getGiftLink(orderId as string);
      const link = `${window.location.origin}/gift/${data.token}`;
      setGiftLink(link);
    } catch (error) {
      console.error('Failed to get gift link:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(giftLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>付款成功 - 小禮子</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* 成功动画 */}
            <div className="text-center mb-8">
              <div className="inline-block animate-bounce text-8xl mb-4">
                ✅
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                礼物已准备好！
              </h1>
              <p className="text-neutral-500">
                现在可以把这份心意送给 TA 了 🎁
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
                <p className="mt-4 text-neutral-500">生成礼物链接中...</p>
              </div>
            ) : (
              <>
                {/* 礼物链接 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h3 className="font-bold text-neutral-900 mb-4">
                    🔗 礼物链接
                  </h3>
                  <p className="text-sm text-neutral-500 mb-4">
                    分享这个链接给对方， TA 填写地址后就能收到礼物！
                  </p>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={giftLink}
                      readOnly
                      className="flex-1 px-4 py-3 border border-neutral-200 rounded-lg bg-neutral-50 text-sm"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
                    >
                      {copied ? '✅ 已复制' : '复制链接'}
                    </button>
                  </div>
                </div>

                {/* 分享按钮 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h3 className="font-bold text-neutral-900 mb-4">
                    📤 分享给 TA
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all">
                      <div className="text-3xl mb-2">📱</div>
                      <div className="text-sm font-medium">LINE</div>
                    </button>
                    <button className="p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all">
                      <div className="text-3xl mb-2">💬</div>
                      <div className="text-sm font-medium">微信</div>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 mt-4 text-center">
                    🚧 v0.2 将支持直接分享到 LINE
                  </p>
                </div>

                {/* 返回首页 */}
                <button
                  onClick={() => router.push('/')}
                  className="w-full btn-secondary"
                >
                  返回首页
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
