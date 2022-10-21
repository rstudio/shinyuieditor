import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { app_templates } from "./app_templates";
import type { TemplateInfo } from "./TemplatePreviewCard";
import { TemplatePreviewCard } from "./TemplatePreviewCard";

export function TemplatePreviewGrid({
  setTemplate,
  templates = app_templates,
}: {
  templates?: TemplateInfo[];
  setTemplate: (tree: ShinyUiNode) => void;
}) {
  return (
    <div className="TemplatePreviewGrid">
      {templates.map((template) => (
        <TemplatePreviewCard
          key={template.title}
          info={template}
          onSelect={() => setTemplate(template.templateTree)}
        />
      ))}
    </div>
  );
}
