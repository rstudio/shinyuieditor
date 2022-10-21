import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { app_templates } from "./app_templates";
import { TemplatePreviewCard } from "./TemplatePreviewCard";

export function TemplatePreviewGrid({
  setTemplate,
}: {
  setTemplate: (tree: ShinyUiNode) => void;
}) {
  return (
    <div className="TemplatePreviewGrid">
      {app_templates.map((template) => (
        <TemplatePreviewCard
          key={template.title}
          info={template}
          onSelect={() => setTemplate(template.templateTree)}
        />
      ))}
    </div>
  );
}
