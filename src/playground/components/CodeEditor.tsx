import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { usePlaygroundStore } from '@playground/store'

interface CodeEditorProps {
  defaultValue?: string
  language?: string
  onChange?: (value: string) => void
  readOnly?: boolean
  height?: string | number
}

export function CodeEditor({
  defaultValue = '',
  language = 'typescript',
  onChange,
  readOnly = false,
  height = '100%',
}: CodeEditorProps) {
  const { theme, fontSize } = usePlaygroundStore()

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && onChange) {
      onChange(value)
    }
  }

  return (
    <motion.div
      className="h-full w-full overflow-hidden rounded-lg border border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={defaultValue}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          readOnly,
          fontSize,
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
        }}
      />
    </motion.div>
  )
}
