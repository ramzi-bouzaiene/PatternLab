import type { PatternModule } from '@core/types'

export const builderPattern: PatternModule = {
  id: 'builder',
  name: 'Builder',
  category: 'creational',
  difficulty: 'intermediate',
  description:
    'Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.',
  whenToUse: [
    'When creating complex objects with many optional parameters',
    'When the construction process must allow different representations',
    'When you want to construct objects step by step',
    'To avoid telescoping constructors with many parameters',
  ],
  whenNotToUse: [
    'For simple objects with few parameters',
    'When objects are immutable and can be created in one step',
    'When the construction process is straightforward',
    'When object variations are minimal',
  ],
  badExample: `// ❌ Anti-Pattern: Telescoping constructor
class Pizza {
  constructor(
    size: string,
    cheese?: boolean,
    pepperoni?: boolean,
    mushrooms?: boolean,
    onions?: boolean,
    bacon?: boolean,
    olives?: boolean,
    extraCheese?: boolean,
    // ... more toppings
  ) {
    // Hard to read, easy to mix up parameters
  }
}

// Confusing to use - what do all these booleans mean?
const pizza = new Pizza('large', true, true, false, false, true, false, true);

// Or using object with all properties required
interface PizzaConfig {
  size: string;
  cheese: boolean;
  pepperoni: boolean;
  // ... 20 more required properties
}`,
  goodExample: `// ✅ Best Practice: Builder Pattern
class Pizza {
  constructor(
    public readonly size: string,
    public readonly toppings: string[],
    public readonly sauce: string,
    public readonly crust: string,
  ) {}
}

class PizzaBuilder {
  private size: string = 'medium';
  private toppings: string[] = [];
  private sauce: string = 'tomato';
  private crust: string = 'regular';

  setSize(size: 'small' | 'medium' | 'large'): this {
    this.size = size;
    return this;
  }

  addTopping(topping: string): this {
    this.toppings.push(topping);
    return this;
  }

  setSauce(sauce: string): this {
    this.sauce = sauce;
    return this;
  }

  setCrust(crust: string): this {
    this.crust = crust;
    return this;
  }

  build(): Pizza {
    return new Pizza(this.size, this.toppings, this.sauce, this.crust);
  }
}

// Clean, readable, fluent API
const pizza = new PizzaBuilder()
  .setSize('large')
  .setCrust('thin')
  .setSauce('marinara')
  .addTopping('cheese')
  .addTopping('pepperoni')
  .addTopping('mushrooms')
  .build();`,
  diagram: {
    nodes: [
      {
        id: 'director',
        type: 'class',
        label: 'Director',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+construct()'],
      },
      {
        id: 'builder-interface',
        type: 'interface',
        label: '«interface»\nBuilder',
        position: { x: 300, y: 150 },
        size: { width: 160, height: 90 },
        methods: ['+buildPartA()', '+buildPartB()', '+getResult()'],
      },
      {
        id: 'concrete-builder-1',
        type: 'class',
        label: 'ConcreteBuilder1',
        position: { x: 120, y: 300 },
        size: { width: 160, height: 90 },
        methods: ['+buildPartA()', '+buildPartB()', '+getResult()'],
      },
      {
        id: 'concrete-builder-2',
        type: 'class',
        label: 'ConcreteBuilder2',
        position: { x: 480, y: 300 },
        size: { width: 160, height: 90 },
        methods: ['+buildPartA()', '+buildPartB()', '+getResult()'],
      },
      {
        id: 'product-1',
        type: 'class',
        label: 'Product1',
        position: { x: 120, y: 440 },
        size: { width: 160, height: 60 },
      },
      {
        id: 'product-2',
        type: 'class',
        label: 'Product2',
        position: { x: 480, y: 440 },
        size: { width: 160, height: 60 },
      },
    ],
    edges: [
      { id: 'e1', source: 'director', target: 'builder-interface', type: 'association' },
      { id: 'e2', source: 'concrete-builder-1', target: 'builder-interface', type: 'implementation' },
      { id: 'e3', source: 'concrete-builder-2', target: 'builder-interface', type: 'implementation' },
      { id: 'e4', source: 'concrete-builder-1', target: 'product-1', type: 'dependency', label: 'creates' },
      { id: 'e5', source: 'concrete-builder-2', target: 'product-2', type: 'dependency', label: 'creates' },
    ],
    viewport: { width: 800, height: 550 },
  },
  relatedPatterns: ['abstract-factory', 'factory', 'prototype'],
  tags: ['creational', 'gang-of-four', 'fluent-interface', 'step-by-step'],
}
