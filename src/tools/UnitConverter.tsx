import { useState } from 'react'
import SEO from '../components/SEO'

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume'

interface UnitDef {
  label: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

const categories: Record<UnitCategory, { label: string; units: Record<string, UnitDef> }> = {
  length: {
    label: '长度',
    units: {
      '米': { label: '米', toBase: v => v, fromBase: v => v },
      '千米': { label: '千米', toBase: v => v * 1000, fromBase: v => v / 1000 },
      '厘米': { label: '厘米', toBase: v => v / 100, fromBase: v => v * 100 },
      '毫米': { label: '毫米', toBase: v => v / 1000, fromBase: v => v * 1000 },
      '英寸': { label: '英寸', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      '英尺': { label: '英尺', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      '码': { label: '码', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      '里': { label: '里', toBase: v => v * 500, fromBase: v => v / 500 },
    },
  },
  weight: {
    label: '重量',
    units: {
      '千克': { label: '千克', toBase: v => v, fromBase: v => v },
      '克': { label: '克', toBase: v => v / 1000, fromBase: v => v * 1000 },
      '毫克': { label: '毫克', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      '吨': { label: '吨', toBase: v => v * 1000, fromBase: v => v / 1000 },
      '磅': { label: '磅', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
      '盎司': { label: '盎司', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      '斤': { label: '斤', toBase: v => v * 0.5, fromBase: v => v / 0.5 },
    },
  },
  temperature: {
    label: '温度',
    units: {
      '摄氏度': { label: '°C', toBase: v => v, fromBase: v => v },
      '华氏度': { label: '°F', toBase: v => (v - 32) / 1.8, fromBase: v => v * 1.8 + 32 },
      '开尔文': { label: 'K', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    },
  },
  area: {
    label: '面积',
    units: {
      '平方米': { label: '平方米', toBase: v => v, fromBase: v => v },
      '平方千米': { label: '平方千米', toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      '公顷': { label: '公顷', toBase: v => v * 10000, fromBase: v => v / 10000 },
      '亩': { label: '亩', toBase: v => v * 666.667, fromBase: v => v / 666.667 },
      '平方英尺': { label: '平方英尺', toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
    },
  },
  volume: {
    label: '体积',
    units: {
      '升': { label: '升', toBase: v => v, fromBase: v => v },
      '毫升': { label: '毫升', toBase: v => v / 1000, fromBase: v => v * 1000 },
      '立方米': { label: '立方米', toBase: v => v * 1000, fromBase: v => v / 1000 },
      '加仑': { label: '加仑', toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    },
  },
}

export default function UnitConverter() {
  const [cat, setCat] = useState<UnitCategory>('length')
  const [fromUnit, setFromUnit] = useState('米')
  const [toUnit, setToUnit] = useState('千米')
  const [value, setValue] = useState('1000')
  const [result, setResult] = useState('')

  const convert = () => {
    const v = parseFloat(value)
    if (isNaN(v)) { setResult(''); return }
    const c = categories[cat]
    const from = c.units[fromUnit]
    const to = c.units[toUnit]
    if (!from || !to) return
    const base = from.toBase(v)
    const r = to.fromBase(base)
    setResult(r.toFixed(6).replace(/\.?0+$/, ''))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="单位换算 - 在线常用单位转换工具" description="免费的在线单位换算工具，支持长度、重量、温度、面积、体积等常用单位相互转换。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">⚖️</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">单位换算</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">长度、重量、温度、面积、体积单位转换</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.entries(categories) as [UnitCategory, typeof categories[UnitCategory]][]).map(([key, c]) => (
            <button key={key} onClick={() => { setCat(key); setFromUnit(Object.keys(c.units)[0]); setToUnit(Object.keys(c.units)[1] || Object.keys(c.units)[0]) }}
              className={`px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${cat === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300'}`}>{c.label}</button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 items-end">
          <div>
            <label className="text-xs text-gray-400 block mb-1">值</label>
            <input value={value} onChange={e => setValue(e.target.value)} type="number" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">从</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white">
              {Object.entries(categories[cat].units).map(([key, u]) => <option key={key} value={key}>{u.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">到</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-white">
              {Object.entries(categories[cat].units).map(([key, u]) => <option key={key} value={key}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={convert} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer font-medium">换算</button>

        {result !== '' && (
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-center">
            <span className="text-gray-500">{value} {categories[cat].units[fromUnit].label} = </span>
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{result}</span>
            <span className="text-gray-500"> {categories[cat].units[toUnit].label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
