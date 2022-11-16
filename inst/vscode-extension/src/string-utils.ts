export function collapseText(...textLines: string[]): string {
  return textLines.reduce((all, l, i) => (i === 0 ? "" : all + "\n") + l, "");
}
export function escapeDoubleQuotes(cmd: string): string {
  return cmd.replace(/"/g, `\\"`);
}
