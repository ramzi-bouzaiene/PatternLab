import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAppStore } from '@app/store'
import { Card, Badge } from '@shared/ui'
import { formatCategory } from '@shared/utils'
import type { PatternModule } from '@core/types'

export function HomePage() {
  const { patterns } = useAppStore()

  const creational = patterns.filter((p: PatternModule) => p.category === 'creational')
  const structural = patterns.filter((p: PatternModule) => p.category === 'structural')
  const behavioral = patterns.filter((p: PatternModule) => p.category === 'behavioral')

  const categories = [
    { name: 'Creational', patterns: creational, color: 'emerald' },
    { name: 'Structural', patterns: structural, color: 'blue' },
    { name: 'Behavioral', patterns: behavioral, color: 'purple' },
  ]

  return (
    <div className="min-h-full p-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Design Pattern{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Playground
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Learn software design patterns through interactive examples, live code
          editing, and animated diagrams.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700"
          >
            <div className={`text-3xl font-bold text-${cat.color}-400`}>
              {cat.patterns.length}
            </div>
            <div className="text-gray-400 mt-1">{cat.name} Patterns</div>
          </div>
        ))}
      </motion.div>

      {/* Pattern Cards by Category */}
      {categories.map((category, catIndex) => (
        <motion.section
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full bg-${category.color}-500`}
            ></span>
            {category.name} Patterns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.patterns.map((pattern, index) => (
              <motion.div
                key={pattern.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/pattern/${pattern.id}`}>
                  <Card hoverable className="h-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {pattern.name}
                      </h3>
                      <Badge
                        label={pattern.difficulty}
                        variant="difficulty"
                        difficulty={pattern.difficulty}
                      />
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {pattern.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        label={formatCategory(pattern.category)}
                        variant="category"
                        category={pattern.category}
                      />
                      {pattern.tags?.slice(0, 2).map(tag => (
                        <Badge key={tag} label={tag} />
                      ))}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Empty State */}
      {patterns.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            No patterns yet
          </h2>
          <p className="text-gray-400">
            Check back soon for new design patterns!
          </p>
        </div>
      )}
    </div>
  )
}
