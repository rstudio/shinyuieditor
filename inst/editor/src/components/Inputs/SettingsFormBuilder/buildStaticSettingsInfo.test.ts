import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import { getFirstTabName, getTabNames } from "../../Tabs/Tabset/utils";

import type { DynamicArgumentInfo} from "./buildStaticSettingsInfo";
import { buildStaticFormInfo, getDefaultSettings } from "./buildStaticSettingsInfo";

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


describe("Can convert from dynamic info to static arguments for default settings", () => {

  const sampleArgInfo = {
    num: {
      inputType: "number",
      defaultValue: 42,
    },
    optionalString: {
      inputType: "string",
      defaultValue: "hello",
      optional: true,
    },
    mystery: {
      inputType: "omitted",
      optional: true,
      // defaultValue: new Date(),
    },
    bool: {
      inputType: "boolean",
      defaultValue: (node) => node ? false: true,
    },
  // } as const;
  // } satisfies ArgsToDynamicInfo<SampleArgs>;
  } satisfies DynamicArgumentInfo;

  test("Works with no node", () => {
    expect(getDefaultSettings(sampleArgInfo)).toStrictEqual({num: 42, optionalString: "hello", bool: true })
  })

})