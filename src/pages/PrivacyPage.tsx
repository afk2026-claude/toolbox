import SEO from '../components/SEO'

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <SEO title="隐私政策 - 在线工具箱" description="在线工具箱隐私政策，说明我们如何收集、使用和保护您的信息。" />
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🔒</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">隐私政策</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">最后更新：2026 年 5 月</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 space-y-6 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">1. 信息收集</h2>
          <p>本工具箱中的所有工具均在浏览器本地运行。您输入或上传的任何数据都不会被发送到任何服务器。</p>
          <p className="mt-2">我们可能会收集以下匿名信息：</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>页面访问统计（使用 localStorage 本地存储，不上传服务器）</li>
            <li>浏览器类型和版本（用于兼容性优化）</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">2. 数据存储</h2>
          <p>所有数据均在您的浏览器本地处理：</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>您上传的文件仅用于本地计算，不会被上传或存储</li>
            <li>工具使用记录仅保存在浏览器 localStorage 中</li>
            <li>您可以随时清除浏览器数据来删除所有本地存储的信息</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">3. 第三方服务</h2>
          <p>本网站使用 Google AdSense 展示广告。Google 可能会使用 Cookie 来提供个性化广告。您可以访问 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google 隐私政策</a> 了解更多。</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">4. Cookie</h2>
          <p>我们使用 minimal 的 Cookie：</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><strong>必要 Cookie</strong>：用于保存主题偏好（暗色/亮色模式）</li>
            <li><strong>广告 Cookie</strong>：由 Google AdSense 设置，用于展示相关广告</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">5. 联系我们</h2>
          <p>如果您对本隐私政策有任何疑问，请通过 GitHub Issues 联系我们。</p>
        </section>
      </div>
    </div>
  )
}
