import { motion } from 'framer-motion'
import type { DiagramEdge as DiagramEdgeType, Position } from '@diagram/types'

interface DiagramEdgeProps {
  edge: DiagramEdgeType
  sourcePos: Position
  targetPos: Position
  sourceSize: { width: number; height: number }
  targetSize: { width: number; height: number }
  animationDelay?: number
}

const edgeColors: Record<string, string> = {
  inheritance: '#4f46e5',
  implementation: '#0891b2',
  composition: '#dc2626',
  aggregation: '#f59e0b',
  association: '#6b7280',
  dependency: '#8b5cf6',
}

function getEdgeMarker(type: string): string {
  switch (type) {
    case 'inheritance':
      return 'url(#arrow-hollow)'
    case 'implementation':
      return 'url(#arrow-hollow)'
    case 'composition':
      return 'url(#diamond-filled)'
    case 'aggregation':
      return 'url(#diamond-hollow)'
    default:
      return 'url(#arrow-filled)'
  }
}

export function DiagramEdge({
  edge,
  sourcePos,
  targetPos,
  sourceSize,
  targetSize,
  animationDelay = 0,
}: DiagramEdgeProps) {
  const color = edge.color ?? edgeColors[edge.type] ?? '#6b7280'

  // Calculate connection points (center of nodes)
  const startX = sourcePos.x + sourceSize.width / 2
  const startY = sourcePos.y + sourceSize.height
  const endX = targetPos.x + targetSize.width / 2
  const endY = targetPos.y

  // Create a curved path
  const midY = (startY + endY) / 2
  const path = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
        delay: animationDelay,
      }}
    >
      {/* Edge path */}
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={
          edge.type === 'dependency' || edge.type === 'implementation'
            ? '5,5'
            : undefined
        }
        markerEnd={getEdgeMarker(edge.type)}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.6,
          delay: animationDelay,
          ease: 'easeInOut',
        }}
      />

      {/* Animated flow indicator */}
      {edge.animated && (
        <motion.circle
          r={4}
          fill={color}
          animate={{
            offsetDistance: ['0%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            offsetPath: `path("${path}")`,
          }}
        />
      )}

      {/* Edge label */}
      {edge.label && (
        <text
          x={(startX + endX) / 2}
          y={(startY + endY) / 2 - 10}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize={11}
          fontFamily="system-ui"
        >
          {edge.label}
        </text>
      )}
    </motion.g>
  )
}

/**
 * SVG Marker definitions for edge arrows
 */
export function EdgeMarkers() {
  return (
    <defs>
      {/* Filled arrow */}
      <marker
        id="arrow-filled"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth={6}
        markerHeight={6}
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
      </marker>

      {/* Hollow arrow (inheritance) */}
      <marker
        id="arrow-hollow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth={8}
        markerHeight={8}
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="white" stroke="#4f46e5" strokeWidth={1} />
      </marker>

      {/* Filled diamond (composition) */}
      <marker
        id="diamond-filled"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth={8}
        markerHeight={8}
        orient="auto-start-reverse"
      >
        <path d="M 0 5 L 5 0 L 10 5 L 5 10 z" fill="#dc2626" />
      </marker>

      {/* Hollow diamond (aggregation) */}
      <marker
        id="diamond-hollow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth={8}
        markerHeight={8}
        orient="auto-start-reverse"
      >
        <path d="M 0 5 L 5 0 L 10 5 L 5 10 z" fill="white" stroke="#f59e0b" strokeWidth={1} />
      </marker>
    </defs>
  )
}
