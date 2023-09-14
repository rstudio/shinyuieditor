import { indent_text_block } from "util-functions/src/strings";

const INDENT_SPACES = 2;
const INDENT = " ".repeat(INDENT_SPACES);
export const LINE_BREAK_LENGTH = 60;
/** Newline with indent */
export const NL_INDENT = `\n${INDENT}`;

/**
 * Decide if we spread the call out over multiple lines, or keep on a single
 * line. It's important to note that this logic doesn't account for indentation
 * amount. So it could theoretically give poorly formatted code in highly nested
 * examples.
 * @returns Boolean telling us if we need to use line breaks or not
 */
export function shouldLineBreak({
  fn_name,
  fn_args_list,
  max_line_length_for_multi_args,
}: {
  /** Name of the function. Used to calculate total length of call */
  fn_name: string;

  /** Array of the printed function argument calls. */
  fn_args_list: string[];

  /** How many characters should we allow a multi-arg function to be before we
   * split it up one arg to a line? Set to 0 to automatically make multi-arg
   * functions split to new lines */
  max_line_length_for_multi_args: number;
}): boolean {
  const args_have_line_breaks = fn_args_list.some((printed_arg) =>
    printed_arg.includes("\n")
  );
  if (args_have_line_breaks) return true;

  // If we're in a standard function call then we always do multi-lines for
  // multi-argument calls
  if (max_line_length_for_multi_args === 0) {
    return fn_args_list.length > 1;
  }

  // If we're printing an array or list, then try to fit on a single line,
  // unless there are enough args that we'd have an awkwardly long line
  const total_args_length = fn_args_list.reduce(
    //Add two to account for length of comma and space separating elements
    (total_chars, printed_el) => total_chars + printed_el.length + 2,
    0
  );

  const name_and_parens_length = fn_name.length + 2;

  return (
    total_args_length + name_and_parens_length > max_line_length_for_multi_args
  );
}

export function indentLineBreaks(txt: string): string {
  return indent_text_block(txt, INDENT_SPACES);
}
