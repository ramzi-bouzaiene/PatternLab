# PatternLab - Interactive Design Pattern Playground

An interactive learning platform for frontend developers to master software design patterns through live code editing, animated diagrams, and practical examples.

## Features

- **Interactive Code Editor**: Monaco Editor integration for live code editing
- **Animated Diagrams**: Framer Motion-powered SVG diagrams visualizing pattern structures
- **Pattern Library**: Comprehensive collection of creational, structural, and behavioral patterns
- **Side-by-Side Comparison**: Compare anti-patterns with best practices
- **Global State Management**: Zustand for efficient state management
- **Type-Safe**: Full TypeScript support

## Project Structure

```
/src
  /app              # Main layout, sidebar, routing
    /components     # Layout components (Header, Sidebar, Layout)
    /pages          # Page components (HomePage, PatternPage)
    /router         # React Router configuration
    /store          # App-level Zustand store
  /core             # Pattern engine, types
    /engine         # Pattern registry and management
    /types          # TypeScript interfaces
  /features         # Feature modules
    /patterns       # Pattern definitions by ID
      /singleton
      /observer
      /factory
  /diagram          # Diagram engine
    /components     # DiagramCanvas, DiagramNode, DiagramEdge
    /store          # Diagram state management
    /types          # Diagram type definitions
  /playground       # Code editor setup
    /components     # CodeEditor, CodeComparison
    /store          # Playground state
  /shared           # Shared utilities
    /ui             # UI components (Button, Card, Badge)
    /theme          # Theme configuration
    /utils          # Helper functions
  /test             # Test setup
```

## Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Monaco Editor** - Code Editor
- **Zustand** - State Management
- **Framer Motion** - Animations
- **React Router** - Routing
- **Vitest** - Testing

## Deployment

### Vercel (Automatic)

This project is configured for automatic deployment on Vercel. When connected to your GitHub repository:

1. **Automatic Deployments**: Every push to the `main` branch triggers a new deployment
2. **Preview Deployments**: Pull requests automatically create preview deployments
3. **Custom Configuration**: The `vercel.json` file optimizes build settings and caching

**Vercel Configuration:**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite (auto-detected)
- **Node.js Version**: 18.x (recommended)

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Upload dist/ contents to any static hosting service
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Adding New Patterns

1. Create a new folder in `/src/features/patterns/[patternId]`
2. Define the pattern module implementing `PatternModule` interface:

```typescript
import type { PatternModule } from '@core/types'

export const myPattern: PatternModule = {
  id: 'my-pattern',
  name: 'My Pattern',
  category: 'creational', // or 'structural' | 'behavioral'
  difficulty: 'beginner', // or 'intermediate' | 'advanced'
  description: 'Description of the pattern',
  whenToUse: ['Use case 1', 'Use case 2'],
  whenNotToUse: ['Anti-use case 1'],
  badExample: '// Anti-pattern code',
  goodExample: '// Best practice code',
  diagram: {
    nodes: [...],
    edges: [...],
  },
}
```

3. Export from the pattern's index file and register in `/src/features/patterns/index.ts`

## Customization

### Theme
Edit `/src/shared/theme/theme.ts` to customize colors, fonts, and spacing.

### Adding UI Components
Add new components to `/src/shared/ui/` following the existing patterns.

## Contributing

All contributions are welcome to PatternLab! Whether you want to add new patterns, improve existing features, or fix bugs, your help is appreciated.

### Contributing Guidelines

#### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/PatternLab.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

#### Development Workflow
```bash
# Start development server
npm run dev

# Run tests while developing
npm test

# Check code quality
npm run lint
npm run format

# Build before submitting
npm run build
```

#### What We're Looking For

**New Design Patterns**
- Creational, Structural, or Behavioral patterns
- Real-world examples with both good and bad implementations
- Comprehensive documentation and use cases
- Interactive diagrams showing pattern structure

**Feature Improvements**
- Enhanced Monaco Editor functionality
- Better diagram animations and interactions
- UI/UX improvements
- Performance optimizations

**Bug Fixes**
- TypeScript type issues
- Component rendering problems
- Test failures
- Documentation errors

#### Adding a New Pattern

1. **Create Pattern Structure**
   ```bash
   mkdir src/features/patterns/your-pattern-name
   ```

2. **Implement Pattern Module**
   ```typescript
   // src/features/patterns/your-pattern-name/your-pattern.pattern.ts
   import type { PatternModule } from '@core/types'

   export const yourPattern: PatternModule = {
     id: 'your-pattern-name',
     name: 'Your Pattern Name',
     category: 'behavioral', // creational | structural | behavioral
     difficulty: 'intermediate', // beginner | intermediate | advanced
     description: 'Brief description of what this pattern does',
     whenToUse: [
       'When you need to...',
       'In scenarios where...',
     ],
     whenNotToUse: [
       'Avoid when...',
       'Not suitable for...',
     ],
     badExample: `// ❌ Anti-Pattern Example
   class BadExample {
     // Show what NOT to do
   }`,
     goodExample: `// ✅ Best Practice Example
   class GoodExample {
     // Show the proper implementation
   }`,
     diagram: {
       nodes: [
         {
           id: 'node1',
           type: 'class',
           label: 'ExampleClass',
           position: { x: 100, y: 100 },
           // ... more node properties
         }
       ],
       edges: [
         {
           id: 'edge1',
           type: 'inheritance',
           source: 'node1',
           target: 'node2',
         }
       ],
     },
     relatedPatterns: ['other-pattern-id'],
     tags: ['tag1', 'tag2'],
   }
   ```

3. **Export and Register**
   ```typescript
   // src/features/patterns/your-pattern-name/index.ts
   export { yourPattern } from './your-pattern.pattern'

   // Add to src/features/patterns/index.ts
   import { yourPattern } from './your-pattern-name'
   // Add to registry initialization
   ```

4. **Add Tests**
   ```typescript
   // src/features/patterns/your-pattern-name/your-pattern.test.ts
   import { describe, it, expect } from 'vitest'
   import { yourPattern } from './your-pattern.pattern'

   describe('Your Pattern', () => {
     it('should have required properties', () => {
       expect(yourPattern.id).toBe('your-pattern-name')
       expect(yourPattern.category).toBe('behavioral')
       // ... more tests
     })
   })
   ```

#### Testing Requirements

- All new patterns must include tests
- UI components should have component tests
- Maintain test coverage above 80%
- Run `npm test` before submitting

#### Code Style

We use ESLint and Prettier for consistent code formatting:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

**TypeScript Guidelines:**
- Use strict type checking
- Prefer interfaces over types for object shapes
- Use proper generic constraints
- Document complex type definitions

**Component Guidelines:**
- Use functional components with hooks
- Implement proper TypeScript props interfaces
- Follow accessibility best practices
- Use semantic HTML elements
