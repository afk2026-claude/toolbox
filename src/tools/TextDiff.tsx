import { useState, useMemo } from 'react'
import SEO from '../components/SEO'

export default function TextDiff() {
  const [oldText, setOldText] = useState(`第一行保持不变
第二行有修改
第三行已被删除
第四行相同`)
  const [newText, setNewText] = useState(`第一行保持不变
第二行已被修改为这个内容
第四行相同
第五行是新增的`)

  const diffResult = useMemo(() => {
    if (!oldText && !newText) return []
    const oldLines = oldText.split('\n')
    const newLines = newText.split('\n')
    const maxLen = Math.max(oldLines.length, newLines.length)
    const result: { type: 'same' | 'add' | 'remove'; content: string }[] = []

    for (let i = 0; i < maxLen; i++) {
      const o = oldLines[i] ?? ''
      const n = newLines[i] ?? ''
      if (o === n) {
        result.push({ type: 'same', content: o })
      } else {
        if (i < oldLines.length) result.push({ type: 'remove', content: o })
        if (i < newLines.length) result.push({ type: 'add', content: n })
      }
    }
    return result
  }, [oldText, newText])

  return (
    <div className="max-w-5xl mx-auto">
      <SEO title="文本对比 - 在线文本差异比较工具" description="免费的在线文本差异对比工具，逐行比较两段文本的差异，高亮显示新增、删除和修改的内容。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔀</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">文本对比</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">对比两段文本的差异，高亮增删改</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <p className="text-xs text-gray-400 mb-2">原始文本</p>
          <textarea value={oldText} onChange={e => setOldText(e.target.value)} placeholder="原始文本..."
            className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white resize-none focus:border-indigo-400 transition-colors" spellCheck={false} />
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <p className="text-xs text-gray-400 mb-2">新文本</p>
          <textarea value={newText} onChange={e => setNewText(e.target.value)} placeholder="新文本..."
            className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white resize-none focus:border-indigo-400 transition-colors" spellCheck={false} />
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <p className="text-xs text-gray-400 mb-2">差异结果</p>
          <div className="h-64 overflow-y-auto font-mono text-sm">
            {diffResult.length === 0 ? (
              <p className="text-gray-400 p-2">输入文本开始比较</p>
            ) : (
              diffResult.map((d, i) => (
                <div key={i} className={`px-2 py-0.5 ${
                  d.type === 'add' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  d.type === 'remove' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                  'text-gray-600 dark:text-slate-300'
                }`}>
                  <span className="mr-2 select-none text-xs opacity-50">{d.type === 'add' ? '+' : d.type === 'remove' ? '-' : ' '}</span>
                  {d.content || ' '}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
