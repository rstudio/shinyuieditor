import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { getFirstTabName, getTabNames } from "../../Tabs/Tabset/utils";

import { buildStaticFormInfo } from "./buildStaticSettingsInfo";

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

describe("Can convert full dynamic settings info object into a static one", () => {
  test("All dynamic values", () => {
    expect(
      buildStaticFormInfo(
        {
          title: {
            inputType: "string",
            defaultValue: (node) =>
              `tabset with ${node?.uiChildren?.length ?? -1} tabs`,
          },
          selected: {
            inputType: "dropdown",
            optional: true,
            label: "Selected tab on load",
            defaultValue: (node) =>
              node ? getFirstTabName(node) : "First Tab",
            choices: (node) => (node ? getTabNames(node) : ["First Tab"]),
          },
        },
        navbarWithThreeTabs
      )
    ).toEqual({
      title: expect.objectContaining({
        defaultValue: `tabset with 3 tabs`,
      }),
      selected: expect.objectContaining({
        label: "Selected tab on load",
        optional: true,
        defaultValue: "first tab",
        choices: ["first tab", "second tab", "third tab"],
      }),
    });
  });
});
