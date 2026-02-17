import { describe, it, expect } from 'vitest'
import { createPatternRegistry, registerPattern } from '@core/engine'
import type { PatternModule } from '@core/types'

const mockPattern: PatternModule = {
  id: 'test-pattern',
  name: 'Test Pattern',
  category: 'creational',
  difficulty: 'beginner',
  description: 'A test pattern',
  whenToUse: ['Test case 1'],
  whenNotToUse: ['Test case 2'],
  badExample: '// bad code',
  goodExample: '// good code',
  diagram: {
    nodes: [],
    edges: [],
  },
}

describe('Pattern Registry', () => {
  it('should create an empty registry', () => {
    const registry = createPatternRegistry()
    expect(registry.getAllPatterns()).toHaveLength(0)
  })

  it('should create a registry with initial patterns', () => {
    const registry = createPatternRegistry([mockPattern])
    expect(registry.getAllPatterns()).toHaveLength(1)
    expect(registry.getPattern('test-pattern')).toEqual(mockPattern)
  })

  it('should register new patterns', () => {
    const registry = createPatternRegistry()
    registerPattern(registry, mockPattern)
    expect(registry.getPattern('test-pattern')).toEqual(mockPattern)
  })

  it('should get patterns by category', () => {
    const registry = createPatternRegistry([mockPattern])
    expect(registry.getPatternsByCategory('creational')).toHaveLength(1)
    expect(registry.getPatternsByCategory('behavioral')).toHaveLength(0)
  })

  it('should get pattern metas', () => {
    const registry = createPatternRegistry([mockPattern])
    const metas = registry.getPatternMetas()
    expect(metas).toHaveLength(1)
    expect(metas[0]).toEqual({
      id: 'test-pattern',
      name: 'Test Pattern',
      category: 'creational',
      difficulty: 'beginner',
      description: 'A test pattern',
      tags: undefined,
    })
  })

  it('should return undefined for non-existent pattern', () => {
    const registry = createPatternRegistry()
    expect(registry.getPattern('non-existent')).toBeUndefined()
  })
})
