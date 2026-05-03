# Development Guide

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/alasrjadeed/vscode-extensions.git
   cd vscode-extensions
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the extension
   ```bash
   npm run compile
   ```

## Running the Extension

### Debug Mode
1. Open the project in VS Code
2. Press F5 to start debugging
3. This opens a new VS Code window with the extension loaded

### Watch Mode
```bash
npm run watch
```

## Testing

Run tests with:
```bash
npm test
```

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── extension.ts           # Main extension entry point
├── services/              # Core services (AI, linting, etc.)
├── commands/              # Command implementations
├── skills/                # AI skills (problem solving, upgrading, etc.)
└── utils/                 # Utilities and helpers

snippets/                  # Code snippet templates
```

## Adding New Features

### Adding a New Command
1. Create command function in `src/commands/`
2. Register in `extension.ts` `registerCommands()`
3. Add to `package.json` `contributes.commands`

### Adding New Snippets
1. Add to appropriate file in `snippets/`
2. Update `package.json` snippets configuration
3. Test with Quick Snippet insertion

### Adding New Skill
1. Create class in `src/skills/`
2. Import and initialize in `extension.ts`
3. Create commands to expose the skill

## Code Standards

- Use TypeScript strict mode
- Follow ESLint rules
- Add JSDoc comments for public APIs
- Handle errors gracefully with try-catch
- Use logger for debugging

## Debugging

Use the logger utility for debugging:
```typescript
import { logger } from './utils/logger';
logger.info('Message', data);
logger.error('Error message', error);
```
