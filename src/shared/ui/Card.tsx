import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export function Card({
  children,
  title,
  description,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <motion.div
      className={`
        rounded-xl bg-gray-800 border border-gray-700
        ${hoverable ? 'cursor-pointer hover:border-indigo-500 transition-colors' : ''}
        ${className}
      `}
      whileHover={hoverable ? { y: -2, scale: 1.01 } : undefined}
      onClick={onClick}
    >
      {(title || description) && (
        <div className="px-6 py-4 border-b border-gray-700">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && (
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  )
}
