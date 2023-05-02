import type { Language_Mode } from "communication-types/src/AppInfo";
import type { SnippetInsertRequest } from "communication-types/src/MessageToBackend";
import { generate_python_output_binding } from "python-bindings";
import { generate_r_output_binding } from "r-bindings";
import type { OutputBindings } from "ui-node-definitions/src/nodeInfoFactory";

export function buildOutputScaffold({
  language,
  output_id,
  output_info,
}: {
  language: Language_Mode;
  output_id: string;
  output_info: OutputBindings;
}): SnippetInsertRequest {
  const { renderScaffold } = output_info;

  return {
    snippet:
      language === "PYTHON"
        ? generate_python_output_binding(output_id, renderScaffold)
        : generate_r_output_binding(output_id, renderScaffold),
    where_in_server: "end",
  };
}
