import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type EditorTheme = 'vs-dark' | 'light' | 'hc-black'

interface PlaygroundState {
  theme: EditorTheme
  fontSize: number
  code: string
  output: string
}

interface PlaygroundActions {
  setTheme: (theme: EditorTheme) => void
  setFontSize: (size: number) => void
  setCode: (code: string) => void
  setOutput: (output: string) => void
  reset: () => void
}

type PlaygroundStore = PlaygroundState & PlaygroundActions

const initialState: PlaygroundState = {
  theme: 'vs-dark',
  fontSize: 14,
  code: '',
  output: '',
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  persist(
    (set): PlaygroundStore => ({
      ...initialState,

      setTheme: (theme: EditorTheme) => set({ theme }),

      setFontSize: (size: number) => set({ fontSize: Math.max(10, Math.min(24, size)) }),

      setCode: (code: string) => set({ code }),

      setOutput: (output: string) => set({ output }),

      reset: () => set(initialState),
    }),
    {
      name: 'patternlab-playground',
      partialize: (state: PlaygroundState) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),
    }
  )
)
