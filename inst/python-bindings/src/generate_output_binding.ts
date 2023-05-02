import type { OutputBindingScaffold } from "ui-node-definitions/src/nodeInfoFactory";
import { collapseText, indent_text_block } from "util-functions/src/strings";

export function generate_python_output_binding(
  id: string,
  { fn_name, fn_body }: OutputBindingScaffold
): string {
  return collapseText(
    `@output`,
    `${fn_name}`,
    `def ${id}():`,
    indent_text_block(fn_body, 4, true)
  );
}
