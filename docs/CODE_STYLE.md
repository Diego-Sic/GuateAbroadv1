# Code Style Guidelines

This document outlines the code style and formatting standards for the GuateAbroad project.

## Tools

We use the following tools to maintain consistent code quality:

- **ESLint 9** - JavaScript/TypeScript linting (flat config)
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

> **Note**: Next.js 16 removed the `next lint` command. We use ESLint directly.

## Quick Start

### Automatic Formatting on Commit

Code is automatically formatted when you commit. The pre-commit hook runs:
1. ESLint with auto-fix for JS/TS files
2. Prettier for all supported files

### Manual Commands

```bash
# From root directory
npm run lint          # Run ESLint
npm run lint:fix      # Run ESLint with auto-fix
npm run format        # Format files with Prettier
npm run format:check  # Check formatting without changes

# From frontend directory
cd frontend
npm run lint
npm run lint:fix
npm run format -- src/
npm run format:check
```

## ESLint Rules

### TypeScript
- `@typescript-eslint/no-unused-vars`: Warn (prefix with `_` to ignore)
- `@typescript-eslint/no-explicit-any`: Warn

### React
- `react/react-in-jsx-scope`: Off (not needed with Next.js)
- `react/prop-types`: Off (using TypeScript)

### General
- `no-console`: Warn (except `warn` and `error`)
- `prefer-const`: Warn
- `no-var`: Error

## Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

## Code Style Best Practices

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_ITEMS`)
- **Types/Interfaces**: PascalCase (`UserProfile`, `ApiResponse`)

### File Organization

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components (shadcn/ui)
│   └── features/    # Feature-specific components
├── lib/             # Utilities and configurations
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

### Component Structure

```tsx
// 1. Imports (external, then internal)
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types
interface Props {
  title: string;
  onSubmit: () => void;
}

// 3. Component
export function MyComponent({ title, onSubmit }: Props) {
  // Hooks first
  const [value, setValue] = useState('');

  // Event handlers
  const handleClick = () => {
    onSubmit();
  };

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Submit</Button>
    </div>
  );
}
```

### TypeScript Guidelines

- Always define types for props
- Prefer interfaces for object shapes
- Use type aliases for unions and intersections
- Avoid `any` - use `unknown` when type is truly unknown
- Prefix unused variables with `_`

```tsx
// Good
interface UserProps {
  name: string;
  email: string;
}

// Good - unused parameter
const handler = (_event: Event, data: string) => {
  console.log(data);
};

// Avoid
const handler = (event: any) => { ... }
```

### Import Order

1. External packages
2. Internal aliases (`@/`)
3. Relative imports
4. Styles

```tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

import { formatDate } from './utils';
```

## Git Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add user registration form
fix(forum): resolve post deletion error
docs(readme): update setup instructions
```

## Editor Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense

Settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## Troubleshooting

### ESLint not working
```bash
cd frontend
npm run lint -- --debug
```

### Prettier conflicts with ESLint
The `eslint-config-prettier` package disables conflicting rules. If you see conflicts, ensure it's the last config in your extends array.

### Pre-commit hook not running
```bash
# Reinstall husky
npx husky install
```
