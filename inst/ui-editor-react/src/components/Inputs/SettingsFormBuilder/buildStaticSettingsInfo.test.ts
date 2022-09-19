import { getFirstTabName, getTabNames } from "components/Tabs/Tabset/utils";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type {
  DynamicArgumentInfo,
  StaticArgumentInfo,
} from "./buildStaticSettingsInfo";
import { buildStaticSettingsInfo } from "./buildStaticSettingsInfo";

describe("Can convert dynamic settings info object into a static one", () => {
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
      buildStaticSettingsInfo(selectedTabArgument, navbarWithThreeTabs)
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
      buildStaticSettingsInfo(selectedTabArgument, navbarWithThreeTabs)
    ).toEqual(expectedOutput);
  });
});
