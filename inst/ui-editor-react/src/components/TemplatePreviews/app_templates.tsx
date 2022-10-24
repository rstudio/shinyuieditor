import {
  basicGridPage,
  minimalPage,
  basicNavbarPage,
  testingUiTree,
} from "state/backupUiTree";

import type { TemplateInfo } from "./TemplatePreviewCard";

export const app_templates: TemplateInfo[] = [
  {
    title: "Basic Grid App",
    uiTree: basicGridPage,
    description: "I am a basic grid app",
  },
  {
    title: "Basic Tabs App",
    uiTree: minimalPage,
    description: "I am a basic navbarPage app",
  },
  {
    title: "Navbar App",
    uiTree: basicNavbarPage,
    description: "I am a basic navbarPage app",
  },
  {
    title: "Minimal App",
    uiTree: testingUiTree,
    description: "Almost nothing here",
  },
];
