import type { DiagramConfig } from '@diagram/types'

/**
 * Category of design patterns
 */
export type PatternCategory = 'creational' | 'structural' | 'behavioral'

/**
 * Difficulty level for patterns
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

/**
 * Core interface for pattern modules
 */
export interface PatternModule {
  /** Unique identifier for the pattern */
  id: string
  /** Display name of the pattern */
  name: string
  /** Category of the pattern */
  category: PatternCategory
  /** Brief description of the pattern */
  description: string
  /** Difficulty level */
  difficulty: DifficultyLevel
  /** When to use this pattern */
  whenToUse: string[]
  /** When NOT to use this pattern */
  whenNotToUse: string[]
  /** Code example showing anti-pattern */
  badExample: string
  /** Code example showing proper implementation */
  goodExample: string
  /** Diagram configuration for visualization */
  diagram: DiagramConfig
  /** Related patterns */
  relatedPatterns?: string[]
  /** Tags for filtering */
  tags?: string[]
}

/**
 * Pattern metadata for listing
 */
export interface PatternMeta {
  id: string
  name: string
  category: PatternCategory
  difficulty: DifficultyLevel
  description: string
  tags?: string[]
}

/**
 * Pattern registry for managing all patterns
 */
export interface PatternRegistry {
  patterns: Map<string, PatternModule>
  getPattern: (id: string) => PatternModule | undefined
  getPatternsByCategory: (category: PatternCategory) => PatternModule[]
  getAllPatterns: () => PatternModule[]
  getPatternMetas: () => PatternMeta[]
}
