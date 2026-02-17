import { describe, it, expect } from 'vitest'
import { cn, capitalize, debounce, generateId, formatCategory } from '@shared/utils'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should join class names', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c')
    })

    it('should filter falsy values', () => {
      expect(cn('a', false, 'b', null, undefined, 'c')).toBe('a b c')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('formatCategory', () => {
    it('should format category names', () => {
      expect(formatCategory('creational')).toBe('Creational')
      expect(formatCategory('behavioral')).toBe('Behavioral')
    })
  })

  describe('generateId', () => {
    it('should generate unique ids', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
      expect(id1.length).toBeGreaterThan(0)
    })
  })

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let count = 0
      const fn = debounce(() => count++, 50)

      fn()
      fn()
      fn()

      expect(count).toBe(0)

      await new Promise(resolve => setTimeout(resolve, 100))
      expect(count).toBe(1)
    })
  })
})
