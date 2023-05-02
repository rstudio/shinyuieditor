import type { OutputBindingScaffold } from "ui-node-definitions/src/nodeInfoFactory";
import { collapseText, indent_text_block } from "util-functions/src/strings";

export function generate_python_output_binding(
  id: string,
  scaffold: OutputBindingScaffold | string
): string {
  if (typeof scaffold !== "string") {
    return generate_output_binding_from_scaffold(id, scaffold);
  }

  throw new Error(
    `generate_output_binding: Unsupported combo of scaffold and language`
  );
}

function generate_output_binding_from_scaffold(
  id: string,
  { render_fn_name, render_fn_body }: OutputBindingScaffold
): string {
  return collapseText(
    `@output`,
    `${render_fn_name}`,
    `def ${id}():`,
    indent_text_block(render_fn_body, 4, true)
  );
}
