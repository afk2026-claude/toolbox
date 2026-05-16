import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function RandomGenerator() {
  const { toast } = useToast()
  const [mode, setMode] = useState<'number' | 'string'>('number')
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [numCount, setNumCount] = useState(1)
  const [strLength, setStrLength] = useState(8)
  const [strChars, setStrChars] = useState('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
  const [result, setResult] = useState('')

  const generate = () => {
    if (mode === 'number') {
      const nums: number[] = []
      for (let i = 0; i < numCount; i++) {
        nums.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
      setResult(nums.join(', '))
    } else {
      if (!strChars) return
      let r = ''
      const array = new Uint32Array(strLength)
      crypto.getRandomValues(array)
      for (let i = 0; i < strLength; i++) {
        r += strChars[array[i] % strChars.length]
      }
      setResult(r)
    }
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(result); toast('已复制到剪贴板') }
    catch { toast('复制失败', 'error') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="随机数生成器 - 在线随机数/随机字符串工具" description="免费的在线随机数生成器，支持生成指定范围的整数和小数随机数。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎲</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">随机数生成</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">生成指定范围的随机数和随机字符串</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('number')} className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${mode === 'number' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}>随机数</button>
          <button onClick={() => setMode('string')} className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${mode === 'string' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}>随机字符串</button>
        </div>

        {mode === 'number' ? (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">最小值</label>
              <input type="number" value={min} onChange={e => setMin(+e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">最大值</label>
              <input type="number" value={max} onChange={e => setMax(+e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">个数</label>
              <input type="number" min={1} max={100} value={numCount} onChange={e => setNumCount(+e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">长度</label>
              <input type="number" min={1} max={256} value={strLength} onChange={e => setStrLength(+e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">可用字符</label>
              <input value={strChars} onChange={e => setStrChars(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white" />
            </div>
          </div>
        )}

        <button onClick={generate} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium mb-4">生成</button>

        {result && (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
            <div className="text-lg font-mono text-gray-800 dark:text-white break-all">{result}</div>
            <button onClick={copy} className="mt-3 px-4 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm">复制</button>
          </div>
        )}
      </div>
    </div>
  )
}
