import { motion } from 'framer-motion'
import type { PatternCategory, DifficultyLevel } from '@core/types'

interface BadgeProps {
  label: string
  variant?: 'category' | 'difficulty' | 'tag'
  category?: PatternCategory
  difficulty?: DifficultyLevel
}

const categoryColors: Record<PatternCategory, string> = {
  creational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  structural: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  behavioral: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function Badge({ label, variant = 'tag', category, difficulty }: BadgeProps) {
  let colorClass = 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  if (variant === 'category' && category) {
    colorClass = categoryColors[category]
  } else if (variant === 'difficulty' && difficulty) {
    colorClass = difficultyColors[difficulty]
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        border ${colorClass}
      `}
    >
      {label}
    </motion.span>
  )
}
