import { basicGridPage, minimalPage } from "state/backupUiTree";

import type { TemplateInfo } from "./TemplatePreviewCard";

export const app_templates: TemplateInfo[] = [
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
