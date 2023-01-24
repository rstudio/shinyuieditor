export function indent_text_block(txt: string, spaces_to_indent: number) {
  const INDENT = " ".repeat(spaces_to_indent);
  return txt.replaceAll(/\n/g, `\n${INDENT}`);
}
