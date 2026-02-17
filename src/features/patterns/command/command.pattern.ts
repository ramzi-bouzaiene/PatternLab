import type { PatternModule } from '@core/types'

export const commandPattern: PatternModule = {
  id: 'command',
  name: 'Command',
  category: 'behavioral',
  difficulty: 'intermediate',
  description:
    'Encapsulates a request as an object, allowing you to parameterize clients with different requests, queue requests, and support undoable operations.',
  whenToUse: [
    'When you want to parameterize objects with operations',
    'When you need to queue, schedule, or log operations',
    'When you need to support undo/redo functionality',
    'When you want to structure a system around high-level operations built on primitive operations',
  ],
  whenNotToUse: [
    'When operations are simple and do not need to be queued or undone',
    'When the overhead of command objects is not justified',
    'When there is no need for operation history',
    'When direct method calls are sufficient',
  ],
  badExample: `// ❌ Anti-Pattern: Direct calls without encapsulation
class TextEditor {
  private text = '';

  write(text: string) {
    this.text += text;
  }

  delete(count: number) {
    this.text = this.text.slice(0, -count);
  }

  getText() { return this.text; }
}

// No way to undo, queue, or replay operations
const editor = new TextEditor();
editor.write('Hello');
editor.write(' World');
editor.delete(5);
// Oops! Can't undo the delete
// Can't replay these operations
// Can't log what was done`,
  goodExample: `// ✅ Best Practice: Command Pattern
interface Command {
  execute(): void;
  undo(): void;
}

class TextEditor {
  private text = '';

  insert(text: string, position: number) {
    this.text = this.text.slice(0, position) + text + this.text.slice(position);
  }

  remove(position: number, length: number): string {
    const removed = this.text.slice(position, position + length);
    this.text = this.text.slice(0, position) + this.text.slice(position + length);
    return removed;
  }

  getText() { return this.text; }
  getLength() { return this.text.length; }
}

class InsertCommand implements Command {
  constructor(
    private editor: TextEditor,
    private text: string,
    private position: number,
  ) {}

  execute() {
    this.editor.insert(this.text, this.position);
  }

  undo() {
    this.editor.remove(this.position, this.text.length);
  }
}

class CommandHistory {
  private history: Command[] = [];
  private position = -1;

  execute(command: Command) {
    // Remove any undone commands
    this.history = this.history.slice(0, this.position + 1);
    command.execute();
    this.history.push(command);
    this.position++;
  }

  undo() {
    if (this.position >= 0) {
      this.history[this.position].undo();
      this.position--;
    }
  }

  redo() {
    if (this.position < this.history.length - 1) {
      this.position++;
      this.history[this.position].execute();
    }
  }
}

// Usage
const editor = new TextEditor();
const history = new CommandHistory();

history.execute(new InsertCommand(editor, 'Hello', 0));
history.execute(new InsertCommand(editor, ' World', 5));
console.log(editor.getText()); // "Hello World"

history.undo(); // Undo " World"
console.log(editor.getText()); // "Hello"

history.redo(); // Redo " World"
console.log(editor.getText()); // "Hello World"`,
  diagram: {
    nodes: [
      {
        id: 'invoker',
        type: 'class',
        label: 'Invoker',
        position: { x: 80, y: 120 },
        size: { width: 140, height: 70 },
        properties: ['-command: Command'],
        methods: ['+executeCommand()'],
      },
      {
        id: 'command',
        type: 'interface',
        label: '«interface»\nCommand',
        position: { x: 300, y: 30 },
        size: { width: 160, height: 70 },
        methods: ['+execute()', '+undo()'],
      },
      {
        id: 'concrete-command',
        type: 'class',
        label: 'ConcreteCommand',
        position: { x: 300, y: 180 },
        size: { width: 160, height: 80 },
        properties: ['-receiver: Receiver'],
        methods: ['+execute()', '+undo()'],
      },
      {
        id: 'receiver',
        type: 'class',
        label: 'Receiver',
        position: { x: 540, y: 180 },
        size: { width: 140, height: 70 },
        methods: ['+action()'],
      },
      {
        id: 'client',
        type: 'class',
        label: 'Client',
        position: { x: 300, y: 330 },
        size: { width: 120, height: 50 },
      },
    ],
    edges: [
      { id: 'e1', source: 'invoker', target: 'command', type: 'association' },
      { id: 'e2', source: 'concrete-command', target: 'command', type: 'implementation' },
      { id: 'e3', source: 'concrete-command', target: 'receiver', type: 'association' },
      { id: 'e4', source: 'client', target: 'invoker', type: 'dependency' },
      { id: 'e5', source: 'client', target: 'concrete-command', type: 'dependency' },
    ],
    viewport: { width: 750, height: 430 },
  },
  relatedPatterns: ['chain-of-responsibility', 'memento', 'strategy'],
  tags: ['behavioral', 'gang-of-four', 'undo-redo', 'encapsulation'],
}
