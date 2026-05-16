import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SEO from '../components/SEO'

const sampleMd = `# Markdown 预览

输入 Markdown 内容，右侧实时预览。

## 文本样式

**加粗** *斜体* ~~删除线~~ \`行内代码\`

## 列表

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表

1. 有序列表项
2. 有序列表项

## 链接与图片

[访问 GitHub](https://github.com)

## 表格

| 功能 | 状态 |
|------|------|
| GFM | ✅ |
| 代码高亮 | ✅ |
| 表格 | ✅ |

## 代码块

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

> 这是一段引用文字
`

export default function MarkdownPreview() {
  const [input, setInput] = useState(sampleMd)

  return (
    <div className="max-w-5xl mx-auto">
      <SEO title="Markdown 预览 - 在线 Markdown 编辑器" description="免费的在线 Markdown 预览工具，实时渲染 Markdown 文本，支持 GFM 语法。" />
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📄</div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Markdown 预览</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">实时渲染 Markdown 内容，支持 GFM 语法和代码高亮</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide">编辑</span>
            <span className="text-xs text-gray-400">{input.length} 字符</span>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            className="w-full h-[500px] p-4 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm font-mono text-gray-800 dark:text-white resize-none focus:border-indigo-400 transition-colors" spellCheck={false} />
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
          <span className="text-xs text-gray-400 mb-2 block uppercase tracking-wide">预览</span>
          <div className="h-[500px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {input}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
