import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function Base64Tool() {
  const { toast } = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch (e: any) {
      setError(e.message || '转换失败，请检查输入')
      setOutput('')
    }
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(output); toast('已复制到剪贴板') }
    catch { toast('复制失败', 'error') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="Base64 编解码 - 在线 Base64 转换工具" description="免费的在线 Base64 编解码工具，支持文本和文件的 Base64 编码与解码，兼容中文。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔐</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Base64 编解码</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Base64 编码与解码，支持中文</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}
          >
            编码 Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}
          >
            解码 Decode
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-2 block">
              {mode === 'encode' ? '输入文本' : '输入 Base64 字符串'}
            </label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入 Base64 字符串...'}
              className="w-full h-48 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 resize-none focus:border-indigo-400 transition-colors"
              spellCheck={false}
            />
            <button onClick={convert} className="mt-3 w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium">
              {mode === 'encode' ? '编码 →' : '解码 →'}
            </button>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-2 block">结果</label>
            <textarea
              value={output}
              readOnly
              placeholder="结果..."
              className="w-full h-48 p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white resize-none"
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
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">{error}</div>
        )}
      </div>
    </div>
  )
}
