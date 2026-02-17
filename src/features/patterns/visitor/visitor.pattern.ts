import type { PatternModule } from '@core/types'

export const visitorPattern: PatternModule = {
  id: 'visitor',
  name: 'Visitor',
  category: 'behavioral',
  difficulty: 'advanced',
  description:
    'Represents an operation to be performed on elements of an object structure, allowing you to define new operations without changing the classes of the elements.',
  whenToUse: [
    'When an object structure has many classes with different interfaces',
    'When you need to perform unrelated operations on objects in a structure',
    'When the object structure rarely changes but you often add new operations',
    'When you want to gather related operations in a single class',
  ],
  whenNotToUse: [
    'When the element hierarchy changes frequently',
    'When there are only a few types of elements',
    'When visitor logic is simple and unlikely to change',
    'When double dispatch is too complex for the use case',
  ],
  badExample: `// ❌ Anti-Pattern: Adding methods to each element class
class Circle {
  constructor(public radius: number) {}

  // Operations mixed into element class
  calculateArea() { return Math.PI * this.radius ** 2; }
  calculatePerimeter() { return 2 * Math.PI * this.radius; }
  exportToXML() { return \`<circle radius="\${this.radius}"/>\`; }
  exportToJSON() { return JSON.stringify({ type: 'circle', radius: this.radius }); }
  // Adding new operation = modifying every shape class
}

class Rectangle {
  constructor(public width: number, public height: number) {}

  calculateArea() { return this.width * this.height; }
  calculatePerimeter() { return 2 * (this.width + this.height); }
  exportToXML() { return \`<rect w="\${this.width}" h="\${this.height}"/>\`; }
  exportToJSON() { return JSON.stringify({ type: 'rect', w: this.width, h: this.height }); }
}
// Every new operation requires changing all element classes!`,
  goodExample: `// ✅ Best Practice: Visitor Pattern
// Element interface
interface Shape {
  accept(visitor: ShapeVisitor): void;
}

// Concrete elements
class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: ShapeVisitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: ShapeVisitor) {
    visitor.visitRectangle(this);
  }
}

// Visitor interface
interface ShapeVisitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rect: Rectangle): void;
}

// Concrete visitors - each operation in its own class
class AreaCalculator implements ShapeVisitor {
  private totalArea = 0;

  visitCircle(circle: Circle) {
    this.totalArea += Math.PI * circle.radius ** 2;
  }

  visitRectangle(rect: Rectangle) {
    this.totalArea += rect.width * rect.height;
  }

  getTotalArea() { return this.totalArea; }
}

class XMLExporter implements ShapeVisitor {
  private xml = '';

  visitCircle(circle: Circle) {
    this.xml += \`<circle radius="\${circle.radius}"/>\n\`;
  }

  visitRectangle(rect: Rectangle) {
    this.xml += \`<rect width="\${rect.width}" height="\${rect.height}"/>\n\`;
  }

  getXML() { return this.xml; }
}

// Usage - add new operations without changing elements
const shapes: Shape[] = [
  new Circle(5),
  new Rectangle(4, 6),
  new Circle(3),
];

const areaCalc = new AreaCalculator();
shapes.forEach(shape => shape.accept(areaCalc));
console.log('Total area:', areaCalc.getTotalArea());

const exporter = new XMLExporter();
shapes.forEach(shape => shape.accept(exporter));
console.log(exporter.getXML());`,
  diagram: {
    nodes: [
      {
        id: 'visitor',
        type: 'interface',
        label: '«interface»\nVisitor',
        position: { x: 80, y: 30 },
        size: { width: 180, height: 80 },
        methods: ['+visitElementA()', '+visitElementB()'],
      },
      {
        id: 'concrete-visitor',
        type: 'class',
        label: 'ConcreteVisitor',
        position: { x: 80, y: 170 },
        size: { width: 180, height: 80 },
        methods: ['+visitElementA()', '+visitElementB()'],
      },
      {
        id: 'element',
        type: 'interface',
        label: '«interface»\nElement',
        position: { x: 480, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+accept(visitor)'],
      },
      {
        id: 'element-a',
        type: 'class',
        label: 'ConcreteElementA',
        position: { x: 380, y: 170 },
        size: { width: 160, height: 70 },
        methods: ['+accept(visitor)'],
      },
      {
        id: 'element-b',
        type: 'class',
        label: 'ConcreteElementB',
        position: { x: 580, y: 170 },
        size: { width: 160, height: 70 },
        methods: ['+accept(visitor)'],
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-visitor', target: 'visitor', type: 'implementation' },
      { id: 'e2', source: 'element-a', target: 'element', type: 'implementation' },
      { id: 'e3', source: 'element-b', target: 'element', type: 'implementation' },
      { id: 'e4', source: 'element-a', target: 'visitor', type: 'dependency' },
      { id: 'e5', source: 'element-b', target: 'visitor', type: 'dependency' },
    ],
    viewport: { width: 800, height: 300 },
  },
  relatedPatterns: ['composite', 'iterator', 'interpreter'],
  tags: ['behavioral', 'gang-of-four', 'double-dispatch', 'operations'],
}
