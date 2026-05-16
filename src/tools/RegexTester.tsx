import { useState, useMemo } from 'react'
import SEO from '../components/SEO'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('gm')
  const [text, setText] = useState('')

  const result = useMemo(() => {
    if (!pattern) return { matches: [], count: 0, error: null as string | null }
    try {
      const regex = new RegExp(pattern, flags)
      const matches: string[] = []
      let m: RegExpExecArray | null
      const global = flags.includes('g')
      const str = text
      if (global) {
        while ((m = regex.exec(str)) !== null) {
          matches.push(m[0])
          if (m.index === regex.lastIndex) regex.lastIndex++
        }
      } else {
        m = regex.exec(str)
        if (m) matches.push(m[0])
      }
      return { matches, count: matches.length, error: null }
    } catch (e: any) {
      return { matches: [], count: 0, error: e.message }
    }
  }, [pattern, flags, text])

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="正则表达式测试工具 - 在线正则调试" description="免费的在线正则表达式测试工具，支持实时匹配、高亮显示和 flags 配置。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔍</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">正则测试</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">在线正则表达式测试，实时匹配高亮显示</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-1.5 block">正则表达式</label>
            <input
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="/your-pattern/"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 focus:border-indigo-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-1.5 block">Flags</label>
            <input
              value={flags}
              onChange={e => setFlags(e.target.value)}
              placeholder="gim"
              className="w-24 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 focus:border-indigo-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500 dark:text-slate-400 mb-1.5 block">测试文本</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入要匹配的文本..."
            className="w-full h-40 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:border-indigo-400 transition-colors" spellCheck={false} />
        </div>

        <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
          {result.error ? (
            <p className="text-red-500 text-sm">{result.error}</p>
          ) : pattern ? (
            <p className="text-sm text-gray-600 dark:text-slate-300">
              匹配到 <strong className="text-indigo-600 dark:text-indigo-400">{result.count}</strong> 个结果
            </p>
          ) : (
            <p className="text-gray-400 text-sm">输入正则表达式开始测试</p>
          )}
          {result.matches.length > 0 && (
            <div className="mt-3 max-h-40 overflow-y-auto space-y-1">
              {result.matches.map((m, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-sm font-mono text-indigo-700 dark:text-indigo-300 break-all">{m}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
