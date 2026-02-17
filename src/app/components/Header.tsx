import { motion } from 'framer-motion'
import { useAppStore } from '@app/store'

export function Header() {
  const { sidebarOpen, toggleSidebar } = useAppStore()

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-4"
    >
      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Title */}
      <h1 className="text-lg font-semibold text-white">
        Design Pattern Playground
      </h1>

      {/* Spacer */}
      <div className="flex-1" />

    </motion.header>
  )
}
