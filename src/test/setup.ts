import '@testing-library/jest-dom'

// Mock Monaco Editor for tests
vi.mock('@monaco-editor/react', () => ({
  default: vi.fn(() => null),
  Editor: vi.fn(() => null),
}))

// Mock framer-motion for tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual,
    motion: {
      div: 'div',
      svg: 'svg',
      circle: 'circle',
      rect: 'rect',
      path: 'path',
      line: 'line',
      g: 'g',
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})
