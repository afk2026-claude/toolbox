import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [tsResult, setTsResult] = useState('')
  const [dateResult, setDateResult] = useState('')
  const { toast } = useToast()

  const tsToDate = () => {
    const ms = parseInt(timestamp)
    if (isNaN(ms)) { setTsResult('请输入有效数字'); return }
    // 如果是秒级时间戳（10位），转毫秒
    const d = new Date(ms < 1e12 ? ms * 1000 : ms)
    setTsResult(d.toLocaleString('zh-CN', { hour12: false }) + ' (本地时间)')
  }

  const dateToTs = () => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) { setDateResult('请输入有效日期时间'); return }
    setDateResult(`秒级: ${Math.floor(d.getTime() / 1000)}\n毫秒级: ${d.getTime()}`)
  }

  const now = () => {
    const d = new Date()
    setTimestamp(String(d.getTime()))
    setTsResult(d.toLocaleString('zh-CN', { hour12: false }) + ' (本地时间)')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="时间戳转换 - Unix 时间戳在线转换工具" description="免费的在线时间戳转换工具，支持 Unix 时间戳与日期时间格式的双向转换。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">⏰</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">时间戳转换</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Unix 时间戳与日期时间的双向转换</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 时间戳 → 日期 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-3">时间戳 → 日期时间</h2>
          <input value={timestamp} onChange={e => setTimestamp(e.target.value)} placeholder="输入时间戳（秒或毫秒）"
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 mb-3 focus:border-indigo-400 transition-colors" />
          <div className="flex gap-2">
            <button onClick={tsToDate} className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium text-sm">转换 →</button>
            <button onClick={now} className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm">现在</button>
          </div>
          {tsResult && <div className="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 text-sm text-gray-700 dark:text-slate-200 relative group">
            {tsResult}
            <button onClick={() => { navigator.clipboard.writeText(tsResult); toast('已复制') }}
              className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-gray-200 dark:bg-slate-700 text-xs text-gray-500 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">复制</button>
          </div>}
        </div>

        {/* 日期 → 时间戳 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-3">日期时间 → 时间戳</h2>
          <input type="datetime-local" value={dateStr} onChange={e => setDateStr(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white mb-3 focus:border-indigo-400 transition-colors" />
          <button onClick={dateToTs} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium text-sm">转换 →</button>
          {dateResult && <div className="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 text-sm text-gray-700 dark:text-slate-200 whitespace-pre-line font-mono relative group">
            {dateResult}
            <button onClick={() => { navigator.clipboard.writeText(dateResult); toast('已复制') }}
              className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-gray-200 dark:bg-slate-700 text-xs text-gray-500 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">复制</button>
          </div>}
        </div>
      </div>
    </div>
  )
}
