import type { NamedList } from "../../../ui-node-definitions/inputFieldTypes";

/**
 * Update the key of an object while making sure the position of the item in the
 * object is preserved
 * @param obj object keyed by a string
 * @param oldKey Previous key value
 * @param newKey Key value to update to
 * @returns A new object with the key updated to new value
 */
export function swapKeysForObject<ValueType>(
  obj: Record<string, ValueType>,
  oldKey: string,
  newKey: string
): Record<string, ValueType> {
  // Convert object to array of key-value pairs
  const entries = Object.entries(obj);

  // Find the index of the item with the old key
  const index = entries.findIndex(([key]) => key === oldKey);

  // Update the key of the item at the index
  entries[index][0] = newKey;

  // Repack the array of key-value pairs into an object
  return entries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {} as Record<string, ValueType>);
}

type ItemArray = {
  id: number;
  key: string;
  value: string;
}[];

/**
 * Convert a NamedList to an array of items for iterating over.
 * @param list NamedList to convert. Could be a key-value object or an array of strings
 * @returns An array of items with an id, key, and value
 */
export function namedListToItemTypeArray(list: NamedList): ItemArray {
  if (Array.isArray(list)) {
    return list.map((value, i) => ({ id: i, key: value, value }));
  }

  return Object.keys(list).map((key, i) => ({
    id: i,
    key,
    value: list[key],
  }));
}

/**
 * Find all the places where the key doesn't match the value for a given
 * key-value object.
 * @param x Key-value object to check
 * @returns An array of items with an id(index), key, and value where the key
 * doesn't match the value
 */
export function getKeyValueMismatches(
  x: Record<string, unknown>
): ItemArray | null {
  const mismatches = Object.entries(x)
    .filter(([key, value]) => typeof value === "string" && key !== value)
    .map(([key, value], i) => ({ key, value, id: i }));

  if (mismatches.length === 0) {
    return null;
  }

  // Forcing this type is okay because it already has been type checked because we said
  // key
  return mismatches as ItemArray;
}

/**
 * Check if a named list is in value-only mode. Aka is just an array of strings.
 * Function serves as a typescript predicate function.
 * @param value Named list to check
 * @returns Whether or not the named list is in value-only mode
 */
export function isValueOnlyMode(value: NamedList): value is string[] {
  return Array.isArray(value);
}
