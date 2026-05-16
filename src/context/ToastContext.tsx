import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error'
}

interface ToastContextType {
  toast: (message: string, type?: 'success' | 'error') => void
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} })

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const toast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = nextId++
    setItems(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id))
    }, 2000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast 容器 */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {items.map(item => (
          <div
            key={item.id}
            className={`px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium transition-all animate-[slideIn_0.2s_ease-out] pointer-events-auto ${
              item.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {item.type === 'success' ? '✓ ' : '✗ '}
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
