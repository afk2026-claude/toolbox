import { useState, useRef } from 'react'
import SEO from '../components/SEO'

export default function QRDecoder() {
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const decodeImage = async (data: ImageData) => {
    const jsQR = (await import('jsqr')).default
    const code = jsQR(data.data, data.width, data.height)
    if (code) {
      setResult(code.data)
      setError('')
    } else {
      setResult('')
      setError('未识别到二维码')
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setImgUrl(url)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      decodeImage(ctx.getImageData(0, 0, img.width, img.height))
    }
    img.src = url
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="二维码解码器 - 在线识别二维码内容" description="免费的在线二维码解码工具，上传二维码图片即可识别内容，本地处理不上传服务器。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📷</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">二维码解码</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">从图片中识别并解码二维码内容</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors mb-4">
          <span className="text-2xl mb-1">📤</span>
          <span className="text-sm text-gray-400">上传二维码图片</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>

        {imgUrl && <img src={imgUrl} alt="上传的二维码" className="max-w-48 mx-auto rounded-xl mb-4" />}

        {result && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">识别结果：</p>
            <p className="text-sm font-mono text-gray-800 dark:text-white break-all">{result}</p>
          </div>
        )}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
