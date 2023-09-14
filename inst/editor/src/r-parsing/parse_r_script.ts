import type { TSParser } from "treesitter-parsers";

export function parseRScript(parser: TSParser, script_text: string) {
  // Parse the current script
  return parser.parse(script_text);
}
