export function mergeClasses(
  ...classes: (string | string[] | false | null | undefined)[]
): string {
  return classes.filter((c) => c).join(" ");
}
