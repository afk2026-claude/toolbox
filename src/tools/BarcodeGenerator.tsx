import { useState, useEffect, useRef } from 'react'
import SEO from '../components/SEO'

const SUPPORTED_FORMATS = [
  { id: 'CODE128', label: 'Code128' },
  { id: 'EAN13', label: 'EAN-13' },
  { id: 'UPC', label: 'UPC-A' },
  { id: 'CODE39', label: 'Code39' },
  { id: 'ITF', label: 'ITF-14' },
] as const

export default function BarcodeGenerator() {
  const [text, setText] = useState('1234567890')
  const [format, setFormat] = useState('CODE128')
  const [width, setWidth] = useState(2)
  const [height, setHeight] = useState(80)
  const svgRef = useRef<SVGSVGElement>(null)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!text.trim()) return
    setError('')
    try {
      const JsBarcode = (await import('jsbarcode')).default
      JsBarcode(svgRef.current, text, {
        format,
        width,
        height,
        displayValue: true,
        fontSize: 16,
        margin: 10,
      })
    } catch {
      setError('生成失败，请检查输入内容是否适合所选格式')
    }
  }

  useEffect(() => { generate() }, [text, format, width, height])

  const downloadSvg = () => {
    const svg = svgRef.current
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(svgBlob)
    a.download = `barcode_${text}.svg`
    a.click()
  }

  const downloadPng = () => {
    const svg = svgRef.current
    if (!svg) return
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `barcode_${text}.png`
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="条形码生成器 - 在线条形码生成工具" description="免费的在线条形码生成器，支持 Code128、EAN-13、UPC-A、Code39 等多种格式。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🏷️</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">条形码生成</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">支持 Code128、EAN-13、UPC-A、Code39 等多种格式</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_FORMATS.map(f => (
            <button key={f.id} onClick={() => setFormat(f.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${format === f.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}>{f.label}</button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <input value={text} onChange={e => setText(e.target.value)} placeholder="输入条形码内容"
            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 focus:border-indigo-400 transition-colors" />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>宽:</span>
            <input type="number" min={1} max={10} value={width} onChange={e => setWidth(+e.target.value)} className="w-16 px-2 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-center" />
            <span>高:</span>
            <input type="number" min={20} max={300} value={height} onChange={e => setHeight(+e.target.value)} className="w-16 px-2 py-2 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-center" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-center bg-white rounded-xl p-6 min-h-[100px]">
          <svg ref={svgRef} />
        </div>

        <div className="flex gap-3">
          <button onClick={downloadSvg} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm font-medium">下载 SVG</button>
          <button onClick={downloadPng} className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm font-medium">下载 PNG</button>
        </div>
      </div>
    </div>
  )
}
