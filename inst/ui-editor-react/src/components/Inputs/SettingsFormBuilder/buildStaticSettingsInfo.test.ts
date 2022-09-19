import { getFirstTabName, getTabNames } from "components/Tabs/Tabset/utils";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type {
  DynamicArgumentInfo,
  DynamicSettingsInfo,
  StaticArgumentInfo,
  StaticSettingsInfo,
} from "./buildStaticSettingsInfo";
import { buildStaticSettingsInfo } from "./buildStaticSettingsInfo";
import { buildStaticArgumentInfo } from "./buildStaticSettingsInfo";

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
    const selectedTabArgument: DynamicArgumentInfo = {
      inputType: "optionsDropdown",
      label: "My List",
      defaultValue: getFirstTabName,
      choices: getTabNames,
    };

    const expectedOutput: StaticArgumentInfo = {
      inputType: "optionsDropdown",
      label: "My List",
      defaultValue: "first tab",
      choices: ["first tab", "second tab", "third tab"],
    };

    expect(
      buildStaticArgumentInfo(selectedTabArgument, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });

  test("Mix of dynamic and static values", () => {
    const selectedTabArgument: DynamicArgumentInfo = {
      inputType: "optionsDropdown",
      label: "My List",
      defaultValue: "second tab",
      choices: getTabNames,
    };
    const expectedOutput: StaticArgumentInfo = {
      inputType: "optionsDropdown",
      label: "My List",
      defaultValue: "second tab",
      choices: ["first tab", "second tab", "third tab"],
    };
    expect(
      buildStaticArgumentInfo(selectedTabArgument, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });
});

describe("Can convert full dynamic settings info object into a static one", () => {
  test("All dynamic values", () => {
    const navbarPageDynamicInfo: DynamicSettingsInfo = {
      title: {
        inputType: "string",
        defaultValue: (node) =>
          `tabset with ${node.uiChildren?.length ?? -1} tabs`,
      },
      selected: {
        inputType: "optionsDropdown",
        label: "My List",
        defaultValue: getFirstTabName,
        choices: getTabNames,
      },
    };

    const expectedOutput: StaticSettingsInfo = {
      title: {
        inputType: "string",
        defaultValue: `tabset with 3 tabs`,
      },
      selected: {
        inputType: "optionsDropdown",
        label: "My List",
        defaultValue: "first tab",
        choices: ["first tab", "second tab", "third tab"],
      },
    };

    expect(
      buildStaticSettingsInfo(navbarPageDynamicInfo, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });
});
