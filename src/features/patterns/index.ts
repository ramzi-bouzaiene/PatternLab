import { singletonPattern } from './singleton'
import { observerPattern } from './observer'
import { factoryPattern } from './factory'
import { createPatternRegistry } from '@core/engine'

// Export all patterns
export { singletonPattern } from './singleton'
export { observerPattern } from './observer'
export { factoryPattern } from './factory'

// Create and export the pattern registry with all patterns
export const patternRegistry = createPatternRegistry([
  singletonPattern,
  observerPattern,
  factoryPattern,
])

// Export patterns grouped by category
export const creationalPatterns = patternRegistry.getPatternsByCategory('creational')
export const structuralPatterns = patternRegistry.getPatternsByCategory('structural')
export const behavioralPatterns = patternRegistry.getPatternsByCategory('behavioral')
