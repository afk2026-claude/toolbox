import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVisitStats, getDailyTrend } from '../../engine/visitTracker'
import SEO from '../../components/SEO'

export default function DashboardPage() {
  const { isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState(getVisitStats())
  const [trend, setTrend] = useState(getDailyTrend(7))

  useEffect(() => {
    if (!isAdmin) navigate('/admin/login')
  }, [isAdmin, navigate])

  useEffect(() => {
    setStats(getVisitStats())
    setTrend(getDailyTrend(7))
  }, [])

  if (!isAdmin) return null

  const toolRanking = Object.entries(stats.toolVisits)
    .sort((a, b) => b[1] - a[1])

  return (
    <>
      <SEO title="管理后台 | 在线工具箱" />
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">管理后台</h1>
          <button
            onClick={() => { logout(); navigate('/') }}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            退出登录
          </button>
        </div>

        {/* 概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">总访问量</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalVisits}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">今日访问</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {stats.dailyVisits[new Date().toISOString().slice(0, 10)] || 0}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-1">工具数</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {Object.keys(stats.toolVisits).length}
            </p>
          </div>
        </div>

        {/* 近7天趋势 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 mb-8">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">近 7 天访问趋势</h2>
          <div className="flex items-end gap-3 h-32">
            {trend.map(d => {
              const max = Math.max(...trend.map(t => t.visits), 1)
              const h = (d.visits / max) * 100
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400">{d.visits}</span>
                  <div
                    className="w-full rounded-t-lg bg-indigo-500 dark:bg-indigo-600 transition-all"
                    style={{ height: `${Math.max(h, 2)}%` }}
                  />
                  <span className="text-xs text-gray-400">{d.date.slice(5)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 工具排行 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">工具使用排行</h2>
          {toolRanking.length === 0 ? (
            <p className="text-gray-400 text-sm">暂无数据</p>
          ) : (
            <div className="space-y-2">
              {toolRanking.map(([id, count], i) => (
                <div key={id} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-gray-400">{i + 1}</span>
                  <span className="flex-1 text-gray-700 dark:text-slate-200">{id}</span>
                  <span className="text-gray-500">{count} 次</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
