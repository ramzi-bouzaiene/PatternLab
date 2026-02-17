import type { PatternModule } from '@core/types'

export const iteratorPattern: PatternModule = {
  id: 'iterator',
  name: 'Iterator',
  category: 'behavioral',
  difficulty: 'beginner',
  description:
    'Provides a way to access elements of an aggregate object sequentially without exposing its underlying representation.',
  whenToUse: [
    'When you want to access a collection without exposing its internal structure',
    'When you want to support multiple traversals of a collection',
    'When you want to provide a uniform interface for traversing different collections',
    'When you need to traverse custom data structures',
  ],
  whenNotToUse: [
    'When using built-in iterators is sufficient',
    'When the collection is simple (like a plain array)',
    'When only one traversal method is needed',
    'When external iteration adds unnecessary complexity',
  ],
  badExample: `// ❌ Anti-Pattern: Exposing internal structure
class BookCollection {
  public books: Book[] = []; // Exposed internal structure

  addBook(book: Book) {
    this.books.push(book);
  }
}

// Client directly manipulates internal array
const collection = new BookCollection();
collection.books.push(new Book('Title 1'));

// Iterating requires knowledge of internal structure
for (let i = 0; i < collection.books.length; i++) {
  console.log(collection.books[i].title);
}

// What if we change from array to Map or Tree?
// All client code breaks!`,
  goodExample: `// ✅ Best Practice: Iterator Pattern with TypeScript
interface Iterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  hasNext(): boolean;
  reset(): void;
}

interface IterableCollection<T> {
  createIterator(): Iterator<T>;
}

class Book {
  constructor(public title: string, public author: string) {}
}

class BookCollection implements IterableCollection<Book> {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  getCount(): number {
    return this.books.length;
  }

  getBookAt(index: number): Book | undefined {
    return this.books[index];
  }

  createIterator(): Iterator<Book> {
    return new BookIterator(this);
  }
}

class BookIterator implements Iterator<Book> {
  private position = 0;

  constructor(private collection: BookCollection) {}

  current(): Book | undefined {
    return this.collection.getBookAt(this.position);
  }

  next(): Book | undefined {
    const book = this.collection.getBookAt(this.position);
    this.position++;
    return book;
  }

  hasNext(): boolean {
    return this.position < this.collection.getCount();
  }

  reset(): void {
    this.position = 0;
  }
}

// Usage - client doesn't know internal structure
const library = new BookCollection();
library.addBook(new Book('Design Patterns', 'GoF'));
library.addBook(new Book('Clean Code', 'Robert Martin'));

const iterator = library.createIterator();
while (iterator.hasNext()) {
  const book = iterator.next();
  console.log(\`\${book?.title} by \${book?.author}\`);
}`,
  diagram: {
    nodes: [
      {
        id: 'iterator',
        type: 'interface',
        label: '«interface»\nIterator<T>',
        position: { x: 80, y: 30 },
        size: { width: 160, height: 90 },
        methods: ['+hasNext(): boolean', '+next(): T', '+reset()'],
      },
      {
        id: 'concrete-iterator',
        type: 'class',
        label: 'ConcreteIterator',
        position: { x: 80, y: 180 },
        size: { width: 160, height: 80 },
        properties: ['-position: number'],
        methods: ['+hasNext()', '+next()'],
      },
      {
        id: 'aggregate',
        type: 'interface',
        label: '«interface»\nIterableCollection<T>',
        position: { x: 480, y: 30 },
        size: { width: 180, height: 70 },
        methods: ['+createIterator()'],
      },
      {
        id: 'concrete-aggregate',
        type: 'class',
        label: 'ConcreteCollection',
        position: { x: 480, y: 180 },
        size: { width: 180, height: 80 },
        properties: ['-items: T[]'],
        methods: ['+createIterator()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-iterator', target: 'iterator', type: 'implementation' },
      { id: 'e2', source: 'concrete-aggregate', target: 'aggregate', type: 'implementation' },
      { id: 'e3', source: 'concrete-aggregate', target: 'concrete-iterator', type: 'dependency', label: 'creates' },
      { id: 'e4', source: 'concrete-iterator', target: 'concrete-aggregate', type: 'association' },
    ],
    viewport: { width: 750, height: 320 },
  },
  relatedPatterns: ['composite', 'factory', 'visitor'],
  tags: ['behavioral', 'gang-of-four', 'traversal', 'collection'],
}
