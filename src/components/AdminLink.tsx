import { useAuth } from '../context/AuthContext'
import { NavLink } from 'react-router-dom'

export default function AdminLink() {
  const { isAdmin } = useAuth()

  return (
    <NavLink
      to={isAdmin ? '/admin' : '/admin/login'}
      className="fixed bottom-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all text-lg no-underline z-40 hover:scale-105"
      title="管理后台"
    >
      ⚙️
    </NavLink>
  )
}
