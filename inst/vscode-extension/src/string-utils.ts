/* eslint-disable no-useless-escape */
export function collapseText(...textLines: (string | undefined)[]): string {
  const cleanLines = textLines.filter((l) => l !== undefined) as string[];

  return cleanLines.reduce((all, l, i) => (i === 0 ? "" : all + "\n") + l, "");
}

/**
 * Convert a string to one safe to pass between backend and frontend by escaping
 * quotes etc so they come out of serializing and deserializing looking the
 * same. Not really sure how to test this and there are probably edge cases I'm
 * missing
 * @param str String in raw format
 * @returns String safe to be placed inside double quotes and parsed as JSON
 * while coming out looking the same
 */
export function makePortableString(str: string): string {
  return str
    .replace(/(?<=\\)"/g, `\\\\\"`) // Replace all escaped quotes with triple escapes
    .replace(/\\n/g, "\\\\n") // Double escape newlines
    .replace(/(?<!\\)"/g, `\\"`); // Replace all bare double quotes with escaped versions
}

export function removeQuotes(x: string): string {
  return x.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}
