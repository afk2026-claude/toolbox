import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function PinyinConverter() {
  const { toast } = useToast()
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [tone, setTone] = useState(true)
  const [space, setSpace] = useState(false)

  const convert = async () => {
    if (!input.trim()) { setResult(''); return }
    try {
      const pp = await import('pinyin-pro')
      let r = pp.pinyin(input, { toneType: tone ? 'symbol' : 'none' })
      if (!space) r = r.replace(/\s/g, '')
      setResult(r)
    } catch {
      setResult('转换失败')
    }
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(result); toast('已复制到剪贴板') }
    catch { toast('复制失败', 'error') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="汉字转拼音 - 在线拼音转换工具" description="免费的在线汉字转拼音工具，支持带声调拼音、多音字识别和分词转换。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔤</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">汉字转拼音</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">将汉字转换为拼音，支持声调和多音字</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-slate-300">
            <input type="checkbox" checked={tone} onChange={e => setTone(e.target.checked)} className="rounded" />
            声调
          </label>
          <label className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-slate-300">
            <input type="checkbox" checked={space} onChange={e => setSpace(e.target.checked)} className="rounded" />
            空格分隔
          </label>
        </div>

        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="输入汉字..."
          className="w-full h-32 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:border-indigo-400 transition-colors" />
        <button onClick={convert} className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium">转换</button>

        {result && (
          <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
            <div className="text-lg font-mono text-gray-800 dark:text-white break-all">{result}</div>
            <button onClick={copy} className="mt-3 px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm">复制</button>
          </div>
        )}
      </div>
    </div>
  )
}
