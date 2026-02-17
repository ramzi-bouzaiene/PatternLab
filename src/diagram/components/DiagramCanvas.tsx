import { motion } from 'framer-motion'
import type { DiagramConfig } from '@diagram/types'
import { DiagramNode } from './DiagramNode'
import { DiagramEdge, EdgeMarkers } from './DiagramEdge'
import { useDiagramStore } from '@diagram/store'

interface DiagramCanvasProps {
  config: DiagramConfig
  className?: string
}

export function DiagramCanvas({ config, className = '' }: DiagramCanvasProps) {
  const { selectedNodeId, hoveredNodeId, setSelectedNode, setHoveredNode } =
    useDiagramStore()

  const { nodes, edges, animation, viewport } = config
  const width = viewport?.width ?? 800
  const height = viewport?.height ?? 600

  // Create a map of nodes for quick lookup
  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-full bg-gray-900 rounded-lg ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <EdgeMarkers />

      {/* Background grid */}
      <defs>
        <pattern
          id="grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#374151"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Render edges first (behind nodes) */}
      <g className="edges">
        {edges.map((edge, index) => {
          const sourceNode = nodeMap.get(edge.source)
          const targetNode = nodeMap.get(edge.target)

          if (!sourceNode || !targetNode) return null

          return (
            <DiagramEdge
              key={edge.id}
              edge={edge}
              sourcePos={sourceNode.position}
              targetPos={targetNode.position}
              sourceSize={{
                width: sourceNode.size?.width ?? 160,
                height: sourceNode.size?.height ?? 100,
              }}
              targetSize={{
                width: targetNode.size?.width ?? 160,
                height: targetNode.size?.height ?? 100,
              }}
              animationDelay={(animation?.delay ?? 0) + index * (animation?.stagger ?? 0.1)}
            />
          )
        })}
      </g>

      {/* Render nodes */}
      <g className="nodes">
        {nodes.map((node, index) => (
          <DiagramNode
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            isHovered={hoveredNodeId === node.id}
            onSelect={setSelectedNode}
            onHover={setHoveredNode}
            animationDelay={(animation?.delay ?? 0) + index * (animation?.stagger ?? 0.1)}
          />
        ))}
      </g>
    </motion.svg>
  )
}
