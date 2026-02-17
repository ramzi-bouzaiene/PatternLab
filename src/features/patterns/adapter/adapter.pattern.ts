import type { PatternModule } from '@core/types'

export const adapterPattern: PatternModule = {
  id: 'adapter',
  name: 'Adapter',
  category: 'structural',
  difficulty: 'beginner',
  description:
    'Converts the interface of a class into another interface that clients expect, allowing incompatible interfaces to work together.',
  whenToUse: [
    'When you want to use an existing class but its interface is incompatible',
    'When you need to create a reusable class that cooperates with unrelated classes',
    'When integrating third-party libraries with different interfaces',
    'When you need to use several existing subclasses without modifying each one',
  ],
  whenNotToUse: [
    'When you can modify the existing class to match the interface',
    'When the adaptation is too complex or loses important functionality',
    'When a simpler solution like inheritance would work',
    'When it introduces unnecessary complexity for simple cases',
  ],
  badExample: `// ❌ Anti-Pattern: Direct coupling to incompatible interface
// Third-party payment library with different interface
class StripePayment {
  makePayment(amountInCents: number, currency: string) {
    // Stripe-specific implementation
  }
}

// Your application expects different interface
class OrderProcessor {
  processOrder(order: Order) {
    const stripe = new StripePayment();
    // Manually adapting everywhere - duplicated conversion logic
    stripe.makePayment(order.total * 100, 'USD');
  }
}

class SubscriptionHandler {
  chargeSubscription(sub: Subscription) {
    const stripe = new StripePayment();
    // Same conversion logic duplicated
    stripe.makePayment(sub.price * 100, 'USD');
  }
}`,
  goodExample: `// ✅ Best Practice: Adapter Pattern
// Target interface your application expects
interface PaymentProcessor {
  pay(amount: number, currency: string): Promise<PaymentResult>;
}

// Adaptee - the incompatible third-party class
class StripePayment {
  makePayment(amountInCents: number, currency: string): StripeResult {
    // Stripe-specific implementation
  }
}

// Adapter - converts Stripe interface to your interface
class StripeAdapter implements PaymentProcessor {
  private stripe: StripePayment;

  constructor() {
    this.stripe = new StripePayment();
  }

  async pay(amount: number, currency: string): Promise<PaymentResult> {
    const amountInCents = Math.round(amount * 100);
    const result = this.stripe.makePayment(amountInCents, currency);

    return {
      success: result.status === 'succeeded',
      transactionId: result.id,
    };
  }
}

// Client code works with the common interface
class OrderProcessor {
  constructor(private paymentProcessor: PaymentProcessor) {}

  async processOrder(order: Order) {
    await this.paymentProcessor.pay(order.total, 'USD');
  }
}

// Easy to switch payment providers
const processor = new OrderProcessor(new StripeAdapter());`,
  diagram: {
    nodes: [
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 80, y: 150 },
        size: { width: 120, height: 60 },
      },
      {
        id: 'target',
        type: 'interface',
        label: '«interface»\nTarget',
        position: { x: 280, y: 50 },
        size: { width: 160, height: 70 },
        methods: ['+request()'],
      },
      {
        id: 'adapter',
        type: 'class',
        label: 'Adapter',
        position: { x: 280, y: 180 },
        size: { width: 160, height: 80 },
        properties: ['-adaptee: Adaptee'],
        methods: ['+request()'],
      },
      {
        id: 'adaptee',
        type: 'class',
        label: 'Adaptee',
        position: { x: 540, y: 180 },
        size: { width: 160, height: 70 },
        methods: ['+specificRequest()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'client', target: 'target', type: 'dependency' },
      { id: 'e2', source: 'adapter', target: 'target', type: 'implementation' },
      { id: 'e3', source: 'adapter', target: 'adaptee', type: 'association' },
    ],
    viewport: { width: 800, height: 350 },
  },
  relatedPatterns: ['bridge', 'decorator', 'facade'],
  tags: ['structural', 'gang-of-four', 'wrapper', 'interface-conversion'],
}
