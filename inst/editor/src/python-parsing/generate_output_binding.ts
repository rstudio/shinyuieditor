import { collapseText, indent_text_block } from "util-functions/src/strings";

import type { OutputBindingScaffold } from "../ui-node-definitions/nodeInfoFactory";

export function generatePythonOutputBinding(
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
