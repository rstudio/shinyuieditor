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
    otherCode: {
      serverFunctionBody: `
      print("Hi from the server of basic grid app")
      `,
    },
  },
  {
    title: "Basic Tabs App",
    uiTree: minimalPage,
    description: "I am a basic navbarPage app",
    otherCode: {
      serverFunctionBody: `
      print("Hi from the server of Basic Tabs App")
      `,
    },
  },
  {
    title: "Navbar App",
    uiTree: basicNavbarPage,
    description: "I am a basic navbarPage app",
    otherCode: {
      serverFunctionBody: `
      print("Hi from the server of Navbar App")
      `,
    },
  },
  {
    title: "Minimal App",
    uiTree: testingUiTree,
    description: "Almost nothing here",
    otherCode: {
      serverFunctionBody: `
      print("Hi from the server of Minimal App")
      `,
    },
  },
];
