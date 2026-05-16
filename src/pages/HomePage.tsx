import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { tools, categories } from '../data/tools'
import ToolCard from '../components/ToolCard'
import SEO from '../components/SEO'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCat = searchParams.get('cat') || ''
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = tools
    if (activeCat) {
      list = list.filter(t => t.category === activeCat)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some(k => k.includes(q))
      )
    }
    return list
  }, [activeCat, search])

  const grouped = useMemo(() => {
    const map: Record<string, typeof tools> = {}
    for (const t of filtered) {
      if (!map[t.category]) map[t.category] = []
      map[t.category].push(t)
    }
    return map
  }, [filtered])

  return (
    <>
      <SEO
        title="在线工具箱 - 免费实用的开发者工具集"
        description="免费在线工具箱，提供 JSON 格式化、Base64 编解码、二维码生成、Markdown 预览、正则测试等 20+ 实用工具。浏览器本地处理，数据不上传服务器。"
      />

      {/* 搜索栏 */}
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索工具名称、功能或关键词..."
            className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setSearchParams({})}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
            !activeCat
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
        >
          全部
        </button>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSearchParams({ cat: cat.key })}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
              activeCat === cat.key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 工具网格 */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-slate-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">没有找到匹配的工具，试试其他关键词</p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200 mb-4">
              {categories.find(c => c.key === category)?.label || category}
              <span className="text-sm font-normal text-gray-400 ml-2">({items.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  )
}
