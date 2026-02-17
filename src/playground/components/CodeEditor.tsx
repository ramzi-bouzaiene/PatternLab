import Editor from '@monaco-editor/react'
import { usePlaygroundStore } from '@playground/store'
import { useMemo } from 'react'

interface CodeEditorProps {
  value?: string
  language?: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

export function CodeEditor({
  value = '',
  language = 'typescript',
  onChange,
  readOnly = false,
}: CodeEditorProps) {
  const { theme, fontSize } = usePlaygroundStore()

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined && onChange) {
      onChange(newValue)
    }
  }

  // Calculate height based on number of lines
  const editorHeight = useMemo(() => {
    const lineCount = value.split('\n').length
    const lineHeight = (fontSize || 14) * 1.5 // Approximate line height
    const padding = 32 // Top and bottom padding
    const minHeight = 200
    const maxHeight = 600
    const calculatedHeight = lineCount * lineHeight + padding
    return Math.min(Math.max(calculatedHeight, minHeight), maxHeight)
  }, [value, fontSize])

  return (
    <div className="h-full w-full overflow-hidden">
      <Editor
        height={editorHeight}
        defaultLanguage={language}
        value={value}
        theme={theme || 'vs-dark'}
        onChange={handleEditorChange}
        loading={
          <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
            Loading editor...
          </div>
        }
        options={{
          readOnly,
          fontSize: fontSize || 14,
          minimap: { enabled: false },
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
          fontLigatures: true,
          contextmenu: false,
          selectOnLineNumbers: true,
        }}
      />
    </div>
  )
}
