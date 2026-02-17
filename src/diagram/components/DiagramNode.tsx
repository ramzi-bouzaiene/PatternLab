import { motion } from 'framer-motion'
import type { DiagramNode as DiagramNodeType } from '@diagram/types'

interface DiagramNodeProps {
  node: DiagramNodeType
  isSelected: boolean
  isHovered: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  animationDelay?: number
}

const nodeColors: Record<string, string> = {
  class: '#4f46e5',
  interface: '#0891b2',
  abstract: '#7c3aed',
  object: '#059669',
  method: '#dc2626',
}

export function DiagramNode({
  node,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  animationDelay = 0,
}: DiagramNodeProps) {
  const width = node.size?.width ?? 160
  const height = node.size?.height ?? 100
  const color = node.color ?? nodeColors[node.type] ?? '#6b7280'

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: animationDelay,
        ease: 'easeOut',
      }}
      onClick={() => onSelect(node.id)}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Node background */}
      <motion.rect
        x={node.position.x}
        y={node.position.y}
        width={width}
        height={height}
        rx={8}
        fill={isSelected ? color : '#1f2937'}
        stroke={color}
        strokeWidth={isHovered || isSelected ? 3 : 2}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Node type indicator */}
      <motion.rect
        x={node.position.x}
        y={node.position.y}
        width={width}
        height={28}
        rx={8}
        fill={color}
      />
      <rect
        x={node.position.x}
        y={node.position.y + 20}
        width={width}
        height={8}
        fill={color}
      />

      {/* Node type label */}
      <text
        x={node.position.x + width / 2}
        y={node.position.y + 18}
        textAnchor="middle"
        fill="white"
        fontSize={10}
        fontWeight="500"
        fontFamily="system-ui"
      >
        {'<<' + node.type + '>>'}
      </text>

      {/* Node name */}
      <text
        x={node.position.x + width / 2}
        y={node.position.y + 48}
        textAnchor="middle"
        fill="white"
        fontSize={14}
        fontWeight="600"
        fontFamily="system-ui"
      >
        {node.label}
      </text>

      {/* Properties */}
      {node.properties?.slice(0, 2).map((prop, index) => (
        <text
          key={`prop-${index}`}
          x={node.position.x + 10}
          y={node.position.y + 68 + index * 14}
          fill="#9ca3af"
          fontSize={10}
          fontFamily="monospace"
        >
          {prop.length > 20 ? prop.slice(0, 20) + '...' : prop}
        </text>
      ))}
    </motion.g>
  )
}
