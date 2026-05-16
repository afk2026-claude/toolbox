import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { categories } from '../data/tools'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white no-underline">
          <span>🔧</span>
          <span>在线工具箱</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {categories.map(cat => (
            <NavLink
              key={cat.key}
              to={`/?cat=${encodeURIComponent(cat.key)}`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm transition-colors no-underline ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {cat.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
