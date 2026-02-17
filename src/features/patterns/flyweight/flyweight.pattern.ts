import type { PatternModule } from '@core/types'

export const flyweightPattern: PatternModule = {
  id: 'flyweight',
  name: 'Flyweight',
  category: 'structural',
  difficulty: 'advanced',
  description:
    'Uses sharing to support large numbers of fine-grained objects efficiently by separating intrinsic (shared) and extrinsic (unique) state.',
  whenToUse: [
    'When an application uses a large number of similar objects',
    'When storage costs are high due to the quantity of objects',
    'When most object state can be made extrinsic',
    'When groups of objects can be replaced by fewer shared objects',
  ],
  whenNotToUse: [
    'When there are few objects to create',
    'When objects have mostly unique state that cannot be externalized',
    'When the added complexity is not justified by memory savings',
    'When object identity is important for the application',
  ],
  badExample: `// ❌ Anti-Pattern: Creating many objects with duplicated data
class Character {
  constructor(
    public char: string,
    public font: string,        // Duplicated for every character
    public fontSize: number,     // Duplicated for every character
    public fontWeight: string,   // Duplicated for every character
    public color: string,        // Duplicated for every character
    public position: { x: number; y: number }
  ) {}
}

// Creating a document with 100,000 characters
// Each character stores redundant font data
const document: Character[] = [];
for (let i = 0; i < 100000; i++) {
  document.push(new Character(
    'a',
    'Arial',      // Same font repeated 100,000 times
    12,           // Same size repeated 100,000 times
    'normal',     // Same weight repeated 100,000 times
    '#000000',    // Same color repeated 100,000 times
    { x: i * 10, y: 0 }
  ));
}
// Massive memory waste!`,
  goodExample: `// ✅ Best Practice: Flyweight Pattern
// Flyweight - shared intrinsic state
class CharacterStyle {
  constructor(
    public readonly font: string,
    public readonly fontSize: number,
    public readonly fontWeight: string,
    public readonly color: string,
  ) {}

  render(char: string, x: number, y: number): void {
    console.log(\`Rendering '\${char}' at (\${x},\${y}) with \${this.font}\`);
  }
}

// Flyweight Factory - manages shared flyweights
class StyleFactory {
  private styles = new Map<string, CharacterStyle>();

  getStyle(font: string, size: number, weight: string, color: string): CharacterStyle {
    const key = \`\${font}-\${size}-\${weight}-\${color}\`;

    if (!this.styles.has(key)) {
      this.styles.set(key, new CharacterStyle(font, size, weight, color));
      console.log(\`Created new style: \${key}\`);
    }

    return this.styles.get(key)!;
  }

  get styleCount(): number {
    return this.styles.size;
  }
}

// Context - stores extrinsic state
interface CharacterContext {
  char: string;
  x: number;
  y: number;
  style: CharacterStyle;
}

// Usage
const factory = new StyleFactory();
const document: CharacterContext[] = [];

// 100,000 characters but only a few shared style objects
for (let i = 0; i < 100000; i++) {
  document.push({
    char: 'a',
    x: i * 10,
    y: 0,
    style: factory.getStyle('Arial', 12, 'normal', '#000000'), // Shared!
  });
}

console.log(\`Characters: 100,000, Styles: \${factory.styleCount}\`);`,
  diagram: {
    nodes: [
      {
        id: 'flyweight-factory',
        type: 'class',
        label: 'FlyweightFactory',
        position: { x: 80, y: 50 },
        size: { width: 180, height: 80 },
        properties: ['-flyweights: Map'],
        methods: ['+getFlyweight(key)'],
      },
      {
        id: 'flyweight',
        type: 'interface',
        label: '«interface»\nFlyweight',
        position: { x: 360, y: 50 },
        size: { width: 160, height: 70 },
        methods: ['+operation(extrinsic)'],
      },
      {
        id: 'concrete-flyweight',
        type: 'class',
        label: 'ConcreteFlyweight',
        position: { x: 280, y: 200 },
        size: { width: 160, height: 80 },
        properties: ['-intrinsicState'],
        methods: ['+operation(extrinsic)'],
      },
      {
        id: 'unshared-flyweight',
        type: 'class',
        label: 'UnsharedFlyweight',
        position: { x: 480, y: 200 },
        size: { width: 160, height: 80 },
        properties: ['-allState'],
        methods: ['+operation(extrinsic)'],
      },
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 80, y: 200 },
        size: { width: 140, height: 50 },
      },
    ],
    edges: [
      { id: 'e1', source: 'flyweight-factory', target: 'flyweight', type: 'dependency' },
      { id: 'e2', source: 'concrete-flyweight', target: 'flyweight', type: 'implementation' },
      { id: 'e3', source: 'unshared-flyweight', target: 'flyweight', type: 'implementation' },
      { id: 'e4', source: 'client', target: 'flyweight-factory', type: 'dependency' },
      { id: 'e5', source: 'client', target: 'flyweight', type: 'dependency' },
    ],
    viewport: { width: 700, height: 330 },
  },
  relatedPatterns: ['composite', 'singleton', 'factory'],
  tags: ['structural', 'gang-of-four', 'memory-optimization', 'sharing'],
}
