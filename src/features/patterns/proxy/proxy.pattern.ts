import type { PatternModule } from '@core/types'

export const proxyPattern: PatternModule = {
  id: 'proxy',
  name: 'Proxy',
  category: 'structural',
  difficulty: 'intermediate',
  description:
    'Provides a surrogate or placeholder for another object to control access to it.',
  whenToUse: [
    'When you need lazy initialization (virtual proxy)',
    'When you need access control (protection proxy)',
    'When you need local representation of remote object (remote proxy)',
    'When you need logging, caching, or other pre/post processing',
  ],
  whenNotToUse: [
    'When direct access to the object is sufficient',
    'When the indirection adds unacceptable latency',
    'When the proxy logic is trivial',
    'When it complicates the design unnecessarily',
  ],
  badExample: `// ❌ Anti-Pattern: No control over expensive operations
class HeavyImage {
  private data: Buffer;

  constructor(filename: string) {
    // Always loads image, even if never displayed
    console.log(\`Loading heavy image: \${filename}\`);
    this.data = this.loadFromDisk(filename);
  }

  private loadFromDisk(filename: string): Buffer {
    // Expensive operation - loads 100MB image
    return Buffer.alloc(100 * 1024 * 1024);
  }

  display(): void {
    console.log('Displaying image');
  }
}

// All images loaded immediately, even if never viewed
const gallery = [
  new HeavyImage('photo1.jpg'), // 100MB loaded
  new HeavyImage('photo2.jpg'), // 100MB loaded
  new HeavyImage('photo3.jpg'), // 100MB loaded
  // ... 1000 images = 100GB memory!
];`,
  goodExample: `// ✅ Best Practice: Proxy Pattern
// Subject interface
interface Image {
  display(): void;
}

// Real subject - expensive to create
class HeavyImage implements Image {
  private data: Buffer | null = null;

  constructor(private filename: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(\`Loading: \${this.filename}\`);
    this.data = Buffer.alloc(100 * 1024 * 1024);
  }

  display(): void {
    console.log(\`Displaying: \${this.filename}\`);
  }
}

// Virtual Proxy - lazy loading
class ImageProxy implements Image {
  private realImage: HeavyImage | null = null;

  constructor(private filename: string) {
    // No loading yet!
  }

  display(): void {
    // Load only when needed
    if (!this.realImage) {
      this.realImage = new HeavyImage(this.filename);
    }
    this.realImage.display();
  }
}

// Protection Proxy - access control
class ProtectedImageProxy implements Image {
  constructor(
    private realImage: Image,
    private userRole: string,
  ) {}

  display(): void {
    if (this.userRole === 'admin' || this.userRole === 'viewer') {
      this.realImage.display();
    } else {
      console.log('Access denied');
    }
  }
}

// Usage - images loaded on demand
const gallery: Image[] = [
  new ImageProxy('photo1.jpg'), // Not loaded yet
  new ImageProxy('photo2.jpg'), // Not loaded yet
  new ImageProxy('photo3.jpg'), // Not loaded yet
];

gallery[0].display(); // Only now photo1 is loaded`,
  diagram: {
    nodes: [
      {
        id: 'subject',
        type: 'interface',
        label: '«interface»\nSubject',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+request()'],
      },
      {
        id: 'real-subject',
        type: 'class',
        label: 'RealSubject',
        position: { x: 480, y: 180 },
        size: { width: 160, height: 70 },
        methods: ['+request()'],
      },
      {
        id: 'proxy',
        type: 'class',
        label: 'Proxy',
        position: { x: 180, y: 180 },
        size: { width: 160, height: 80 },
        properties: ['-realSubject: Subject'],
        methods: ['+request()'],
      },
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 80, y: 30 },
        size: { width: 120, height: 50 },
      },
    ],
    edges: [
      { id: 'e1', source: 'proxy', target: 'subject', type: 'implementation' },
      { id: 'e2', source: 'real-subject', target: 'subject', type: 'implementation' },
      { id: 'e3', source: 'proxy', target: 'real-subject', type: 'association' },
      { id: 'e4', source: 'client', target: 'subject', type: 'dependency' },
    ],
    viewport: { width: 700, height: 310 },
  },
  relatedPatterns: ['adapter', 'decorator', 'facade'],
  tags: ['structural', 'gang-of-four', 'access-control', 'lazy-loading'],
}
