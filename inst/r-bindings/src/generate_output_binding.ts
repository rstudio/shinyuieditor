import type { OutputBindingScaffold } from "ui-node-definitions/src/nodeInfoFactory";
import { collapseText, indent_text_block } from "util-functions/src/strings";

export function generate_r_output_binding(
  id: string,
  { fn_name, fn_body }: OutputBindingScaffold
): string {
  const body = collapseText(
    `${fn_name}({`,
    `${indent_text_block(fn_body, 2, true)}`,
    `})`
  );

  return `output$${id} <- ${body}`;
}
