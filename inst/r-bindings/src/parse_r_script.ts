import type { TSParser } from "treesitter-parsers";

export function parse_r_script(parser: TSParser, script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}
