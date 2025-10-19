import { useState, useEffect } from 'react';
import Head from 'next/head';
import { authStorage } from '@/lib/api';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const userInfo = authStorage.getUser();
    if (userInfo && userInfo.role === 'admin') {
      setUser(userInfo);
      // 这里应该调用 API 获取统计数据
      setStats({
        totalUsers: 156,
        totalOrders: 89,
        totalProducts: 24,
        totalRevenue: 125000
      });
    } else {
      // 重定向到登录页面
      window.location.href = '/login';
    }
  }, []);

  if (!user) {
    return <div>載入中...</div>;
  }

  return (
    <>
      <Head>
        <title>管理後台 - 小禮子</title>
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* 側邊欄 */}
          <div className="w-64 bg-white shadow-lg">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-primary-500">🎁 小禮子</h1>
              <p className="text-sm text-gray-500 mt-2">管理後台</p>
            </div>
            <nav className="mt-8">
              <a href="/admin/dashboard" className="block px-6 py-3 text-primary-500 bg-primary-50 border-r-4 border-primary-500">
                儀表板
              </a>
              <a href="/admin/products" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">
                商品管理
              </a>
              <a href="/admin/orders" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">
                訂單管理
              </a>
              <a href="/admin/users" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">
                用戶管理
              </a>
            </nav>
          </div>

          {/* 主內容區 */}
          <div className="flex-1 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">儀表板</h2>
              <p className="text-gray-600">歡迎回來，{user.first_name || user.email}</p>
            </div>

            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">總用戶數</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">總訂單數</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">商品總數</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">總營收</p>
                    <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 最近活動 */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">最近活動</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-900">新用戶註冊</p>
                      <p className="text-xs text-gray-500">2 分鐘前</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-900">新訂單 #12345</p>
                      <p className="text-xs text-gray-500">5 分鐘前</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-900">商品庫存不足</p>
                      <p className="text-xs text-gray-500">10 分鐘前</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
