import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function JsonFormatter() {
  const { toast } = useToast()
  const [input, setInput] = useState(`{
  "name": "在线工具箱",
  "version": "1.0.0",
  "tools": ["JSON格式化", "Base64", "二维码"],
  "settings": {
    "theme": "auto",
    "lang": "zh-CN"
  },
  "active": true
}`)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [compact, setCompact] = useState(false)

  const format = () => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, compact ? 0 : 2))
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(output); toast('已复制到剪贴板') }
    catch { toast('复制失败', 'error') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="JSON 格式化工具 - 在线 JSON 解析验证" description="免费的在线 JSON 格式化工具，支持格式化、压缩、验证和错误定位。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📋</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">JSON 格式化</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">格式化、压缩和验证 JSON 数据</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
            <input type="checkbox" checked={compact} onChange={e => setCompact(e.target.checked)} className="rounded" />
            压缩模式
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="粘贴 JSON 数据..."
              className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:border-indigo-400 transition-colors"
              spellCheck={false}
            />
            <button onClick={format} className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium">
              格式化
            </button>
          </div>
          <div>
            <textarea
              value={output}
              readOnly
              placeholder="结果..."
              className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white resize-none"
              spellCheck={false}
            />
            {output && (
              <button onClick={copy} className="mt-3 w-full py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer font-medium">
                复制结果
              </button>
            )}
          </div>
        </div>
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
