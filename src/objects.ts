export function pick<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(object, key)) result[key] = object[key];
  }
  return result;
}

export function omit<T extends object, K extends keyof T>(object: T, keys: readonly K[]): Omit<T, K> {
  const blocked = new Set<PropertyKey>(keys);
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !blocked.has(key)),
  ) as Omit<T, K>;
}

export function compact<T>(values: readonly (T | null | undefined | false)[]): T[] {
  return values.filter((value): value is T => value !== null && value !== undefined && value !== false);
}

export function groupBy<T, K extends PropertyKey>(values: readonly T[], getKey: (value: T) => K): Record<K, T[]> {
  return values.reduce((groups, value) => {
    const key = getKey(value);
    (groups[key] ??= []).push(value);
    return groups;
  }, {} as Record<K, T[]>);
}
