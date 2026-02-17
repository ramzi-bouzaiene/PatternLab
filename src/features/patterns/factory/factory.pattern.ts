import type { PatternModule } from '@core/types'

export const factoryPattern: PatternModule = {
  id: 'factory',
  name: 'Factory Method',
  category: 'creational',
  difficulty: 'intermediate',
  description:
    'Defines an interface for creating an object, but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.',
  whenToUse: [
    'When a class cannot anticipate the class of objects it must create',
    'When a class wants its subclasses to specify the objects it creates',
    'When you want to localize the knowledge of which class gets created',
    'When creating objects requires complex logic that shouldn\'t be in constructors',
  ],
  whenNotToUse: [
    'When object creation is simple and unlikely to change',
    'When you only need a single type of object',
    'When it adds unnecessary complexity for simple use cases',
    'When direct instantiation is clearer and more maintainable',
  ],
  badExample: `// ❌ Anti-Pattern: Direct instantiation with conditionals
class NotificationService {
  send(type: string, message: string, recipient: string) {
    let notification;

    // Violates Open/Closed Principle
    // Must modify this method for every new notification type
    if (type === 'email') {
      notification = new EmailNotification();
      notification.setSmtpServer('smtp.example.com');
      notification.setFrom('noreply@example.com');
    } else if (type === 'sms') {
      notification = new SmsNotification();
      notification.setProvider('twilio');
      notification.setFromNumber('+1234567890');
    } else if (type === 'push') {
      notification = new PushNotification();
      notification.setApiKey('...');
    } else {
      throw new Error('Unknown notification type');
    }

    notification.send(message, recipient);
  }
}`,
  goodExample: `// ✅ Best Practice: Factory Method Pattern
interface Notification {
  send(message: string, recipient: string): Promise<void>;
}

abstract class NotificationFactory {
  // Factory method
  abstract createNotification(): Notification;

  // Template method using the factory
  async send(message: string, recipient: string): Promise<void> {
    const notification = this.createNotification();
    await notification.send(message, recipient);
  }
}

class EmailNotificationFactory extends NotificationFactory {
  constructor(private config: EmailConfig) { super(); }

  createNotification(): Notification {
    return new EmailNotification(this.config);
  }
}

class SmsNotificationFactory extends NotificationFactory {
  constructor(private config: SmsConfig) { super(); }

  createNotification(): Notification {
    return new SmsNotification(this.config);
  }
}

// Usage - easy to extend with new notification types
const factories: Record<string, NotificationFactory> = {
  email: new EmailNotificationFactory(emailConfig),
  sms: new SmsNotificationFactory(smsConfig),
};

await factories['email'].send('Hello!', 'user@example.com');`,
  diagram: {
    nodes: [
      {
        id: 'creator',
        type: 'abstract',
        label: 'NotificationFactory',
        position: { x: 80, y: 50 },
        size: { width: 200, height: 100 },
        methods: ['+createNotification()', '+send()'],
      },
      {
        id: 'product',
        type: 'interface',
        label: 'Notification',
        position: { x: 520, y: 50 },
        size: { width: 160, height: 80 },
        methods: ['+send()'],
      },
      {
        id: 'creator-a',
        type: 'class',
        label: 'EmailFactory',
        position: { x: 20, y: 230 },
        size: { width: 160, height: 80 },
        methods: ['+createNotification()'],
      },
      {
        id: 'creator-b',
        type: 'class',
        label: 'SmsFactory',
        position: { x: 200, y: 230 },
        size: { width: 160, height: 80 },
        methods: ['+createNotification()'],
      },
      {
        id: 'product-a',
        type: 'class',
        label: 'EmailNotification',
        position: { x: 440, y: 230 },
        size: { width: 160, height: 80 },
        methods: ['+send()'],
      },
      {
        id: 'product-b',
        type: 'class',
        label: 'SmsNotification',
        position: { x: 620, y: 230 },
        size: { width: 160, height: 80 },
        methods: ['+send()'],
      },
    ],
    edges: [
      {
        id: 'e1',
        type: 'inheritance',
        source: 'creator-a',
        target: 'creator',
      },
      {
        id: 'e2',
        type: 'inheritance',
        source: 'creator-b',
        target: 'creator',
      },
      {
        id: 'e3',
        type: 'implementation',
        source: 'product-a',
        target: 'product',
      },
      {
        id: 'e4',
        type: 'implementation',
        source: 'product-b',
        target: 'product',
      },
      {
        id: 'e5',
        type: 'dependency',
        source: 'creator-a',
        target: 'product-a',
        label: 'creates',
        animated: true,
      },
      {
        id: 'e6',
        type: 'dependency',
        source: 'creator-b',
        target: 'product-b',
        label: 'creates',
        animated: true,
      },
    ],
    animation: {
      duration: 0.4,
      delay: 0.1,
      stagger: 0.1,
    },
    viewport: {
      width: 850,
      height: 400,
    },
  },
  relatedPatterns: ['abstract-factory', 'builder', 'prototype'],
  tags: ['factory', 'creational', 'instantiation', 'polymorphism'],
}
