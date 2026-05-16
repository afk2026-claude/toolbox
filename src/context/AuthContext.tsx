import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface AuthState {
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthState>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('admin') === 'true')

  const login = useCallback((username: string, password: string) => {
    if (username === 'admin' && password === '5201314') {
      sessionStorage.setItem('admin', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin')
    setIsAdmin(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
