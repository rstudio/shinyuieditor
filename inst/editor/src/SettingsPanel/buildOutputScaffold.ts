import type { LanguageMode } from "communication-types/src/AppInfo";
import type { SnippetInsertRequest } from "communication-types/src/MessageToBackend";

import { generate_python_output_binding } from "../python-parsing";
import { generate_r_output_binding } from "../r-parsing";
import type { OutputBindings } from "../ui-node-definitions/nodeInfoFactory";

type SnippetInsertionLocation = SnippetInsertRequest["insert_at"];
export function buildOutputScaffold({
  language,
  output_id,
  output_info: { renderScaffold },
  insert_at,
}: {
  language: LanguageMode;
  output_id: string;
  output_info: OutputBindings;
  insert_at: SnippetInsertionLocation;
}): SnippetInsertRequest {
  return {
    snippet:
      language === "PYTHON"
        ? generate_python_output_binding(output_id, renderScaffold)
        : generate_r_output_binding(output_id, renderScaffold),
    insert_at,
  };
}
