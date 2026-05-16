import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

export default function PasswordGenerator() {
  const { toast } = useToast()
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState(0)

  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const num = '0123456789'
    const sym = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    let chars = ''
    if (uppercase) chars += upper
    if (lowercase) chars += lower
    if (numbers) chars += num
    if (symbols) chars += sym

    if (!chars) { setPassword('请选择至少一种字符类型'); return }

    let result = ''
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }
    setPassword(result)

    // 计算强度
    let score = 0
    if (length >= 8) score += 25
    if (length >= 12) score += 15
    if (length >= 16) score += 10
    if (uppercase) score += 15
    if (lowercase) score += 15
    if (numbers) score += 15
    if (symbols) score += 20
    if (length >= 20) score += 10
    setStrength(Math.min(100, score))
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(password); toast('已复制到剪贴板') }
    catch { toast('复制失败', 'error') }
  }

  const strengthColor = strength < 40 ? 'bg-red-500' : strength < 70 ? 'bg-yellow-500' : 'bg-green-500'
  const strengthLabel = strength < 40 ? '弱' : strength < 70 ? '中' : '强'

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="密码生成器 - 在线高强度随机密码生成" description="免费的在线密码生成器，可配置长度、字符类型，生成高强度随机密码。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔑</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">密码生成器</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">生成高强度随机密码，可配置规则</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 space-y-5">
        {password && (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
            <div className="text-xl font-mono text-gray-800 dark:text-white break-all text-center">{password}</div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-slate-700">
                <div className={`h-2 rounded-full ${strengthColor} transition-all`} style={{ width: `${strength}%` }} />
              </div>
              <span className="text-xs text-gray-500">{strengthLabel}</span>
              <button onClick={copy} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm">复制</button>
            </div>
          </div>
        )}

        <div>
          <label className="text-sm text-gray-500 dark:text-slate-400">密码长度: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={e => setLength(+e.target.value)} className="w-full accent-indigo-600" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: '大写字母 A-Z', value: uppercase, set: setUppercase },
            { label: '小写字母 a-z', value: lowercase, set: setLowercase },
            { label: '数字 0-9', value: numbers, set: setNumbers },
            { label: '符号 !@#$%', value: symbols, set: setSymbols },
          ].map(c => (
            <label key={c.label} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 transition-colors">
              <input type="checkbox" checked={c.value} onChange={e => c.set(e.target.checked)} className="rounded accent-indigo-600" />
              <span className="text-sm text-gray-600 dark:text-slate-300">{c.label}</span>
            </label>
          ))}
        </div>

        <button onClick={generate} className="w-full py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium">
          生成密码
        </button>
      </div>
    </div>
  )
}
