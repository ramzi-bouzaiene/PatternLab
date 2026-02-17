import type { PatternModule } from '@core/types'

export const compositePattern: PatternModule = {
  id: 'composite',
  name: 'Composite',
  category: 'structural',
  difficulty: 'intermediate',
  description:
    'Composes objects into tree structures to represent part-whole hierarchies, allowing clients to treat individual objects and compositions uniformly.',
  whenToUse: [
    'When you want to represent part-whole hierarchies of objects',
    'When you want clients to ignore the difference between compositions and individual objects',
    'When the structure can have any level of complexity and is dynamic',
    'For implementing tree-like structures like file systems, UI components, or org charts',
  ],
  whenNotToUse: [
    'When the hierarchy is flat or has only one level',
    'When leaf and composite objects need very different operations',
    'When type safety is more important than uniformity',
    'When the structure is static and known at compile time',
  ],
  badExample: `// ❌ Anti-Pattern: Different handling for files and folders
class File {
  constructor(public name: string, public size: number) {}
  getSize() { return this.size; }
}

class Folder {
  constructor(public name: string, public children: (File | Folder)[]) {}

  // Different method to get total size
  getTotalSize(): number {
    let total = 0;
    for (const child of this.children) {
      if (child instanceof File) {
        total += child.getSize();
      } else {
        total += child.getTotalSize(); // Different method!
      }
    }
    return total;
  }
}

// Client code must know about both types
function printSize(item: File | Folder) {
  if (item instanceof File) {
    console.log(item.getSize());
  } else {
    console.log(item.getTotalSize());
  }
}`,
  goodExample: `// ✅ Best Practice: Composite Pattern
// Component - common interface for leaf and composite
interface FileSystemComponent {
  name: string;
  getSize(): number;
  print(indent?: string): void;
}

// Leaf
class File implements FileSystemComponent {
  constructor(public name: string, private size: number) {}

  getSize(): number {
    return this.size;
  }

  print(indent = ''): void {
    console.log(\`\${indent}📄 \${this.name} (\${this.size}KB)\`);
  }
}

// Composite
class Folder implements FileSystemComponent {
  private children: FileSystemComponent[] = [];

  constructor(public name: string) {}

  add(component: FileSystemComponent): void {
    this.children.push(component);
  }

  remove(component: FileSystemComponent): void {
    const index = this.children.indexOf(component);
    if (index > -1) this.children.splice(index, 1);
  }

  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }

  print(indent = ''): void {
    console.log(\`\${indent}📁 \${this.name}/\`);
    this.children.forEach(child => child.print(indent + '  '));
  }
}

// Client code treats all components uniformly
const root = new Folder('root');
root.add(new File('readme.md', 5));
const src = new Folder('src');
src.add(new File('index.ts', 10));
src.add(new File('app.ts', 25));
root.add(src);

console.log(root.getSize()); // Works the same for files and folders`,
  diagram: {
    nodes: [
      {
        id: 'component',
        type: 'interface',
        label: '«interface»\nComponent',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 80 },
        methods: ['+operation()', '+add()', '+remove()'],
      },
      {
        id: 'leaf',
        type: 'class',
        label: 'Leaf',
        position: { x: 120, y: 200 },
        size: { width: 140, height: 70 },
        methods: ['+operation()'],
      },
      {
        id: 'composite',
        type: 'class',
        label: 'Composite',
        position: { x: 480, y: 200 },
        size: { width: 160, height: 90 },
        properties: ['-children: Component[]'],
        methods: ['+operation()', '+add()', '+remove()'],
      },
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 300, y: 370 },
        size: { width: 120, height: 50 },
      },
    ],
    edges: [
      { id: 'e1', source: 'leaf', target: 'component', type: 'implementation' },
      { id: 'e2', source: 'composite', target: 'component', type: 'implementation' },
      { id: 'e3', source: 'composite', target: 'component', type: 'aggregation' },
      { id: 'e4', source: 'client', target: 'component', type: 'dependency' },
    ],
    viewport: { width: 800, height: 470 },
  },
  relatedPatterns: ['decorator', 'iterator', 'visitor'],
  tags: ['structural', 'gang-of-four', 'tree', 'hierarchy'],
}
