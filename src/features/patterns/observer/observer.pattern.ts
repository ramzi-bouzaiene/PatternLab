import type { PatternModule } from '@core/types'

export const observerPattern: PatternModule = {
  id: 'observer',
  name: 'Observer',
  category: 'behavioral',
  difficulty: 'intermediate',
  description:
    'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
  whenToUse: [
    'When changes to one object require changing others, and you don\'t know how many objects need to change',
    'When an object should notify other objects without making assumptions about those objects',
    'For implementing event handling systems',
    'When you need loose coupling between interacting objects',
  ],
  whenNotToUse: [
    'When the order of notifications matters (observers are notified in arbitrary order)',
    'When updates cause cascading updates (can lead to performance issues)',
    'When observers and subjects are tightly coupled anyway',
    'For simple scenarios where callbacks suffice',
  ],
  badExample: `// ❌ Anti-Pattern: Tight coupling and manual updates
class ShoppingCart {
  items: Item[] = [];

  addItem(item: Item) {
    this.items.push(item);
    // Tight coupling - cart knows about all dependents
    this.cartDisplay.update(this.items);
    this.priceCalculator.recalculate(this.items);
    this.inventoryChecker.verify(this.items);
    this.analyticsTracker.track('item_added', item);
    // Need to modify this method for every new feature!
  }
}

// Hard to test, extend, or modify`,
  goodExample: `// ✅ Best Practice: Observer Pattern with TypeScript
type Observer<T> = (data: T) => void;

class Observable<T> {
  private observers = new Set<Observer<T>>();

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer);
    // Return unsubscribe function
    return () => this.observers.delete(observer);
  }

  notify(data: T): void {
    this.observers.forEach(observer => observer(data));
  }
}

// Usage with ShoppingCart
class ShoppingCart extends Observable<CartEvent> {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
    this.notify({ type: 'ITEM_ADDED', item, items: [...this.items] });
  }

  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
    this.notify({ type: 'ITEM_REMOVED', id, items: [...this.items] });
  }
}

// Loosely coupled observers
const cart = new ShoppingCart();

const unsubDisplay = cart.subscribe(e => cartDisplay.update(e.items));
const unsubAnalytics = cart.subscribe(e => analytics.track(e));

// Easy cleanup
unsubDisplay();`,
  diagram: {
    nodes: [
      {
        id: 'subject',
        type: 'interface',
        label: 'Subject',
        position: { x: 80, y: 50 },
        size: { width: 180, height: 100 },
        methods: ['+subscribe()', '+unsubscribe()', '+notify()'],
      },
      {
        id: 'observer',
        type: 'interface',
        label: 'Observer',
        position: { x: 520, y: 50 },
        size: { width: 160, height: 80 },
        methods: ['+update(data)'],
      },
      {
        id: 'concrete-subject',
        type: 'class',
        label: 'ShoppingCart',
        position: { x: 80, y: 220 },
        size: { width: 180, height: 100 },
        properties: ['-observers: Set', '-items: Item[]'],
        methods: ['+addItem()', '+removeItem()'],
      },
      {
        id: 'observer-a',
        type: 'class',
        label: 'CartDisplay',
        position: { x: 400, y: 220 },
        size: { width: 140, height: 80 },
        methods: ['+update()'],
      },
      {
        id: 'observer-b',
        type: 'class',
        label: 'Analytics',
        position: { x: 560, y: 220 },
        size: { width: 140, height: 80 },
        methods: ['+update()'],
      },
    ],
    edges: [
      {
        id: 'e1',
        type: 'implementation',
        source: 'concrete-subject',
        target: 'subject',
      },
      {
        id: 'e2',
        type: 'implementation',
        source: 'observer-a',
        target: 'observer',
      },
      {
        id: 'e3',
        type: 'implementation',
        source: 'observer-b',
        target: 'observer',
      },
      {
        id: 'e4',
        type: 'association',
        source: 'subject',
        target: 'observer',
        label: 'notifies',
        animated: true,
      },
    ],
    animation: {
      duration: 0.4,
      delay: 0.1,
      stagger: 0.12,
    },
    viewport: {
      width: 800,
      height: 400,
    },
  },
  relatedPatterns: ['mediator', 'event-emitter'],
  tags: ['observer', 'behavioral', 'events', 'pub-sub', 'reactive'],
}
