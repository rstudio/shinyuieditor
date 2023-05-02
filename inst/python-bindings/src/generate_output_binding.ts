import type { OutputBindingScaffold } from "ui-node-definitions/src/nodeInfoFactory";
import { collapseText, indent_text_block } from "util-functions/src/strings";

export function generate_output_binding({
  id,
  render_fn_name,
  render_fn_body,
}: OutputBindingScaffold): string {
  return collapseText(
    `@output`,
    `${render_fn_name}`,
    `def ${id}():`,
    indent_text_block(render_fn_body, 4, true),
    `` // Add new line at end create space
  );
}
