import type { PatternModule } from '@core/types'

export const decoratorPattern: PatternModule = {
  id: 'decorator',
  name: 'Decorator',
  category: 'structural',
  difficulty: 'intermediate',
  description:
    'Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing for extending functionality.',
  whenToUse: [
    'When you want to add responsibilities to individual objects without affecting others',
    'When extension by subclassing is impractical due to many combinations',
    'When you need to add or remove responsibilities at runtime',
    'When you want to combine multiple behaviors flexibly',
  ],
  whenNotToUse: [
    'When object identity is important (decorators create new objects)',
    'When there are many small objects that would clutter the design',
    'When the component interface is complex',
    'When configuration at runtime is not needed',
  ],
  badExample: `// ❌ Anti-Pattern: Class explosion with inheritance
class Coffee { cost() { return 5; } }

// Every combination needs a new class
class CoffeeWithMilk extends Coffee { cost() { return super.cost() + 2; } }
class CoffeeWithSugar extends Coffee { cost() { return super.cost() + 1; } }
class CoffeeWithMilkAndSugar extends Coffee { cost() { return super.cost() + 3; } }
class CoffeeWithMilkAndWhip extends Coffee { cost() { return super.cost() + 4; } }
class CoffeeWithMilkSugarAndWhip extends Coffee { cost() { return super.cost() + 5; } }
// ... exponential growth of classes!

// Can't change at runtime
const coffee = new CoffeeWithMilk();
// Oops, customer wants sugar too - need different class!`,
  goodExample: `// ✅ Best Practice: Decorator Pattern
interface Coffee {
  cost(): number;
  description(): string;
}

// Base component
class SimpleCoffee implements Coffee {
  cost() { return 5; }
  description() { return 'Coffee'; }
}

// Base decorator
abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  abstract cost(): number;
  abstract description(): string;
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 2; }
  description() { return \`\${this.coffee.description()} + Milk\`; }
}

class SugarDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 1; }
  description() { return \`\${this.coffee.description()} + Sugar\`; }
}

class WhipDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 3; }
  description() { return \`\${this.coffee.description()} + Whip\`; }
}

// Flexible composition at runtime
let coffee: Coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
coffee = new WhipDecorator(coffee);

console.log(coffee.description()); // Coffee + Milk + Sugar + Whip
console.log(coffee.cost()); // 11`,
  diagram: {
    nodes: [
      {
        id: 'component',
        type: 'interface',
        label: '«interface»\nComponent',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+operation()'],
      },
      {
        id: 'concrete-component',
        type: 'class',
        label: 'ConcreteComponent',
        position: { x: 100, y: 180 },
        size: { width: 160, height: 70 },
        methods: ['+operation()'],
      },
      {
        id: 'decorator',
        type: 'class',
        label: 'Decorator',
        position: { x: 480, y: 180 },
        size: { width: 160, height: 80 },
        properties: ['-component: Component'],
        methods: ['+operation()'],
      },
      {
        id: 'concrete-decorator-a',
        type: 'class',
        label: 'ConcreteDecoratorA',
        position: { x: 380, y: 340 },
        size: { width: 160, height: 70 },
        methods: ['+operation()'],
      },
      {
        id: 'concrete-decorator-b',
        type: 'class',
        label: 'ConcreteDecoratorB',
        position: { x: 580, y: 340 },
        size: { width: 160, height: 70 },
        methods: ['+operation()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-component', target: 'component', type: 'implementation' },
      { id: 'e2', source: 'decorator', target: 'component', type: 'implementation' },
      { id: 'e3', source: 'decorator', target: 'component', type: 'aggregation' },
      { id: 'e4', source: 'concrete-decorator-a', target: 'decorator', type: 'inheritance' },
      { id: 'e5', source: 'concrete-decorator-b', target: 'decorator', type: 'inheritance' },
    ],
    viewport: { width: 800, height: 460 },
  },
  relatedPatterns: ['adapter', 'composite', 'strategy'],
  tags: ['structural', 'gang-of-four', 'wrapper', 'dynamic-behavior'],
}
