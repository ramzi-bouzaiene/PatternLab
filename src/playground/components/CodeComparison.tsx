import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  return (
    <div className="flex h-full flex-col">
      {/* Tab Header */}
      <div className="flex gap-2 border-b border-gray-700 p-2">
        <button
          onClick={() => setActiveTab('bad')}
          className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'bad'
              ? 'text-red-400'
              : 'text-gray-400 hover:text-gray-300'
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
              ? 'text-green-400'
              : 'text-gray-400 hover:text-gray-300'
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
      <div className="flex-1 overflow-hidden p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'good' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'good' ? -20 : 20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <CodeEditor
              defaultValue={activeTab === 'bad' ? badExample : goodExample}
              language={language}
              readOnly
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
