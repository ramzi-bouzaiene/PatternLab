import type { PatternModule } from '@core/types'

export const chainOfResponsibilityPattern: PatternModule = {
  id: 'chain-of-responsibility',
  name: 'Chain of Responsibility',
  category: 'behavioral',
  difficulty: 'intermediate',
  description:
    'Passes a request along a chain of handlers, where each handler decides either to process the request or pass it to the next handler.',
  whenToUse: [
    'When more than one object may handle a request and the handler is not known a priori',
    'When you want to issue a request to one of several objects without specifying the receiver',
    'When the set of handlers should be specified dynamically',
    'When you want to decouple senders and receivers',
  ],
  whenNotToUse: [
    'When every request must be handled',
    'When the chain is too long and performance is critical',
    'When there is only one handler',
    'When the handling logic is simple and static',
  ],
  badExample: `// ❌ Anti-Pattern: Hardcoded if-else chain
class SupportTicket {
  constructor(public severity: string, public issue: string) {}
}

function handleTicket(ticket: SupportTicket) {
  // Tightly coupled, hard to modify
  if (ticket.severity === 'low') {
    console.log('FAQ Bot handling:', ticket.issue);
  } else if (ticket.severity === 'medium') {
    console.log('Level 1 Support handling:', ticket.issue);
  } else if (ticket.severity === 'high') {
    console.log('Level 2 Support handling:', ticket.issue);
  } else if (ticket.severity === 'critical') {
    console.log('Manager handling:', ticket.issue);
  } else {
    console.log('Unknown severity');
  }
  // Adding new handlers requires modifying this function
}`,
  goodExample: `// ✅ Best Practice: Chain of Responsibility Pattern
interface SupportHandler {
  setNext(handler: SupportHandler): SupportHandler;
  handle(ticket: SupportTicket): void;
}

abstract class BaseSupportHandler implements SupportHandler {
  private nextHandler: SupportHandler | null = null;

  setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler; // Enable chaining
  }

  handle(ticket: SupportTicket): void {
    if (this.canHandle(ticket)) {
      this.process(ticket);
    } else if (this.nextHandler) {
      this.nextHandler.handle(ticket);
    } else {
      console.log('No handler available for:', ticket.issue);
    }
  }

  protected abstract canHandle(ticket: SupportTicket): boolean;
  protected abstract process(ticket: SupportTicket): void;
}

class FAQBot extends BaseSupportHandler {
  protected canHandle(ticket: SupportTicket) {
    return ticket.severity === 'low';
  }
  protected process(ticket: SupportTicket) {
    console.log('FAQ Bot resolved:', ticket.issue);
  }
}

class Level1Support extends BaseSupportHandler {
  protected canHandle(ticket: SupportTicket) {
    return ticket.severity === 'medium';
  }
  protected process(ticket: SupportTicket) {
    console.log('Level 1 handled:', ticket.issue);
  }
}

class ManagerSupport extends BaseSupportHandler {
  protected canHandle(ticket: SupportTicket) {
    return ticket.severity === 'critical';
  }
  protected process(ticket: SupportTicket) {
    console.log('Manager escalated:', ticket.issue);
  }
}

// Build chain dynamically
const faq = new FAQBot();
const level1 = new Level1Support();
const manager = new ManagerSupport();

faq.setNext(level1).setNext(manager);
faq.handle(new SupportTicket('critical', 'System down'));`,
  diagram: {
    nodes: [
      {
        id: 'handler',
        type: 'interface',
        label: '«interface»\nHandler',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 80 },
        methods: ['+setNext(Handler)', '+handle(request)'],
      },
      {
        id: 'base-handler',
        type: 'class',
        label: 'BaseHandler',
        position: { x: 300, y: 160 },
        size: { width: 160, height: 80 },
        properties: ['-nextHandler: Handler'],
        methods: ['+setNext()', '+handle()'],
      },
      {
        id: 'handler-a',
        type: 'class',
        label: 'ConcreteHandlerA',
        position: { x: 120, y: 300 },
        size: { width: 160, height: 60 },
        methods: ['+handle()'],
      },
      {
        id: 'handler-b',
        type: 'class',
        label: 'ConcreteHandlerB',
        position: { x: 320, y: 300 },
        size: { width: 160, height: 60 },
        methods: ['+handle()'],
      },
      {
        id: 'handler-c',
        type: 'class',
        label: 'ConcreteHandlerC',
        position: { x: 520, y: 300 },
        size: { width: 160, height: 60 },
        methods: ['+handle()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'base-handler', target: 'handler', type: 'implementation' },
      { id: 'e2', source: 'handler-a', target: 'base-handler', type: 'inheritance' },
      { id: 'e3', source: 'handler-b', target: 'base-handler', type: 'inheritance' },
      { id: 'e4', source: 'handler-c', target: 'base-handler', type: 'inheritance' },
      { id: 'e5', source: 'base-handler', target: 'handler', type: 'association', label: 'next' },
    ],
    viewport: { width: 750, height: 410 },
  },
  relatedPatterns: ['command', 'mediator', 'observer'],
  tags: ['behavioral', 'gang-of-four', 'request-handling', 'decoupling'],
}
