import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { patternRegistry } from '@features/patterns'
import { DiagramCanvas } from '@diagram/components'
import { CodeComparison } from '@playground/components'
import { Badge, Button } from '@shared/ui'
import { formatCategory } from '@shared/utils'

export function PatternPage() {
  const { patternId } = useParams<{ patternId: string }>()
  const pattern = patternId ? patternRegistry.getPattern(patternId) : undefined

  if (!pattern) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-2">Pattern Not Found</h1>
        <p className="text-gray-400 mb-6">
          The pattern you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-full p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Badge
            label={formatCategory(pattern.category)}
            variant="category"
            category={pattern.category}
          />
          <Badge
            label={pattern.difficulty}
            variant="difficulty"
            difficulty={pattern.difficulty}
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{pattern.name}</h1>
        <p className="text-xl text-gray-400 max-w-3xl">{pattern.description}</p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column - Diagram & Info */}
        <div className="space-y-8">
          {/* Diagram */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              📊 Class Diagram
            </h2>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden h-[400px]">
              <DiagramCanvas config={pattern.diagram} />
            </div>
          </motion.section>

          {/* When to Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              ✅ When to Use
            </h2>
            <ul className="space-y-2">
              {pattern.whenToUse.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="text-green-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* When NOT to Use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              ❌ When NOT to Use
            </h2>
            <ul className="space-y-2">
              {pattern.whenNotToUse.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Right Column - Code Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            💻 Code Examples
          </h2>
          <div className="bg-gray-800 rounded-xl border border-gray-700 h-[600px] overflow-hidden">
            <CodeComparison
              badExample={pattern.badExample}
              goodExample={pattern.goodExample}
              language="typescript"
            />
          </div>
        </motion.section>
      </div>

      {/* Related Patterns */}
      {pattern.relatedPatterns && pattern.relatedPatterns.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            🔗 Related Patterns
          </h2>
          <div className="flex flex-wrap gap-3">
            {pattern.relatedPatterns.map(relatedId => {
              const related = patternRegistry.getPattern(relatedId)
              if (!related) return null
              return (
                <Link key={relatedId} to={`/pattern/${relatedId}`}>
                  <Button variant="secondary">{related.name}</Button>
                </Link>
              )
            })}
          </div>
        </motion.section>
      )}

      {/* Tags */}
      {pattern.tags && pattern.tags.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">🏷️ Tags</h2>
          <div className="flex flex-wrap gap-2">
            {pattern.tags.map(tag => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
