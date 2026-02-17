import type { PatternModule } from '@core/types'

export const statePattern: PatternModule = {
  id: 'state',
  name: 'State',
  category: 'behavioral',
  difficulty: 'intermediate',
  description:
    'Allows an object to alter its behavior when its internal state changes, appearing to change its class.',
  whenToUse: [
    'When an object\'s behavior depends on its state and must change at runtime',
    'When operations have large conditional statements based on state',
    'When you want to avoid massive conditionals that switch on state',
    'When state-specific behavior should be encapsulated independently',
  ],
  whenNotToUse: [
    'When there are only a few states with simple behavior',
    'When state transitions are infrequent',
    'When state-specific behavior is minimal',
    'When adding state classes adds more complexity than conditionals',
  ],
  badExample: `// ❌ Anti-Pattern: Complex switch/case on state
class Document {
  private state: 'draft' | 'moderation' | 'published' = 'draft';

  publish() {
    switch (this.state) {
      case 'draft':
        this.state = 'moderation';
        console.log('Sent to moderation');
        break;
      case 'moderation':
        this.state = 'published';
        console.log('Published!');
        break;
      case 'published':
        console.log('Already published');
        break;
    }
  }

  // Every method needs similar switch statements
  edit() {
    switch (this.state) {
      case 'draft':
        console.log('Editing draft');
        break;
      case 'moderation':
        console.log('Cannot edit during moderation');
        break;
      case 'published':
        console.log('Creating new draft from published');
        this.state = 'draft';
        break;
    }
  }
  // Adding new states requires changing every method!
}`,
  goodExample: `// ✅ Best Practice: State Pattern
interface DocumentState {
  publish(doc: Document): void;
  edit(doc: Document): void;
  getName(): string;
}

class DraftState implements DocumentState {
  publish(doc: Document) {
    console.log('Sending to moderation...');
    doc.setState(new ModerationState());
  }

  edit(doc: Document) {
    console.log('Editing draft...');
  }

  getName() { return 'Draft'; }
}

class ModerationState implements DocumentState {
  publish(doc: Document) {
    console.log('Publishing...');
    doc.setState(new PublishedState());
  }

  edit(doc: Document) {
    console.log('Cannot edit during moderation');
  }

  getName() { return 'Moderation'; }
}

class PublishedState implements DocumentState {
  publish(doc: Document) {
    console.log('Already published');
  }

  edit(doc: Document) {
    console.log('Creating new draft from published version...');
    doc.setState(new DraftState());
  }

  getName() { return 'Published'; }
}

class Document {
  private state: DocumentState;

  constructor() {
    this.state = new DraftState();
  }

  setState(state: DocumentState) {
    console.log(\`State: \${this.state.getName()} → \${state.getName()}\`);
    this.state = state;
  }

  publish() { this.state.publish(this); }
  edit() { this.state.edit(this); }
  getStateName() { return this.state.getName(); }
}

// Usage
const doc = new Document();
doc.publish(); // Draft → Moderation
doc.publish(); // Moderation → Published
doc.edit();    // Creates new draft`,
  diagram: {
    nodes: [
      {
        id: 'context',
        type: 'class',
        label: 'Context',
        position: { x: 80, y: 120 },
        size: { width: 160, height: 80 },
        properties: ['-state: State'],
        methods: ['+setState()', '+request()'],
      },
      {
        id: 'state',
        type: 'interface',
        label: '«interface»\nState',
        position: { x: 350, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+handle(context)'],
      },
      {
        id: 'state-a',
        type: 'class',
        label: 'ConcreteStateA',
        position: { x: 250, y: 180 },
        size: { width: 150, height: 60 },
        methods: ['+handle()'],
      },
      {
        id: 'state-b',
        type: 'class',
        label: 'ConcreteStateB',
        position: { x: 430, y: 180 },
        size: { width: 150, height: 60 },
        methods: ['+handle()'],
      },
      {
        id: 'state-c',
        type: 'class',
        label: 'ConcreteStateC',
        position: { x: 610, y: 180 },
        size: { width: 150, height: 60 },
        methods: ['+handle()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'context', target: 'state', type: 'association' },
      { id: 'e2', source: 'state-a', target: 'state', type: 'implementation' },
      { id: 'e3', source: 'state-b', target: 'state', type: 'implementation' },
      { id: 'e4', source: 'state-c', target: 'state', type: 'implementation' },
    ],
    viewport: { width: 820, height: 300 },
  },
  relatedPatterns: ['strategy', 'singleton', 'flyweight'],
  tags: ['behavioral', 'gang-of-four', 'state-machine', 'encapsulation'],
}
