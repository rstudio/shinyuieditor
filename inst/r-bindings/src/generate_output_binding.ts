import type { OutputBindingScaffold } from "ui-node-definitions/src/nodeInfoFactory";
import { collapseText, indent_text_block } from "util-functions/src/strings";

export function generate_r_output_binding(
  id: string,
  scaffold: OutputBindingScaffold | string
): string {
  const body =
    typeof scaffold === "string"
      ? scaffold
      : collapseText(
          `${scaffold.render_fn_name}({`,
          `${indent_text_block(scaffold.render_fn_body, 2, true)}`,
          `})`
        );

  return `output$${id} <- ${body}`;
}
