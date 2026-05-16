import { NavLink } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 - 页面未找到 | 在线工具箱" />
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-8xl mb-6">404</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">页面未找到</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8">你访问的页面不存在或已被移除</p>
        <NavLink
          to="/"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors no-underline"
        >
          返回首页
        </NavLink>
      </div>
    </>
  )
}
