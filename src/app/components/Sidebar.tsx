import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '@app/store'
import type { PatternCategory, PatternModule } from '@core/types'
import { formatCategory } from '@shared/utils'

const categories: (PatternCategory | 'all')[] = [
  'all',
  'creational',
  'structural',
  'behavioral',
]

const categoryIcons: Record<PatternCategory | 'all', string> = {
  all: '📚',
  creational: '🏗️',
  structural: '🧱',
  behavioral: '🔄',
}

export function Sidebar() {
  const location = useLocation()
  const {
    sidebarOpen,
    activeCategory,
    setActiveCategory,
    getFilteredPatterns,
    searchQuery,
    setSearchQuery,
  } = useAppStore()

  const patterns = getFilteredPatterns()

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden"
        >
          {/* Logo */}
          <div className="p-4 border-b border-gray-800">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                PL
              </div>
              <span className="text-xl font-bold text-white">PatternLab</span>
            </Link>
          </div>

          {/* Search */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Search patterns..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {categoryIcons[category]} {formatCategory(category)}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern List */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {patterns.map((pattern: PatternModule) => {
              const isActive = location.pathname === `/pattern/${pattern.id}`
              return (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/pattern/${pattern.id}`}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                  >
                    <div className="font-medium">{pattern.name}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {formatCategory(pattern.category)} • {pattern.difficulty}
                    </div>
                  </Link>
                </motion.div>
              )
            })}

            {patterns.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No patterns found
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-500">
            {patterns.length} pattern{patterns.length !== 1 ? 's' : ''} available
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
