import type { Array_Or_List_AST } from "./flatten_list";
import { get_ast_is_array_or_list } from "./flatten_list";
import type { R_AST, R_AST_Node } from "./r_ast";

const INDENT_SPACES = 2;
const INDENT = " ".repeat(INDENT_SPACES);
/** Newline with indent */
const NL_INDENT = `\n${INDENT}`;

export function build_function_text(call_node: R_AST): string {
  // If the function called is an array or list, use the custom printer for that
  if (get_ast_is_array_or_list(call_node)) {
    return print_array_or_list(call_node);
  }

  const [fn_name, ...args] = call_node;

  if (typeof fn_name.val !== "string") {
    return "Unknown Ui Code";
  }

  const is_multi_arg = args.length > 1;
  const fn_args_list = args.map(print_fn_argument);
  const fn_args_collapsed = fn_args_list.join(
    `,${is_multi_arg ? NL_INDENT : " "}`
  );

  // We want to put the args on a new line from the function name if there are
  // multiple arguments or one of the arguments is a nested function call
  // itself.
  const is_multi_line_call = is_multi_arg || fn_args_collapsed.includes("\n");

  return `${fn_name.val}(${
    is_multi_line_call ? NL_INDENT : ""
  }${fn_args_collapsed}${is_multi_line_call ? "\n" : ""})`;
}

function print_fn_argument(node: R_AST_Node): string {
  const arg_name = node.name ? `${node.name} = ` : "";

  return `${arg_name}${print_node_val(node)}`;
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

function indent_line_breaks(txt: string): string {
  return txt.replaceAll(/\n/g, `${NL_INDENT}`);
}

export function print_array_or_list([call, ...elements]: Array_Or_List_AST) {
  const elements_printed = elements.map(print_fn_argument);

  // Add two to account for length of comma and space separating elements
  const total_element_length = elements_printed.reduce(
    (total_chars, printed_el) => total_chars + printed_el.length + 2,
    0
  );

  if (total_element_length > 60) {
    return `c(${NL_INDENT}${elements_printed.join(`,${NL_INDENT}`)}\n)`;
  }

  return `${call.val}(${elements_printed.join(", ")})`;
}
