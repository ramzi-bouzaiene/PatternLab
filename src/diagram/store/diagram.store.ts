import { create } from 'zustand'
import type { DiagramConfig, DiagramState, Position } from '@diagram/types'

interface DiagramActions {
  setConfig: (config: DiagramConfig | null) => void
  setSelectedNode: (nodeId: string | null) => void
  setHoveredNode: (nodeId: string | null) => void
  setZoom: (zoom: number) => void
  setPan: (pan: Position) => void
  reset: () => void
}

type DiagramStore = DiagramState & DiagramActions

const initialState: DiagramState = {
  config: null,
  selectedNodeId: null,
  hoveredNodeId: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
}

export const useDiagramStore = create<DiagramStore>((set) => ({
  ...initialState,

  setConfig: (config: DiagramConfig | null) => set({ config }),

  setSelectedNode: (nodeId: string | null) => set({ selectedNodeId: nodeId }),

  setHoveredNode: (nodeId: string | null) => set({ hoveredNodeId: nodeId }),

  setZoom: (zoom: number) => set({ zoom: Math.max(0.1, Math.min(2, zoom)) }),

  setPan: (pan: Position) => set({ pan }),

  reset: () => set(initialState),
}))
