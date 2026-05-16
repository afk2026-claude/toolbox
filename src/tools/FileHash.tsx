import { useState } from 'react'
import SEO from '../components/SEO'
import { md5File } from '../engine/md5'
import { useToast } from '../context/ToastContext'

export default function FileHash() {
  const [fileName, setFileName] = useState('')
  const [md5, setMd5] = useState('')
  const [sha1, setSha1] = useState('')
  const [sha256, setSha256] = useState('')
  const [sha384, setSha384] = useState('')
  const [processing, setProcessing] = useState(false)
  const { toast } = useToast()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFileName(f.name)
    computeHash(f)
  }

  const computeHash = async (f: File) => {
    setProcessing(true)
    setMd5(''); setSha1(''); setSha256(''); setSha384('')
    const buffer = await f.arrayBuffer()

    const [md5Result, sha1Result, sha256Result, sha384Result] = await Promise.all([
      md5File(f),
      crypto.subtle.digest('SHA-1', buffer).then(bufToHex),
      crypto.subtle.digest('SHA-256', buffer).then(bufToHex),
      crypto.subtle.digest('SHA-384', buffer).then(bufToHex),
    ])

    setMd5(md5Result)
    setSha1(sha1Result)
    setSha256(sha256Result)
    setSha384(sha384Result)
    setProcessing(false)
  }

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast(`${label} 已复制`))
  }

  const hashes = [
    { label: 'MD5', value: md5 },
    { label: 'SHA-1', value: sha1 },
    { label: 'SHA-256', value: sha256 },
    { label: 'SHA-384', value: sha384 },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <SEO title="文件哈希计算 - 在线 MD5 SHA1 SHA256 SHA384 工具" description="免费的在线文件哈希计算工具，浏览器本地计算，文件不上传服务器。支持 MD5、SHA-1、SHA-256、SHA-384。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔏</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">文件哈希</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">计算文件的 MD5、SHA-1、SHA-256、SHA-384 哈希值</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors mb-6">
          <span className="text-2xl mb-1">📁</span>
          <span className="text-sm text-gray-400">选择文件（浏览器本地计算，不上传）</span>
          <input type="file" onChange={handleFile} className="hidden" />
        </label>

        {fileName && (
          <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 text-center">
            文件: {fileName}
          </p>
        )}

        {processing && <div className="text-center text-gray-500 py-4">计算中...</div>}

        {md5 && (
          <div className="space-y-3">
            {hashes.map(h => (
              <div key={h.label} className="p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-400">{h.label}</p>
                  <button
                    onClick={() => copy(h.value, h.label)}
                    className="text-xs text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    复制
                  </button>
                </div>
                <p className="text-sm font-mono text-gray-800 dark:text-white break-all select-all">{h.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function bufToHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}
