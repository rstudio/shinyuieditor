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
        setTemplate={(tree) => console.log("Chose template", tree)}
      />
    </ReduxProvider>
  );
};
export const FullView = () => {
  return (
    <ReduxProvider>
      <TemplateChooserView
        setTemplate={(tree) => console.log("Chose template", tree)}
      />
    </ReduxProvider>
  );
};
