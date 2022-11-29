export function collapseText(...textLines: (string | undefined)[]): string {
  const cleanLines = textLines.filter((l) => l !== undefined) as string[];

  return cleanLines.reduce((all, l, i) => (i === 0 ? "" : all + "\n") + l, "");
}
export function escapeDoubleQuotes(cmd: string): string {
  return cmd.replace(/"/g, `\\"`);
}
export function removeQuotes(x: string): string {
  return x.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}
