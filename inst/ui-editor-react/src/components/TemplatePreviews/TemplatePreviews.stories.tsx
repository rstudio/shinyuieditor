import { basicGridPage, minimalPage } from "state/backupUiTree";
import ReduxProvider from "state/ReduxProvider";

import { AppTemplatePreview } from "./AppTemplatePreview";
import type { TemplateInfo } from "./TemplatePreviewCard";
import { TemplatePreviewCard } from "./TemplatePreviewCard";

export default {
  title: "AppTemplatePreview",
  component: AppTemplatePreview,
};
const templates: TemplateInfo[] = [
  {
    title: "Basic Grid App",
    templateTree: basicGridPage,
    description: "I am a basic grid app",
  },
  {
    title: "Basic Tabs App",
    templateTree: minimalPage,
    description: "I am a basic navbarPage app",
  },
];
export const SoloPreview = () => {
  return (
    <ReduxProvider>
      <AppTemplatePreview
        width_px={350}
        templateTree={templates[0].templateTree}
      />
    </ReduxProvider>
  );
};

export const CardView = () => {
  return (
    <ReduxProvider>
      <TemplatePreviewCard
        info={templates[0]}
        onSelect={() => console.log("Selected template")}
      />
    </ReduxProvider>
  );
};

export const CardGrid = () => {
  return (
    <ReduxProvider>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 300px)",
        }}
      >
        {templates.map((template) => (
          <TemplatePreviewCard
            key={template.title}
            info={template}
            onSelect={() => console.log("Selected", template)}
          />
        ))}
      </div>
    </ReduxProvider>
  );
};
