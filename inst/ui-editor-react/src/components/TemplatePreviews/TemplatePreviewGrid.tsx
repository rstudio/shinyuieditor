import type { TemplateInfo } from "assets/app-templates/app_templates";
import { app_templates } from "assets/app-templates/app_templates";

import { TemplatePreviewCard } from "./TemplatePreviewCard";

const PREVIEW_WIDTH_PX = 294;

const inlineVariableStyles = {
  "--card-w": `${PREVIEW_WIDTH_PX}px`,
} as React.CSSProperties;

export function TemplatePreviewGrid({
  selectedTemplate,
  setSelectedTemplate,
  templates = app_templates,
}: {
  templates?: TemplateInfo[];
  selectedTemplate: string | null;
  setSelectedTemplate: (t: string) => void;
}) {
  if (templates.length === 0) {
    return (
      <div className="TemplatePreviewGrid empty-results">
        No app templates fit current filters. Try broadening your search.
      </div>
    );
  }
  return (
    <div className="TemplatePreviewGrid" style={inlineVariableStyles}>
      {templates.map((template) => (
        <TemplatePreviewCard
          key={template.title}
          info={template}
          selected={template.title === selectedTemplate}
          onSelect={() => {
            setSelectedTemplate(template.title);
          }}
          width_px={PREVIEW_WIDTH_PX}
        />
      ))}
    </div>
  );
}
