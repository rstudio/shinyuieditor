import ReduxProvider from "state/ReduxProvider";

import { app_templates } from "./app_templates";
import { AppTemplatePreview } from "./AppTemplatePreview";
import { TemplateChooserView } from "./TemplateChooserView";
import { TemplatePreviewCard } from "./TemplatePreviewCard";
import { TemplatePreviewGrid } from "./TemplatePreviewGrid";

export default {
  title: "AppTemplatePreview",
  component: AppTemplatePreview,
};
export const SoloPreview = () => {
  return (
    <ReduxProvider>
      <AppTemplatePreview
        width_px={350}
        templateTree={app_templates[0].templateTree}
      />
    </ReduxProvider>
  );
};

export const CardView = () => {
  return (
    <ReduxProvider>
      <TemplatePreviewCard
        info={app_templates[0]}
        selected={false}
        onSelect={() => console.log("Selected template")}
        width_px={300}
      />
    </ReduxProvider>
  );
};

export const CardGrid = () => {
  return (
    <ReduxProvider>
      <TemplatePreviewGrid
        selectedTemplate={null}
        setSelectedTemplate={(title) => console.log("Chose template", title)}
      />
    </ReduxProvider>
  );
};
export const FullView = () => {
  return (
    <ReduxProvider>
      <TemplateChooserView
        onChoose={(template) => console.log("Chose template", template)}
      />
    </ReduxProvider>
  );
};
