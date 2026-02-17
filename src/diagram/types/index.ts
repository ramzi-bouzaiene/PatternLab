/**
 * Position in 2D space
 */
export interface Position {
  x: number
  y: number
}

/**
 * Size dimensions
 */
export interface Size {
  width: number
  height: number
}

/**
 * Node types for the diagram
 */
export type NodeType = 'class' | 'interface' | 'abstract' | 'object' | 'method'

/**
 * Connection types between nodes
 */
export type EdgeType =
  | 'inheritance'
  | 'implementation'
  | 'composition'
  | 'aggregation'
  | 'association'
  | 'dependency'

/**
 * Node in the diagram
 */
export interface DiagramNode {
  id: string
  type: NodeType
  label: string
  position: Position
  size?: Size
  properties?: string[]
  methods?: string[]
  highlighted?: boolean
  color?: string
}

/**
 * Edge connecting two nodes
 */
export interface DiagramEdge {
  id: string
  type: EdgeType
  source: string
  target: string
  label?: string
  animated?: boolean
  color?: string
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
}

/**
 * Complete diagram configuration
 */
export interface DiagramConfig {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  animation?: AnimationConfig
  viewport?: {
    width: number
    height: number
    zoom?: number
    pan?: Position
  }
}

/**
 * Diagram state for store
 */
export interface DiagramState {
  config: DiagramConfig | null
  selectedNodeId: string | null
  hoveredNodeId: string | null
  zoom: number
  pan: Position
}
