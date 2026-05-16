import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function UUIDGenerator() {
  const { toast } = useToast()
  const [count, setCount] = useState(5)
  const [format, setFormat] = useState<'standard' | 'nohyphen' | 'upper'>('standard')
  const [uuids, setUuids] = useState<string[]>([])

  const generate = () => {
    const result: string[] = []
    for (let i = 0; i < count; i++) {
      const rawUuid = crypto.randomUUID()
      let uuid: string = rawUuid
      if (format === 'nohyphen') uuid = rawUuid.replace(/-/g, '')
      if (format === 'upper') uuid = rawUuid.toUpperCase()
      result.push(uuid)
    }
    setUuids(result)
  }

  const copyAll = async () => {
    try { await navigator.clipboard.writeText(uuids.join('\n')); toast('已复制到剪贴板') }
    catch { toast('复制失败', 'error') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="UUID 生成器 - 在线 UUID v4 批量生成" description="免费的在线 UUID 生成器，批量生成 UUID v4 唯一标识符。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🆔</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">UUID 生成</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">批量生成 UUID v4 唯一标识符</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">数量:</span>
            <input type="number" min={1} max={100} value={count} onChange={e => setCount(Math.min(100, Math.max(1, +e.target.value || 1)))}
              className="w-20 px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white text-center" />
          </div>
          <div className="flex gap-2">
            {([['standard', '标准'], ['nohyphen', '无横杠'], ['upper', '大写']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setFormat(key)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${format === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}>{label}</button>
            ))}
          </div>
        </div>

        <button onClick={generate} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium mb-4">生成</button>

        {uuids.length > 0 && (
          <div>
            <div className="max-h-64 overflow-y-auto space-y-1 mb-3">
              {uuids.map((uuid, i) => (
                <div key={i} className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-900 font-mono text-sm text-gray-700 dark:text-slate-200 break-all">{uuid}</div>
              ))}
            </div>
            <button onClick={copyAll} className="w-full py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm">复制全部</button>
          </div>
        )}
      </div>
    </div>
  )
}
