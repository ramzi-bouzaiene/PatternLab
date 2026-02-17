import { useState } from 'react'
import { motion } from 'framer-motion'
import { CodeEditor } from './CodeEditor'

interface CodeComparisonProps {
  badExample: string
  goodExample: string
  language?: string
}

type Tab = 'bad' | 'good'

export function CodeComparison({
  badExample,
  goodExample,
  language = 'typescript',
}: CodeComparisonProps) {
  const [activeTab, setActiveTab] = useState<Tab>('bad')
  const currentCode = activeTab === 'bad' ? badExample : goodExample

  return (
    <div className="flex h-full flex-col">
      {/* Tab Header */}
      <div className="flex gap-2 border-b border-gray-700 p-2 bg-gray-900">
        <button
          onClick={() => setActiveTab('bad')}
          className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'bad'
              ? 'text-red-400 bg-red-500/10'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
          }`}
        >
          ❌ Anti-Pattern
          {activeTab === 'bad' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('good')}
          className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'good'
              ? 'text-green-400 bg-green-500/10'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
          }`}
        >
          ✅ Best Practice
          {activeTab === 'good' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
            />
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-hidden">
        <CodeEditor
          key={activeTab} // Force re-render when tab changes
          value={currentCode}
          language={language}
          readOnly
          height="100%"
        />
      </div>
    </div>
  )
}
