import type { PatternModule } from '@core/types'

export const singletonPattern: PatternModule = {
  id: 'singleton',
  name: 'Singleton',
  category: 'creational',
  difficulty: 'beginner',
  description:
    'Ensures a class has only one instance and provides a global point of access to it.',
  whenToUse: [
    'When exactly one instance of a class is needed',
    'When you need strict control over global variables',
    'For shared resources like configuration, logging, or database connections',
    'When a single point of coordination is needed in the system',
  ],
  whenNotToUse: [
    'When the single instance requirement might change',
    'In heavily multithreaded environments without proper synchronization',
    'When it introduces hidden dependencies and tight coupling',
    'When it makes unit testing difficult',
  ],
  badExample: `// ❌ Anti-Pattern: Global state without control
let instance: DatabaseConnection | null = null;
let config: AppConfig | null = null;

// Multiple global variables, no encapsulation
function getDatabase() {
  if (!instance) {
    instance = new DatabaseConnection(config);
  }
  return instance;
}

// Can be accidentally reassigned
instance = null; // Oops!

// No way to control initialization order
class UserService {
  db = getDatabase(); // What if config isn't set yet?
}`,
  goodExample: `// ✅ Best Practice: Proper Singleton with TypeScript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: Connection | null = null;

  // Private constructor prevents direct instantiation
  private constructor(private config: DbConfig) {}

  // Controlled access point
  public static getInstance(config?: DbConfig): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      if (!config) {
        throw new Error('Config required for first initialization');
      }
      DatabaseConnection.instance = new DatabaseConnection(config);
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await createConnection(this.config);
    }
  }

  public getConnection(): Connection {
    if (!this.connection) {
      throw new Error('Not connected. Call connect() first.');
    }
    return this.connection;
  }
}

// Usage
const db = DatabaseConnection.getInstance({ host: 'localhost' });
await db.connect();`,
  diagram: {
    nodes: [
      {
        id: 'singleton-class',
        type: 'class',
        label: 'Singleton',
        position: { x: 320, y: 50 },
        size: { width: 180, height: 120 },
        properties: ['-instance: Singleton', '-data: any'],
        methods: ['+getInstance()', '+operation()'],
      },
      {
        id: 'client-1',
        type: 'class',
        label: 'ClientA',
        position: { x: 120, y: 280 },
        size: { width: 140, height: 80 },
      },
      {
        id: 'client-2',
        type: 'class',
        label: 'ClientB',
        position: { x: 320, y: 280 },
        size: { width: 140, height: 80 },
      },
      {
        id: 'client-3',
        type: 'class',
        label: 'ClientC',
        position: { x: 520, y: 280 },
        size: { width: 140, height: 80 },
      },
    ],
    edges: [
      {
        id: 'e1',
        type: 'dependency',
        source: 'client-1',
        target: 'singleton-class',
        label: 'uses',
        animated: true,
      },
      {
        id: 'e2',
        type: 'dependency',
        source: 'client-2',
        target: 'singleton-class',
        label: 'uses',
        animated: true,
      },
      {
        id: 'e3',
        type: 'dependency',
        source: 'client-3',
        target: 'singleton-class',
        label: 'uses',
        animated: true,
      },
    ],
    animation: {
      duration: 0.4,
      delay: 0.1,
      stagger: 0.15,
    },
    viewport: {
      width: 800,
      height: 450,
    },
  },
  relatedPatterns: ['factory', 'abstract-factory'],
  tags: ['singleton', 'creational', 'global-state', 'instance'],
}
