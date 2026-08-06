export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(value: string, maxLength: number, suffix = '…'): string {
  if (!Number.isInteger(maxLength) || maxLength < 0) throw new RangeError('maxLength must be a non-negative integer');
  if (value.length <= maxLength) return value;
  if (suffix.length >= maxLength) return suffix.slice(0, maxLength);
  return value.slice(0, maxLength - suffix.length) + suffix;
}

export function mask(value: string, visibleStart = 2, visibleEnd = 2, maskCharacter = '•'): string {
  if (visibleStart < 0 || visibleEnd < 0) throw new RangeError('visible character counts cannot be negative');
  if (value.length <= visibleStart + visibleEnd) return value;
  return value.slice(0, visibleStart) + maskCharacter.repeat(value.length - visibleStart - visibleEnd) + value.slice(value.length - visibleEnd);
}
