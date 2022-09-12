/**
 * Make a string safe to use as a css id
 * @param x Potentially unsafe for id string
 * @returns String with numbers striped out spaces replaced with underscores
 */
export function makeIdSafe(x: string): string {
  return x.replace(/[0-9]/g, "").replace(/\s+$/, "").replace(/\s/g, "_");
}
