import { useState } from 'react'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  if (h.length !== 6 && h.length !== 3) return null
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const num = parseInt(full, 16)
  if (isNaN(num)) return null
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 })
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 })
  const { toast } = useToast()

  const fromHex = (h: string) => {
    let clean = h.trim()
    if (!clean.startsWith('#')) clean = '#' + clean
    const r = hexToRgb(clean)
    if (!r) return
    setHex(rgbToHex(r.r, r.g, r.b))
    setRgb(r)
    setHsl(rgbToHsl(r.r, r.g, r.b))
  }

  const fromRgb = (r: number, g: number, b: number) => {
    const clamped = { r: Math.max(0, Math.min(255, r || 0)), g: Math.max(0, Math.min(255, g || 0)), b: Math.max(0, Math.min(255, b || 0)) }
    const h = rgbToHex(clamped.r, clamped.g, clamped.b)
    setHex(h)
    setRgb(clamped)
    setHsl(rgbToHsl(clamped.r, clamped.g, clamped.b))
  }

  const handleColorPicker = (color: string) => {
    const r = hexToRgb(color)
    if (!r) return
    setHex(color)
    setRgb(r)
    setHsl(rgbToHsl(r.r, r.g, r.b))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="颜色转换 - 在线 HEX RGB HSL 颜色格式转换" description="免费的在线颜色转换工具，支持 HEX、RGB、HSL 等颜色格式互转，带颜色预览和取色器。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎨</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">颜色转换</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">HEX、RGB、HSL 等颜色格式互转和预览</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 space-y-5">
        {/* 颜色预览 + 取色器 */}
        <div className="relative h-28 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden" style={{ backgroundColor: hex }}>
          <input type="color" value={hex} onChange={e => handleColorPicker(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" title="点击选择颜色" />
          <div className="absolute bottom-2 left-2 px-3 py-1 rounded-lg bg-black/40 text-white text-xs font-mono backdrop-blur-sm">
            点击选择颜色
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-1.5 block">HEX</label>
            <div className="flex gap-2 items-center">
              <span className="w-7 h-7 rounded-lg border border-gray-200 dark:border-slate-700 shrink-0" style={{ backgroundColor: hex }} />
              <input value={hex} onChange={e => fromHex(e.target.value)} placeholder="#000000"
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white placeholder-gray-400 focus:border-indigo-400 transition-colors" />
              <button onClick={() => { navigator.clipboard.writeText(hex); toast('HEX 已复制') }}
                className="shrink-0 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-xs text-gray-500 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer">复制</button>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-1.5 block">RGB</label>
            <div className="flex gap-1">
              {(['r', 'g', 'b'] as const).map(ch => (
                <input key={ch} type="number" min={0} max={255} value={(rgb as any)[ch]} onChange={e => {
                  const v = +e.target.value
                  fromRgb(ch === 'r' ? v : rgb.r, ch === 'g' ? v : rgb.g, ch === 'b' ? v : rgb.b)
                }}
                  className="w-full px-2 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white text-center focus:border-indigo-400 transition-colors" />
              ))}
              <button onClick={() => { navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`); toast('RGB 已复制') }}
                className="shrink-0 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-xs text-gray-500 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer">复制</button>
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-slate-400 mb-1.5 block">HSL</label>
            <div className="flex gap-1">
              {[hsl.h + '°', hsl.s + '%', hsl.l + '%'].map((v, i) => (
                <span key={i} className="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white text-center">{v}</span>
              ))}
              <button onClick={() => { navigator.clipboard.writeText(`hsl(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`); toast('HSL 已复制') }}
                className="shrink-0 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-xs text-gray-500 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer">复制</button>
            </div>
          </div>
        </div>

        {/* 预设颜色 */}
        <div>
          <p className="text-xs text-gray-400 mb-2">预设颜色</p>
          <div className="flex gap-2">
            {['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#6366f1', '#a855f7', '#ec4899', '#000000', '#ffffff'].map(c => (
              <button key={c} onClick={() => handleColorPicker(c)}
                className="w-8 h-8 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:scale-110 transition-transform cursor-pointer"
                style={{ backgroundColor: c }}
                title={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
