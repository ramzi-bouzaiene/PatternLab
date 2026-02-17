import type { PatternModule } from '@core/types'

export const bridgePattern: PatternModule = {
  id: 'bridge',
  name: 'Bridge',
  category: 'structural',
  difficulty: 'advanced',
  description:
    'Decouples an abstraction from its implementation so that the two can vary independently.',
  whenToUse: [
    'When you want to avoid a permanent binding between abstraction and implementation',
    'When both abstractions and implementations should be extensible by subclassing',
    'When changes in implementation should not impact client code',
    'When you have a proliferation of classes due to coupled interface and implementation',
  ],
  whenNotToUse: [
    'When there is only one implementation',
    'When the abstraction and implementation are unlikely to change',
    'For simple hierarchies where coupling is acceptable',
    'When the indirection adds unnecessary complexity',
  ],
  badExample: `// ❌ Anti-Pattern: Tightly coupled hierarchy explosion
// Every combination needs its own class
class WindowsCircle extends Circle { /* Windows rendering */ }
class MacCircle extends Circle { /* Mac rendering */ }
class LinuxCircle extends Circle { /* Linux rendering */ }

class WindowsSquare extends Square { /* Windows rendering */ }
class MacSquare extends Square { /* Mac rendering */ }
class LinuxSquare extends Square { /* Linux rendering */ }

class WindowsTriangle extends Triangle { /* Windows rendering */ }
class MacTriangle extends Triangle { /* Mac rendering */ }
class LinuxTriangle extends Triangle { /* Linux rendering */ }

// Adding a new shape or platform multiplies classes!
// N shapes × M platforms = N×M classes`,
  goodExample: `// ✅ Best Practice: Bridge Pattern
// Implementation interface (the "bridge")
interface Renderer {
  renderCircle(x: number, y: number, radius: number): void;
  renderSquare(x: number, y: number, side: number): void;
}

// Concrete implementations
class WindowsRenderer implements Renderer {
  renderCircle(x: number, y: number, radius: number) {
    console.log(\`Windows: Circle at (\${x},\${y}) r=\${radius}\`);
  }
  renderSquare(x: number, y: number, side: number) {
    console.log(\`Windows: Square at (\${x},\${y}) s=\${side}\`);
  }
}

class MacRenderer implements Renderer {
  renderCircle(x: number, y: number, radius: number) {
    console.log(\`Mac: Circle at (\${x},\${y}) r=\${radius}\`);
  }
  renderSquare(x: number, y: number, side: number) {
    console.log(\`Mac: Square at (\${x},\${y}) s=\${side}\`);
  }
}

// Abstraction
abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract draw(): void;
}

// Refined abstractions
class Circle extends Shape {
  constructor(renderer: Renderer, private x: number, private y: number, private radius: number) {
    super(renderer);
  }
  draw() { this.renderer.renderCircle(this.x, this.y, this.radius); }
}

class Square extends Shape {
  constructor(renderer: Renderer, private x: number, private y: number, private side: number) {
    super(renderer);
  }
  draw() { this.renderer.renderSquare(this.x, this.y, this.side); }
}

// N shapes + M platforms = N+M classes!
const circle = new Circle(new WindowsRenderer(), 10, 10, 5);
circle.draw();`,
  diagram: {
    nodes: [
      {
        id: 'abstraction',
        type: 'class',
        label: 'Abstraction',
        position: { x: 120, y: 50 },
        size: { width: 160, height: 80 },
        properties: ['-impl: Implementor'],
        methods: ['+operation()'],
      },
      {
        id: 'refined-abstraction',
        type: 'class',
        label: 'RefinedAbstraction',
        position: { x: 120, y: 200 },
        size: { width: 160, height: 70 },
        methods: ['+operation()'],
      },
      {
        id: 'implementor',
        type: 'interface',
        label: '«interface»\nImplementor',
        position: { x: 480, y: 50 },
        size: { width: 180, height: 70 },
        methods: ['+operationImpl()'],
      },
      {
        id: 'concrete-impl-a',
        type: 'class',
        label: 'ConcreteImplementorA',
        position: { x: 380, y: 200 },
        size: { width: 180, height: 70 },
        methods: ['+operationImpl()'],
      },
      {
        id: 'concrete-impl-b',
        type: 'class',
        label: 'ConcreteImplementorB',
        position: { x: 580, y: 200 },
        size: { width: 180, height: 70 },
        methods: ['+operationImpl()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'abstraction', target: 'implementor', type: 'association', label: 'impl' },
      { id: 'e2', source: 'refined-abstraction', target: 'abstraction', type: 'inheritance' },
      { id: 'e3', source: 'concrete-impl-a', target: 'implementor', type: 'implementation' },
      { id: 'e4', source: 'concrete-impl-b', target: 'implementor', type: 'implementation' },
    ],
    viewport: { width: 800, height: 350 },
  },
  relatedPatterns: ['adapter', 'abstract-factory', 'strategy'],
  tags: ['structural', 'gang-of-four', 'decoupling', 'abstraction'],
}
