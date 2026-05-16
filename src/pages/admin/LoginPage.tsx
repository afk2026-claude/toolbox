import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(username, password)) {
      navigate('/admin')
    } else {
      setError('用户名或密码错误')
    }
  }

  return (
    <>
      <SEO title="管理员登录 | 在线工具箱" />
      <div className="flex items-center justify-center py-20">
        <div className="w-full max-w-sm p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">管理员登录</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-slate-300 mb-1.5">用户名</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white focus:border-indigo-400 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-slate-300 mb-1.5">密码</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white focus:border-indigo-400 transition-colors"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium cursor-pointer"
            >
              登录
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
