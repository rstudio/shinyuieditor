import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { getFirstTabName, getTabNames } from "../../Tabs/Tabset/utils";

import { buildStaticFormInfo } from "./buildStaticSettingsInfo";
import { buildStaticFieldInfo } from "./buildStaticSettingsInfo";
import type {
  DynamicFieldInfo,
  StaticFieldInfo,
  UiNodeSettingsInfo,
  FormInfo,
} from "./inputFieldTypes";

const navbarWithThreeTabs: ShinyUiNode = {
  uiName: "shiny::navbarPage",
  uiArguments: {
    title: "My Navbar Page",
    collapsible: false,
  },
  uiChildren: [
    {
      uiName: "shiny::tabPanel",
      uiArguments: { title: "first tab" },
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: { title: "second tab" },
    },
    {
      uiName: "shiny::tabPanel",
      uiArguments: { title: "third tab" },
    },
  ],
};
describe("Can convert dynamic argument info object into a static one", () => {
  test("All dynamic values", () => {
    const selectedTabArgument: DynamicFieldInfo = {
      inputType: "dropdown",
      label: "My List",
      defaultValue: (node) => (node ? getFirstTabName(node) : "First Tab"),
      choices: (node) => (node ? getTabNames(node) : ["First Tab"]),
    };

    const expectedOutput: StaticFieldInfo = {
      inputType: "dropdown",
      label: "My List",
      defaultValue: "first tab",
      choices: ["first tab", "second tab", "third tab"],
    };

    expect(
      buildStaticFieldInfo(selectedTabArgument, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });

  test("Mix of dynamic and static values", () => {
    const selectedTabArgument: DynamicFieldInfo = {
      inputType: "dropdown",
      label: "My List",
      defaultValue: "second tab",
      choices: (node) => (node ? getTabNames(node) : ["First Tab"]),
    };
    const expectedOutput: StaticFieldInfo = {
      inputType: "dropdown",
      label: "My List",
      defaultValue: "second tab",
      choices: ["first tab", "second tab", "third tab"],
    };
    expect(
      buildStaticFieldInfo(selectedTabArgument, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });
});

describe("Can convert full dynamic settings info object into a static one", () => {
  test("All dynamic values", () => {
    const navbarPageDynamicInfo: UiNodeSettingsInfo = {
      title: {
        inputType: "string",
        defaultValue: (node) =>
          `tabset with ${node?.uiChildren?.length ?? -1} tabs`,
      },
      selected: {
        inputType: "dropdown",
        label: "My List",
        defaultValue: (node) => (node ? getFirstTabName(node) : "First Tab"),
        choices: (node) => (node ? getTabNames(node) : ["First Tab"]),
      },
    };

    const expectedOutput: FormInfo = {
      title: {
        inputType: "string",
        defaultValue: `tabset with 3 tabs`,
      },
      selected: {
        inputType: "dropdown",
        label: "My List",
        defaultValue: "first tab",
        choices: ["first tab", "second tab", "third tab"],
      },
    };

    expect(
      buildStaticFormInfo(navbarPageDynamicInfo, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });
});
