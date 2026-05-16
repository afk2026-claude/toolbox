import { useState, useRef } from 'react'
import SEO from '../components/SEO'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(0.7)
  const [preview, setPreview] = useState('')
  const [compressed, setCompressed] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setOriginalSize(f.size)
    const url = URL.createObjectURL(f)
    setPreview(url)
    compress(f, quality)
  }

  const compress = (f: File, q: number) => {
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(blob => {
        if (!blob) return
        setCompressedSize(blob.size)
        setCompressed(URL.createObjectURL(blob))
      }, f.type || 'image/jpeg', q)
    }
    img.src = URL.createObjectURL(f)
  }

  const handleQualityChange = (q: number) => {
    setQuality(q)
    if (file) compress(file, q)
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = compressed
    a.download = `compressed_${file?.name || 'image'}`
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="图片压缩 - 在线 PNG/JPEG 图片压缩工具" description="免费的在线图片压缩工具，支持 PNG 和 JPEG 格式，浏览器本地处理不上传服务器。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🖼️</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">图片压缩</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">压缩 PNG/JPEG 图片，降低文件大小</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
          <span className="text-2xl mb-1">📁</span>
          <span className="text-sm text-gray-400">点击选择图片</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>

        {preview && (
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-gray-500">压缩质量: {Math.round(quality * 100)}%</span>
              <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => handleQualityChange(parseFloat(e.target.value))}
                className="flex-1 accent-indigo-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">原图 ({(originalSize / 1024).toFixed(1)} KB)</p>
                <img src={preview} alt="原图" className="w-full rounded-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">压缩后 ({(compressedSize / 1024).toFixed(1)} KB, {originalSize ? Math.round((1 - compressedSize / originalSize) * 100) : 0}%)</p>
                {compressed && <img src={compressed} alt="压缩后" className="w-full rounded-xl" />}
              </div>
            </div>
            {compressed && (
              <button onClick={download} className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium">
                下载压缩后的图片
              </button>
            )}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}
