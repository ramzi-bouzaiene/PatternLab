import { create } from 'zustand'
import type { PatternModule, PatternCategory } from '@core/types'
import { patternRegistry } from '@features/patterns'

interface AppState {
  // Navigation
  sidebarOpen: boolean
  activePatternId: string | null
  activeCategory: PatternCategory | 'all'

  // Pattern data
  patterns: PatternModule[]

  // Search
  searchQuery: string
}

interface AppActions {
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setActivePattern: (id: string | null) => void
  setActiveCategory: (category: PatternCategory | 'all') => void
  setSearchQuery: (query: string) => void
  getFilteredPatterns: () => PatternModule[]
}

type AppStore = AppState & AppActions

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  sidebarOpen: true,
  activePatternId: null,
  activeCategory: 'all',
  patterns: patternRegistry.getAllPatterns(),
  searchQuery: '',

  // Actions
  toggleSidebar: () => set((state: AppState) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

  setActivePattern: (id: string | null) => set({ activePatternId: id }),

  setActiveCategory: (category: PatternCategory | 'all') => set({ activeCategory: category }),

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  getFilteredPatterns: () => {
    const { patterns, activeCategory, searchQuery } = get()
    return patterns.filter((pattern: PatternModule) => {
      const matchesCategory =
        activeCategory === 'all' || pattern.category === activeCategory
      const matchesSearch =
        searchQuery === '' ||
        pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.tags?.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      return matchesCategory && matchesSearch
    })
  },
}))
