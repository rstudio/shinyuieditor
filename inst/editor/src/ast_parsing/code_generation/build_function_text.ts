import type { R_AST, R_AST_Node } from "..";
import { get_ast_is_array_or_list } from "../flatten_arrays_and_lists";
import { indent_text_block } from "../indent_text_block";

const INDENT_SPACES = 2;
const INDENT = " ".repeat(INDENT_SPACES);
export const LINE_BREAK_LENGTH = 60;
/** Newline with indent */
export const NL_INDENT = `\n${INDENT}`;

export function build_function_text(call_node: R_AST): string {
  const [fn_name, ...args] = call_node;

  if (typeof fn_name.val !== "string") {
    return "Unknown Ui Code";
  }

  const fn_args_list = args.map(
    (node) => `${node.name ? `${node.name} = ` : ""}${print_node_val(node)}`
  );

  const is_multi_line_call = should_line_break({
    fn_name: fn_name.val,
    fn_args_list,
    max_line_length_for_multi_args: get_ast_is_array_or_list(call_node)
      ? LINE_BREAK_LENGTH
      : 0,
  });

  const arg_seperator = `,${is_multi_line_call ? NL_INDENT : " "}`;

  return `${fn_name.val}(${
    is_multi_line_call ? NL_INDENT : ""
  }${fn_args_list.join(arg_seperator)}${is_multi_line_call ? "\n" : ""})`;
}

/**
 * Decide if we spread the call out over multiple lines, or keep on a single
 * line. It's important to note that this logic doesn't account for indentation
 * amount. So it could theoretically give poorly formatted code in highly nested
 * examples.
 * @returns Boolean telling us if we need to use line breaks or not
 */
export function should_line_break({
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

function print_node_val({ val, type }: R_AST_Node): string {
  switch (type) {
    case "b": {
      return val ? "TRUE" : "FALSE";
    }
    case "c": {
      return `"${val}"`;
    }
    case "m": {
      return "";
    }
    case "n": {
      return String(val);
    }
    case "s": {
      return val;
    }
    case "e": {
      return indent_line_breaks(build_function_text(val));
    }
    case "u": {
      return "<...>";
    }
  }
}

export function indent_line_breaks(txt: string): string {
  return indent_text_block(txt, INDENT_SPACES);
}
