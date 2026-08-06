export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function assertNever(value: never, message = 'Unexpected value'): never {
  throw new Error(`${message}: ${String(value)}`);
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function parseJson<T = unknown>(value: string): Result<T, SyntaxError> {
  try {
    return { ok: true, value: JSON.parse(value) as T };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof SyntaxError ? error : new SyntaxError('Invalid JSON'),
    };
  }
}

export function requireEnv(name: string, env: NodeJS.ProcessEnv = process.env): string {
  const value = env[name];
  if (!isNonEmptyString(value)) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
