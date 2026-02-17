import type { PatternModule } from '@core/types'

export const strategyPattern: PatternModule = {
  id: 'strategy',
  name: 'Strategy',
  category: 'behavioral',
  difficulty: 'beginner',
  description:
    'Defines a family of algorithms, encapsulates each one, and makes them interchangeable, letting the algorithm vary independently from clients that use it.',
  whenToUse: [
    'When you need different variants of an algorithm',
    'When you have many related classes that differ only in their behavior',
    'When you want to avoid exposing complex algorithm-specific data structures',
    'When a class has multiple behaviors that appear as conditional statements',
  ],
  whenNotToUse: [
    'When there are only a few algorithms that rarely change',
    'When the overhead of strategy objects is not justified',
    'When clients must be aware of different strategies',
    'When algorithms are tightly coupled to context data',
  ],
  badExample: `// ❌ Anti-Pattern: Algorithms embedded in conditionals
class PaymentProcessor {
  processPayment(amount: number, method: string) {
    if (method === 'credit_card') {
      // Credit card processing logic (50 lines)
      console.log('Validating card...');
      console.log('Charging card:', amount);
      // More credit card specific code
    } else if (method === 'paypal') {
      // PayPal processing logic (50 lines)
      console.log('Redirecting to PayPal...');
      console.log('Processing PayPal payment:', amount);
      // More PayPal specific code
    } else if (method === 'crypto') {
      // Crypto processing logic (50 lines)
      console.log('Generating wallet address...');
      console.log('Waiting for blockchain confirmation...');
      // More crypto specific code
    }
    // Adding new payment method = modifying this class
    // Class grows indefinitely
  }
}`,
  goodExample: `// ✅ Best Practice: Strategy Pattern
interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
  getName(): string;
}

class CreditCardStrategy implements PaymentStrategy {
  constructor(private cardNumber: string, private cvv: string) {}

  async pay(amount: number): Promise<PaymentResult> {
    console.log(\`Charging \$\${amount} to card ending \${this.cardNumber.slice(-4)}\`);
    // Credit card specific implementation
    return { success: true, transactionId: 'cc_123' };
  }

  getName() { return 'Credit Card'; }
}

class PayPalStrategy implements PaymentStrategy {
  constructor(private email: string) {}

  async pay(amount: number): Promise<PaymentResult> {
    console.log(\`Processing PayPal payment of \$\${amount} for \${this.email}\`);
    // PayPal specific implementation
    return { success: true, transactionId: 'pp_456' };
  }

  getName() { return 'PayPal'; }
}

class CryptoStrategy implements PaymentStrategy {
  constructor(private walletAddress: string) {}

  async pay(amount: number): Promise<PaymentResult> {
    console.log(\`Sending \$\${amount} in crypto to \${this.walletAddress}\`);
    // Crypto specific implementation
    return { success: true, transactionId: 'btc_789' };
  }

  getName() { return 'Cryptocurrency'; }
}

// Context
class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  async checkout(amount: number): Promise<PaymentResult> {
    console.log(\`Processing payment via \${this.strategy.getName()}\`);
    return this.strategy.pay(amount);
  }
}

// Usage - easily switch strategies
const processor = new PaymentProcessor(new CreditCardStrategy('4111...', '123'));
await processor.checkout(99.99);

processor.setStrategy(new PayPalStrategy('user@email.com'));
await processor.checkout(49.99);`,
  diagram: {
    nodes: [
      {
        id: 'context',
        type: 'class',
        label: 'Context',
        position: { x: 80, y: 100 },
        size: { width: 160, height: 80 },
        properties: ['-strategy: Strategy'],
        methods: ['+setStrategy()', '+execute()'],
      },
      {
        id: 'strategy',
        type: 'interface',
        label: '«interface»\nStrategy',
        position: { x: 350, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+algorithm()'],
      },
      {
        id: 'strategy-a',
        type: 'class',
        label: 'ConcreteStrategyA',
        position: { x: 250, y: 180 },
        size: { width: 160, height: 60 },
        methods: ['+algorithm()'],
      },
      {
        id: 'strategy-b',
        type: 'class',
        label: 'ConcreteStrategyB',
        position: { x: 450, y: 180 },
        size: { width: 160, height: 60 },
        methods: ['+algorithm()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'context', target: 'strategy', type: 'association' },
      { id: 'e2', source: 'strategy-a', target: 'strategy', type: 'implementation' },
      { id: 'e3', source: 'strategy-b', target: 'strategy', type: 'implementation' },
    ],
    viewport: { width: 700, height: 300 },
  },
  relatedPatterns: ['state', 'template-method', 'decorator'],
  tags: ['behavioral', 'gang-of-four', 'algorithms', 'interchangeable'],
}
