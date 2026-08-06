# TypeScript Toolbox

A small, dependency-free collection of reusable TypeScript utilities for modern Node.js and web applications.

## Included utilities

### Async

- `sleep(ms, signal?)`
- `retry(operation, options?)`
- `withTimeout(promise, timeoutMs, message?)`

### Strings

- `slugify(value)`
- `truncate(value, maxLength, suffix?)`
- `mask(value, visibleStart?, visibleEnd?, maskCharacter?)`

### Objects and collections

- `pick(object, keys)`
- `omit(object, keys)`
- `compact(values)`
- `groupBy(values, getKey)`

### Validation

- `parseJson(value)`
- `isNonEmptyString(value)`
- `requireEnv(name, env?)`
- `assertNever(value)`
- typed `Result<T, E>`

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Example

```ts
import { retry, slugify, withTimeout } from './src/index.js';

const path = slugify('Café Déjà Vu');

const response = await retry(
  () => withTimeout(fetch('https://example.com'), 5_000),
  { attempts: 3, delayMs: 250 },
);

console.log(path, response.status);
```

## Development

```bash
npm run typecheck
npm test
npm run build
```

The project is checked automatically on Node.js 20 and 22 through GitHub Actions.

## Design goals

- Strict TypeScript types
- No runtime dependencies
- Small, predictable functions
- Useful error handling
- Easy copying into application code when a full package would be excessive

## Licence

MIT
