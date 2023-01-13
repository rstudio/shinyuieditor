export function is_object(x: unknown): x is object {
  return typeof x === "object" && x !== null;
}
