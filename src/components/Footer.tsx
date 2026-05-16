export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} 在线工具箱 · 免费实用的开发者工具集</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">隐私政策</a>
            <span className="hidden md:inline">在线处理，数据不上传服务器，保护你的隐私</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
