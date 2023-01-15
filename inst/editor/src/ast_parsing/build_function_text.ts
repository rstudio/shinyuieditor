import type { Array_Or_List_AST } from "./flatten_list";
import type { R_AST, R_AST_Node } from "./r_ast";

export function build_function_text(fn_call_node: R_AST): string {
  const [fn_name, ...args] = fn_call_node;

  if (typeof fn_name.val !== "string") {
    return "Unknown Ui Code";
  }

  const num_args = args.length;
  const is_multi_arg = num_args > 1;

  const fn_call: string = `${fn_name.val}(${is_multi_arg ? "\n  " : ""}`;

  const fn_args: string = args
    .map((node, i) => {
      const is_last_arg = i === num_args - 1;
      const arg_separator = is_multi_arg
        ? is_last_arg
          ? "\n)"
          : ",\n  "
        : ")";

      return `${print_fn_argument(node)}${arg_separator}`;
    })
    .join("");

  return fn_call + fn_args;
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
      // TODO: Check if this is an array or list and print out if it is
      return "<...>";
    }
    case "u": {
      return "<...>";
    }
  }
}

export function print_array_or_list([call, ...elements]: Array_Or_List_AST) {
  const elements_printed = elements.map(print_fn_argument);

  // Add two to account for length of comma and space separating elements
  const total_element_length = elements_printed.reduce(
    (total_chars, printed_el) => total_chars + printed_el.length + 2,
    0
  );

  if (total_element_length > 60) {
    return `c(\n  ${elements_printed.join(",\n  ")}\n)`;
  }

  return `${call.val}(${elements_printed.join(", ")})`;
}

// const test = print_array_or_list([
//   { val: "c", type: "s" },
//   { val: "a suuuuper long", type: "c" },
//   { val: "character vec with many arguments", type: "c" },
//   { val: "splits to different lines", type: "c" },
// ]);
