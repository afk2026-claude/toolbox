import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="text-5xl mb-4">💥</div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2">出错了</h1>
          <p className="text-gray-500 dark:text-slate-400 mb-2 text-sm max-w-md">
            {this.state.error?.message || '未知错误'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
            className="mt-4 px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            重新加载
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
