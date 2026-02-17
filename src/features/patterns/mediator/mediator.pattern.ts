import type { PatternModule } from '@core/types'

export const mediatorPattern: PatternModule = {
  id: 'mediator',
  name: 'Mediator',
  category: 'behavioral',
  difficulty: 'intermediate',
  description:
    'Defines an object that encapsulates how a set of objects interact, promoting loose coupling by preventing objects from referring to each other explicitly.',
  whenToUse: [
    'When a set of objects communicate in well-defined but complex ways',
    'When reusing an object is difficult because it refers to many other objects',
    'When you want to customize behavior distributed between several classes without subclassing',
    'When you need to decouple components that interact with each other',
  ],
  whenNotToUse: [
    'When the mediator becomes overly complex (god object)',
    'When components have simple interactions',
    'When direct communication between components is clearer',
    'When there are only two components interacting',
  ],
  badExample: `// ❌ Anti-Pattern: Components tightly coupled to each other
class Button {
  private textField: TextField;
  private checkbox: Checkbox;
  private submitButton: SubmitButton;

  onClick() {
    // Directly manipulating other components
    if (this.textField.getValue().length > 0 && this.checkbox.isChecked()) {
      this.submitButton.enable();
    } else {
      this.submitButton.disable();
    }
  }
}

class TextField {
  private button: Button;
  private submitButton: SubmitButton;
  // Each component knows about all others
}

// Adding a new component requires modifying many classes
// Components cannot be reused independently`,
  goodExample: `// ✅ Best Practice: Mediator Pattern
interface Mediator {
  notify(sender: Component, event: string): void;
}

// Base component with mediator reference
abstract class Component {
  constructor(protected mediator: Mediator) {}
}

// Concrete components - only know about mediator
class TextField extends Component {
  private value = '';

  getValue() { return this.value; }

  setValue(value: string) {
    this.value = value;
    this.mediator.notify(this, 'textChanged');
  }
}

class Checkbox extends Component {
  private checked = false;

  isChecked() { return this.checked; }

  toggle() {
    this.checked = !this.checked;
    this.mediator.notify(this, 'checkboxToggled');
  }
}

class SubmitButton extends Component {
  private enabled = false;

  isEnabled() { return this.enabled; }
  enable() { this.enabled = true; }
  disable() { this.enabled = false; }

  click() {
    if (this.enabled) {
      this.mediator.notify(this, 'submit');
    }
  }
}

// Concrete mediator - coordinates all interactions
class FormMediator implements Mediator {
  private textField!: TextField;
  private checkbox!: Checkbox;
  private submitButton!: SubmitButton;

  setComponents(tf: TextField, cb: Checkbox, sb: SubmitButton) {
    this.textField = tf;
    this.checkbox = cb;
    this.submitButton = sb;
  }

  notify(sender: Component, event: string) {
    if (event === 'textChanged' || event === 'checkboxToggled') {
      this.validateForm();
    } else if (event === 'submit') {
      console.log('Form submitted!');
    }
  }

  private validateForm() {
    const isValid = this.textField.getValue().length > 0 && this.checkbox.isChecked();
    isValid ? this.submitButton.enable() : this.submitButton.disable();
  }
}

// Usage
const mediator = new FormMediator();
const textField = new TextField(mediator);
const checkbox = new Checkbox(mediator);
const submit = new SubmitButton(mediator);
mediator.setComponents(textField, checkbox, submit);`,
  diagram: {
    nodes: [
      {
        id: 'mediator',
        type: 'interface',
        label: '«interface»\nMediator',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+notify(sender, event)'],
      },
      {
        id: 'concrete-mediator',
        type: 'class',
        label: 'ConcreteMediator',
        position: { x: 300, y: 150 },
        size: { width: 160, height: 70 },
        methods: ['+notify(sender, event)'],
      },
      {
        id: 'component-a',
        type: 'class',
        label: 'ComponentA',
        position: { x: 80, y: 300 },
        size: { width: 140, height: 60 },
        properties: ['-mediator'],
      },
      {
        id: 'component-b',
        type: 'class',
        label: 'ComponentB',
        position: { x: 280, y: 300 },
        size: { width: 140, height: 60 },
        properties: ['-mediator'],
      },
      {
        id: 'component-c',
        type: 'class',
        label: 'ComponentC',
        position: { x: 480, y: 300 },
        size: { width: 140, height: 60 },
        properties: ['-mediator'],
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-mediator', target: 'mediator', type: 'implementation' },
      { id: 'e2', source: 'concrete-mediator', target: 'component-a', type: 'association' },
      { id: 'e3', source: 'concrete-mediator', target: 'component-b', type: 'association' },
      { id: 'e4', source: 'concrete-mediator', target: 'component-c', type: 'association' },
      { id: 'e5', source: 'component-a', target: 'mediator', type: 'dependency' },
      { id: 'e6', source: 'component-b', target: 'mediator', type: 'dependency' },
      { id: 'e7', source: 'component-c', target: 'mediator', type: 'dependency' },
    ],
    viewport: { width: 700, height: 410 },
  },
  relatedPatterns: ['facade', 'observer', 'command'],
  tags: ['behavioral', 'gang-of-four', 'decoupling', 'coordination'],
}
