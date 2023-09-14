/**
 * Converts a `Map` to an object (as long as it's keys are strings)
 * @param m The map to convert
 * @returns The object with the same key-value pairs as the map
 */
export function convertMapToObject<Key extends string, Value>(
  m: Map<Key, Value>
): Record<Key, Value> {
  const obj: Record<string, Value> = {};
  for (const [key, value] of m) {
    obj[key] = value;
  }
  return obj;
}
