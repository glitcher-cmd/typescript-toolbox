import { describe, expect, it, vi } from 'vitest';
import { compact, groupBy, mask, parseJson, pick, retry, slugify, truncate, withTimeout } from '../src/index.js';

describe('string utilities', () => {
  it('slugifies accented text', () => {
    expect(slugify('  Café Déjà Vu! ')).toBe('cafe-deja-vu');
  });

  it('truncates without exceeding the limit', () => {
    expect(truncate('abcdef', 4)).toBe('abc…');
  });

  it('masks the middle of a value', () => {
    expect(mask('1234567890', 2, 2, '*')).toBe('12******90');
  });
});

describe('object utilities', () => {
  it('picks keys', () => {
    expect(pick({ id: 1, name: 'Ada' }, ['name'])).toEqual({ name: 'Ada' });
  });

  it('compacts values', () => {
    expect(compact([1, null, 2, false, undefined])).toEqual([1, 2]);
  });

  it('groups values', () => {
    expect(groupBy(['ant', 'ape', 'bear'], (value) => value[0]!)).toEqual({ a: ['ant', 'ape'], b: ['bear'] });
  });
});

describe('validation and async utilities', () => {
  it('parses JSON without throwing', () => {
    expect(parseJson<{ ok: boolean }>('{"ok":true}')).toEqual({ ok: true, value: { ok: true } });
    expect(parseJson('{')).toMatchObject({ ok: false });
  });

  it('retries failed work', async () => {
    const operation = vi.fn()
      .mockRejectedValueOnce(new Error('temporary'))
      .mockResolvedValue('done');
    await expect(retry(operation, { attempts: 2, delayMs: 0 })).resolves.toBe('done');
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('times out slow work', async () => {
    await expect(withTimeout(new Promise(() => undefined), 1)).rejects.toThrow('Operation timed out');
  });
});
