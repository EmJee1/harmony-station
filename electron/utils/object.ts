/**
 * Creates a new object that omits the specified keys from the original object.
 * @example
 * const originalObject = { a: 1, b: 2, c: 3 };
 * const keysToOmit = ['a', 'c'];
 * const result = omit(originalObject, keysToOmit);
 * // Result: { b: 2 }
 */
export function omit<T extends object, U extends keyof T>(
  obj: T,
  keys: U[]
): Omit<T, U> {
  const result = structuredClone(obj)

  for (const key of keys) {
    delete result[key]
  }

  return result
}

/**
 * Creates a new object that picks the specified keys from the original object.
 * @example
 * const originalObject = { a: 1, b: 2, c: 3 };
 * const keysToPick = ['a', 'c'];
 * const result = pick(originalObject, keysToPick);
 * // Result: { a: 1, c: 3 }
 */
export function pick<T extends object, U extends keyof T>(
  obj: T,
  keys: U[]
): Pick<T, U> {
  const result = {} as Pick<T, U>

  for (const key of keys) {
    result[key] = obj[key]
  }

  return result
}
