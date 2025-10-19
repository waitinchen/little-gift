export default function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎁 小禮子测试页面
        </h1>
        <p className="text-gray-600 mb-8">
          如果您看到这个页面，说明 Vercel 部署成功了！
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-500">
            部署时间: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
