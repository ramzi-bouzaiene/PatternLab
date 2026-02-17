import type { PatternModule } from '@core/types'

export const prototypePattern: PatternModule = {
  id: 'prototype',
  name: 'Prototype',
  category: 'creational',
  difficulty: 'beginner',
  description:
    'Creates new objects by copying an existing object, known as the prototype, avoiding the cost of creating objects from scratch.',
  whenToUse: [
    'When object creation is expensive or complex',
    'When you need to avoid subclasses of an object creator',
    'When classes to instantiate are specified at runtime',
    'When you want to keep the number of classes to a minimum',
  ],
  whenNotToUse: [
    'When objects have circular references that are hard to clone',
    'When deep copying is complex due to nested objects',
    'For simple objects that are cheap to create',
    'When object state should not be shared or copied',
  ],
  badExample: `// ❌ Anti-Pattern: Creating complex objects from scratch each time
class DocumentTemplate {
  constructor(
    public title: string,
    public styles: Map<string, string>,
    public sections: Section[],
    public metadata: Metadata,
  ) {
    // Expensive initialization
    this.styles = this.loadDefaultStyles();
    this.sections = this.createDefaultSections();
    this.metadata = this.initializeMetadata();
  }

  private loadDefaultStyles() { /* expensive operation */ }
  private createDefaultSections() { /* expensive operation */ }
  private initializeMetadata() { /* expensive operation */ }
}

// Creating new document repeats all expensive operations
const doc1 = new DocumentTemplate('Report', ...);
const doc2 = new DocumentTemplate('Report', ...); // Same expensive init
const doc3 = new DocumentTemplate('Report', ...); // Again...`,
  goodExample: `// ✅ Best Practice: Prototype Pattern
interface Prototype<T> {
  clone(): T;
}

class DocumentTemplate implements Prototype<DocumentTemplate> {
  constructor(
    public title: string,
    public styles: Map<string, string>,
    public sections: Section[],
    public metadata: Metadata,
  ) {}

  clone(): DocumentTemplate {
    // Deep clone the object
    return new DocumentTemplate(
      this.title,
      new Map(this.styles),
      this.sections.map(s => ({ ...s })),
      { ...this.metadata },
    );
  }
}

// Prototype registry for managing prototypes
class PrototypeRegistry {
  private prototypes = new Map<string, Prototype<any>>();

  register(key: string, prototype: Prototype<any>): void {
    this.prototypes.set(key, prototype);
  }

  create<T>(key: string): T {
    const prototype = this.prototypes.get(key);
    if (!prototype) throw new Error(\`Prototype \${key} not found\`);
    return prototype.clone() as T;
  }
}

// Usage
const registry = new PrototypeRegistry();
const template = new DocumentTemplate('Report', defaultStyles, [], {});
registry.register('report', template);

// Fast cloning instead of expensive creation
const doc1 = registry.create<DocumentTemplate>('report');
const doc2 = registry.create<DocumentTemplate>('report');`,
  diagram: {
    nodes: [
      {
        id: 'prototype-interface',
        type: 'interface',
        label: '«interface»\nPrototype',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+clone(): Prototype'],
      },
      {
        id: 'concrete-prototype-1',
        type: 'class',
        label: 'ConcretePrototype1',
        position: { x: 120, y: 180 },
        size: { width: 180, height: 80 },
        properties: ['-field1: type'],
        methods: ['+clone(): Prototype'],
      },
      {
        id: 'concrete-prototype-2',
        type: 'class',
        label: 'ConcretePrototype2',
        position: { x: 460, y: 180 },
        size: { width: 180, height: 80 },
        properties: ['-field2: type'],
        methods: ['+clone(): Prototype'],
      },
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 300, y: 340 },
        size: { width: 160, height: 60 },
        methods: ['+operation()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-prototype-1', target: 'prototype-interface', type: 'implementation' },
      { id: 'e2', source: 'concrete-prototype-2', target: 'prototype-interface', type: 'implementation' },
      { id: 'e3', source: 'client', target: 'prototype-interface', type: 'dependency' },
    ],
    viewport: { width: 800, height: 450 },
  },
  relatedPatterns: ['abstract-factory', 'factory', 'singleton'],
  tags: ['creational', 'gang-of-four', 'cloning', 'object-copying'],
}
