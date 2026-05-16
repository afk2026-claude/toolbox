import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import { tools } from './data/tools'

// 工具 ID 到实际文件名的大写映射
const componentMap: Record<string, ReturnType<typeof lazy>> = {
  'json-formatter': lazy(() => import('./tools/JsonFormatter')),
  'base64': lazy(() => import('./tools/Base64Tool')),
  'url-codec': lazy(() => import('./tools/UrlCodec')),
  'regex-tester': lazy(() => import('./tools/RegexTester')),
  'timestamp': lazy(() => import('./tools/TimestampConverter')),
  'image-compress': lazy(() => import('./tools/ImageCompressor')),
  'qrcode-generator': lazy(() => import('./tools/QRGenerator')),
  'qrcode-decoder': lazy(() => import('./tools/QRDecoder')),
  'color-converter': lazy(() => import('./tools/ColorConverter')),
  'word-counter': lazy(() => import('./tools/WordCounter')),
  'markdown-preview': lazy(() => import('./tools/MarkdownPreview')),
  'text-diff': lazy(() => import('./tools/TextDiff')),
  'pinyin': lazy(() => import('./tools/PinyinConverter')),
  'password-generator': lazy(() => import('./tools/PasswordGenerator')),
  'file-hash': lazy(() => import('./tools/FileHash')),
  'uuid-generator': lazy(() => import('./tools/UUIDGenerator')),
  'random-generator': lazy(() => import('./tools/RandomGenerator')),
  'unit-converter': lazy(() => import('./tools/UnitConverter')),
  'barcode-generator': lazy(() => import('./tools/BarcodeGenerator')),
}

function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ErrorBoundary>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              {tools.map(tool => {
                const Comp = componentMap[tool.id]
                if (!Comp) return null
                return (
                  <Route
                    key={tool.id}
                    path={`/${tool.id}`}
                    element={
                      <Suspense fallback={<Loading />}>
                        <Comp />
                      </Suspense>
                    }
                  />
                )
              })}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/admin/login" element={<LoginPage />} />
              <Route path="/admin" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ToastProvider>
    </AuthProvider>
  )
}
