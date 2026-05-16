import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function WordCounter() {
  const [text, setText] = useState('这是一段示例文本，用于测试字数统计功能。\n\n在线工具箱提供了各类实用工具，包括字数统计、Markdown预览、文本对比等。\n\nReact + TypeScript + Tailwind CSS 构建，所有处理都在浏览器本地完成。')
  const { toast } = useToast()

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    cjk: (text.match(/[一-鿿㐀-䶿豈-﫿]/g) || []).length,
  }

  const statsText = `总字符数: ${stats.chars}\n不含空格: ${stats.charsNoSpace}\n单词数: ${stats.words}\n行数: ${stats.lines}\n段落数: ${stats.paragraphs}\n中文字数: ${stats.cjk}`

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="字数统计 - 在线中英文字数统计工具" description="免费的在线字数统计工具，支持中文和英文字数、字符数、行数、段落数统计。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📝</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">字数统计</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">统计文本的字数、字符数、行数和段落数</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="输入或粘贴文本..."
          className="w-full h-48 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:border-indigo-400 transition-colors" spellCheck={false} />

        <button onClick={() => { navigator.clipboard.writeText(statsText); toast('统计结果已复制') }}
          className="mt-4 w-full py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-sm text-gray-500 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer">复制统计结果</button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[
            { label: '总字符数', value: stats.chars },
            { label: '不含空格', value: stats.charsNoSpace },
            { label: '单词数', value: stats.words },
            { label: '行数', value: stats.lines },
            { label: '段落数', value: stats.paragraphs },
            { label: '中文字数', value: stats.cjk },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
