import type {
  PatternModule,
  PatternCategory,
  PatternMeta,
  PatternRegistry,
} from '@core/types'

/**
 * Creates a pattern registry to manage all pattern modules
 */
export function createPatternRegistry(
  initialPatterns: PatternModule[] = []
): PatternRegistry {
  const patterns = new Map<string, PatternModule>()

  // Initialize with provided patterns
  initialPatterns.forEach(pattern => {
    patterns.set(pattern.id, pattern)
  })

  return {
    patterns,

    getPattern(id: string): PatternModule | undefined {
      return patterns.get(id)
    },

    getPatternsByCategory(category: PatternCategory): PatternModule[] {
      return Array.from(patterns.values()).filter(p => p.category === category)
    },

    getAllPatterns(): PatternModule[] {
      return Array.from(patterns.values())
    },

    getPatternMetas(): PatternMeta[] {
      return Array.from(patterns.values()).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        difficulty: p.difficulty,
        description: p.description,
        tags: p.tags,
      }))
    },
  }
}

/**
 * Register a new pattern to the registry
 */
export function registerPattern(
  registry: PatternRegistry,
  pattern: PatternModule
): void {
  registry.patterns.set(pattern.id, pattern)
}

/**
 * Unregister a pattern from the registry
 */
export function unregisterPattern(
  registry: PatternRegistry,
  patternId: string
): boolean {
  return registry.patterns.delete(patternId)
}
