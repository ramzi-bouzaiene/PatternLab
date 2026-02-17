# PatternLab - Interactive Design Pattern Playground

An interactive learning platform for frontend developers to master software design patterns through live code editing, animated diagrams, and practical examples.

## 🚀 Features

- **Interactive Code Editor**: Monaco Editor integration for live code editing
- **Animated Diagrams**: Framer Motion-powered SVG diagrams visualizing pattern structures
- **Pattern Library**: Comprehensive collection of creational, structural, and behavioral patterns
- **Side-by-Side Comparison**: Compare anti-patterns with best practices
- **Global State Management**: Zustand for efficient state management
- **Type-Safe**: Full TypeScript support

## 📁 Project Structure

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

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Monaco Editor** - Code Editor
- **Zustand** - State Management
- **Framer Motion** - Animations
- **React Router** - Routing
- **Vitest** - Testing

## 📦 Getting Started

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

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📖 Adding New Patterns

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

## 🎨 Customization

### Theme
Edit `/src/shared/theme/theme.ts` to customize colors, fonts, and spacing.

### Adding UI Components
Add new components to `/src/shared/ui/` following the existing patterns.

## 📄 License

MIT License
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
