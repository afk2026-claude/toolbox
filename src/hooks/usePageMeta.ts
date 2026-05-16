import { useEffect } from 'react'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    if (!description) return
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', description)
    }
  }, [description])
}
