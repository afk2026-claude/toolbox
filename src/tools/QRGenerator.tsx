import { useState, useRef } from 'react'
import SEO from '../components/SEO'

export default function QRGenerator() {
  const [text, setText] = useState('https://github.com')
  const [size, setSize] = useState(256)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = async () => {
    if (!text.trim()) return
    try {
      const QRCode = await import('qrcode')
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: '#1e1e2e', light: '#ffffff' },
      })
      setQrDataUrl(url)
    } catch {
      // ignore
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="二维码生成器 - 在线免费二维码生成" description="免费的在线二维码生成器，支持文本、网址、名片等内容生成二维码，可下载 PNG。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📱</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">二维码生成</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">生成文本、网址等内容的二维码图片</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="flex gap-3 mb-4">
          <input value={text} onChange={e => setText(e.target.value)} placeholder="输入文本或网址..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:border-indigo-400 transition-colors"
            onKeyDown={e => e.key === 'Enter' && generate()} />
          <select value={size} onChange={e => setSize(Number(e.target.value))}
            className="px-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-600 dark:text-slate-300">
            <option value="128">小</option>
            <option value="256">中</option>
            <option value="512">大</option>
          </select>
        </div>
        <button onClick={generate} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium mb-4">生成二维码</button>

        {qrDataUrl && (
          <div className="flex flex-col items-center">
            <img src={qrDataUrl} alt="二维码" className="rounded-xl shadow-sm" />
            <button onClick={download} className="mt-4 px-6 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm">下载 PNG</button>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
