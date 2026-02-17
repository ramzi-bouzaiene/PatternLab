import type { PatternModule } from '@core/types'

export const mementoPattern: PatternModule = {
  id: 'memento',
  name: 'Memento',
  category: 'behavioral',
  difficulty: 'intermediate',
  description:
    'Captures and externalizes an object\'s internal state without violating encapsulation, allowing the object to be restored to this state later.',
  whenToUse: [
    'When you need to save and restore the state of an object',
    'When direct access to state would expose implementation details',
    'When you need to implement undo/redo, checkpoints, or rollback',
    'When you want to take snapshots of object state',
  ],
  whenNotToUse: [
    'When the originator has simple state that can be easily copied',
    'When saving state frequently would consume too much memory',
    'When the object state is immutable',
    'When state changes are infrequent',
  ],
  badExample: `// ❌ Anti-Pattern: Exposing internal state for backup
class GameCharacter {
  public health: number = 100;
  public position: { x: number; y: number } = { x: 0, y: 0 };
  public inventory: string[] = [];
  public level: number = 1;
  // All state is public - breaks encapsulation
}

// Manual backup - knows too much about internals
function saveGame(character: GameCharacter) {
  return {
    health: character.health,
    position: { ...character.position },
    inventory: [...character.inventory],
    level: character.level,
  };
}

function loadGame(character: GameCharacter, save: any) {
  character.health = save.health;
  character.position = save.position;
  character.inventory = save.inventory;
  character.level = save.level;
  // Must update if GameCharacter changes
}`,
  goodExample: `// ✅ Best Practice: Memento Pattern
// Memento - stores state snapshot
class GameMemento {
  constructor(
    private readonly health: number,
    private readonly position: { x: number; y: number },
    private readonly inventory: string[],
    private readonly level: number,
    private readonly timestamp: Date,
  ) {}

  getState() {
    return {
      health: this.health,
      position: { ...this.position },
      inventory: [...this.inventory],
      level: this.level,
    };
  }

  getTimestamp() { return this.timestamp; }
}

// Originator - creates and restores from mementos
class GameCharacter {
  private health = 100;
  private position = { x: 0, y: 0 };
  private inventory: string[] = [];
  private level = 1;

  // Game actions
  takeDamage(amount: number) { this.health -= amount; }
  move(x: number, y: number) { this.position = { x, y }; }
  collectItem(item: string) { this.inventory.push(item); }
  levelUp() { this.level++; }

  // Memento operations
  save(): GameMemento {
    return new GameMemento(
      this.health,
      { ...this.position },
      [...this.inventory],
      this.level,
      new Date(),
    );
  }

  restore(memento: GameMemento) {
    const state = memento.getState();
    this.health = state.health;
    this.position = state.position;
    this.inventory = state.inventory;
    this.level = state.level;
  }
}

// Caretaker - manages memento history
class SaveManager {
  private saves: GameMemento[] = [];

  addSave(memento: GameMemento) {
    this.saves.push(memento);
  }

  getSave(index: number): GameMemento | undefined {
    return this.saves[index];
  }

  getLatestSave(): GameMemento | undefined {
    return this.saves[this.saves.length - 1];
  }
}

// Usage
const hero = new GameCharacter();
const saveManager = new SaveManager();

hero.collectItem('sword');
saveManager.addSave(hero.save()); // Checkpoint 1

hero.takeDamage(50);
hero.move(100, 200);
saveManager.addSave(hero.save()); // Checkpoint 2

// Restore to checkpoint 1
const checkpoint = saveManager.getSave(0);
if (checkpoint) hero.restore(checkpoint);`,
  diagram: {
    nodes: [
      {
        id: 'originator',
        type: 'class',
        label: 'Originator',
        position: { x: 80, y: 50 },
        size: { width: 160, height: 90 },
        properties: ['-state'],
        methods: ['+save(): Memento', '+restore(m)'],
      },
      {
        id: 'memento',
        type: 'class',
        label: 'Memento',
        position: { x: 320, y: 50 },
        size: { width: 160, height: 80 },
        properties: ['-state'],
        methods: ['+getState()'],
      },
      {
        id: 'caretaker',
        type: 'class',
        label: 'Caretaker',
        position: { x: 560, y: 50 },
        size: { width: 160, height: 80 },
        properties: ['-history: Memento[]'],
        methods: ['+addMemento()', '+getMemento()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'originator', target: 'memento', type: 'dependency', label: 'creates' },
      { id: 'e2', source: 'caretaker', target: 'memento', type: 'aggregation' },
    ],
    viewport: { width: 800, height: 200 },
  },
  relatedPatterns: ['command', 'iterator', 'prototype'],
  tags: ['behavioral', 'gang-of-four', 'state-management', 'undo-redo'],
}
