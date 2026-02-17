import type { PatternModule } from '@core/types'

export const abstractFactoryPattern: PatternModule = {
  id: 'abstract-factory',
  name: 'Abstract Factory',
  category: 'creational',
  difficulty: 'intermediate',
  description:
    'Provides an interface for creating families of related or dependent objects without specifying their concrete classes.',
  whenToUse: [
    'When a system should be independent of how its products are created',
    'When a system should be configured with one of multiple families of products',
    'When a family of related product objects must be used together',
    'When you want to provide a library of products without exposing implementation details',
  ],
  whenNotToUse: [
    'When the product families are unlikely to change',
    'When adding new products requires changing all factory interfaces',
    'For simple object creation scenarios',
    'When the overhead of multiple factory classes is not justified',
  ],
  badExample: `// ❌ Anti-Pattern: Hardcoded UI components without abstraction
class WindowsButton {
  render() { return '<button class="windows">Click</button>'; }
}

class MacButton {
  render() { return '<button class="mac">Click</button>'; }
}

// Direct instantiation based on conditions
function createUI(os: string) {
  if (os === 'windows') {
    return {
      button: new WindowsButton(),
      checkbox: new WindowsCheckbox(), // Mixing can happen
    };
  } else if (os === 'mac') {
    return {
      button: new MacButton(),
      checkbox: new MacCheckbox(),
    };
  }
  // Easy to forget a case or mix incompatible components
}

// Client code is tightly coupled to concrete classes
const ui = createUI('windows');`,
  goodExample: `// ✅ Best Practice: Abstract Factory Pattern
// Abstract products
interface Button {
  render(): string;
  onClick(handler: () => void): void;
}

interface Checkbox {
  render(): string;
  toggle(): void;
}

// Abstract factory
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Concrete products - Windows
class WindowsButton implements Button {
  render() { return '<button class="win-btn">Click</button>'; }
  onClick(handler: () => void) { /* Windows click handling */ }
}

class WindowsCheckbox implements Checkbox {
  render() { return '<input type="checkbox" class="win-check"/>'; }
  toggle() { /* Windows toggle */ }
}

// Concrete factory - Windows
class WindowsUIFactory implements UIFactory {
  createButton(): Button { return new WindowsButton(); }
  createCheckbox(): Checkbox { return new WindowsCheckbox(); }
}

// Concrete factory - Mac
class MacUIFactory implements UIFactory {
  createButton(): Button { return new MacButton(); }
  createCheckbox(): Checkbox { return new MacCheckbox(); }
}

// Client code works with abstractions
function createApplication(factory: UIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  return { button, checkbox };
}

// Usage - components are always compatible
const app = createApplication(new WindowsUIFactory());`,
  diagram: {
    nodes: [
      {
        id: 'abstract-factory',
        type: 'interface',
        label: '«interface»\nAbstractFactory',
        position: { x: 300, y: 30 },
        size: { width: 200, height: 80 },
        methods: ['+createProductA()', '+createProductB()'],
      },
      {
        id: 'concrete-factory-1',
        type: 'class',
        label: 'ConcreteFactory1',
        position: { x: 120, y: 160 },
        size: { width: 160, height: 70 },
        methods: ['+createProductA()', '+createProductB()'],
      },
      {
        id: 'concrete-factory-2',
        type: 'class',
        label: 'ConcreteFactory2',
        position: { x: 520, y: 160 },
        size: { width: 160, height: 70 },
        methods: ['+createProductA()', '+createProductB()'],
      },
      {
        id: 'abstract-product-a',
        type: 'interface',
        label: '«interface»\nAbstractProductA',
        position: { x: 80, y: 300 },
        size: { width: 160, height: 60 },
      },
      {
        id: 'abstract-product-b',
        type: 'interface',
        label: '«interface»\nAbstractProductB',
        position: { x: 560, y: 300 },
        size: { width: 160, height: 60 },
      },
      {
        id: 'product-a1',
        type: 'class',
        label: 'ProductA1',
        position: { x: 40, y: 410 },
        size: { width: 100, height: 50 },
      },
      {
        id: 'product-a2',
        type: 'class',
        label: 'ProductA2',
        position: { x: 180, y: 410 },
        size: { width: 100, height: 50 },
      },
      {
        id: 'product-b1',
        type: 'class',
        label: 'ProductB1',
        position: { x: 520, y: 410 },
        size: { width: 100, height: 50 },
      },
      {
        id: 'product-b2',
        type: 'class',
        label: 'ProductB2',
        position: { x: 660, y: 410 },
        size: { width: 100, height: 50 },
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-factory-1', target: 'abstract-factory', type: 'implementation' },
      { id: 'e2', source: 'concrete-factory-2', target: 'abstract-factory', type: 'implementation' },
      { id: 'e3', source: 'product-a1', target: 'abstract-product-a', type: 'implementation' },
      { id: 'e4', source: 'product-a2', target: 'abstract-product-a', type: 'implementation' },
      { id: 'e5', source: 'product-b1', target: 'abstract-product-b', type: 'implementation' },
      { id: 'e6', source: 'product-b2', target: 'abstract-product-b', type: 'implementation' },
      { id: 'e7', source: 'concrete-factory-1', target: 'product-a1', type: 'dependency', label: 'creates' },
      { id: 'e8', source: 'concrete-factory-2', target: 'product-a2', type: 'dependency', label: 'creates' },
    ],
    viewport: { width: 800, height: 500 },
  },
  relatedPatterns: ['factory', 'singleton', 'prototype'],
  tags: ['creational', 'gang-of-four', 'object-creation', 'families'],
}
