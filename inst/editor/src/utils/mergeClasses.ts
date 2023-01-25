export function mergeClasses(
  ...classes: (string | string[] | null | undefined)[]
): string {
  return classes.filter((c) => c).join(" ");
}
