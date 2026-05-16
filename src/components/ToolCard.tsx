import { NavLink } from 'react-router-dom'
import type { ToolMeta } from '../types'

interface Props {
  tool: ToolMeta
}

export default function ToolCard({ tool }: Props) {
  return (
    <NavLink
      to={`/${tool.id}`}
      className="block p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all no-underline group"
    >
      <div className="text-3xl mb-3">{tool.icon}</div>
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
        {tool.description}
      </p>
    </NavLink>
  )
}
