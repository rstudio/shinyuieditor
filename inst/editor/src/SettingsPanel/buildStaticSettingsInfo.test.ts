import type { Equal, Expect } from "util-functions/src/TypescriptUtils";

import {
  getFirstTabName,
  getTabNames,
} from "../ui-node-definitions/Bslib/page_navbar";
import type { ShinyUiParentNode } from "../ui-node-definitions/ShinyUiNode";

import type { DynamicArgumentInfo } from "./buildStaticSettingsInfo";
import {
  buildStaticFormInfo,
  getDefaultSettings,
} from "./buildStaticSettingsInfo";

const navbarWithThreeTabs: ShinyUiParentNode = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  children: [
    {
      id: "nav_panel",
      namedArgs: { title: "first tab" },
    },
    {
      id: "nav_panel",
      namedArgs: { title: "second tab" },
    },
    {
      id: "nav_panel",
      namedArgs: { title: "third tab" },
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
              `tabset with ${
                (node as ShinyUiParentNode)?.children?.length ?? -1
              } tabs`,
          },
          selected: {
            inputType: "dropdown",
            optional: true,
            label: "Selected tab on load",
            defaultValue: (node) =>
              node ? getFirstTabName(node as ShinyUiParentNode) : "First Tab",
            choices: (node) =>
              node ? getTabNames(node as ShinyUiParentNode) : ["First Tab"],
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
      useDefaultIfOptional: true,
    },
    mystery: {
      inputType: "omitted",
      optional: true,
      // defaultValue: new Date(),
    },
    internalArg: {
      inputType: "omitted",
      optional: true,
      defaultValue: "foo" as string,
      useDefaultIfOptional: true,
    },
    bool: {
      inputType: "boolean",
      defaultValue: (node) => (node ? false : true),
    },
  } satisfies DynamicArgumentInfo;

  const generated_args = getDefaultSettings(sampleArgInfo);
  type GeneratedArgs = typeof generated_args;

  test("Static required values are filled as expected", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test = Expect<Equal<GeneratedArgs["num"], number>>;
    expect(generated_args.num).toStrictEqual(42);
  });

  test("Dynamic required values are filled", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test = Expect<Equal<GeneratedArgs["bool"], boolean>>;
    expect(generated_args.bool).toStrictEqual(true);
  });

  test("Optional args don't get generated by default", () => {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test = GeneratedArgs["mystery"];
    expect("mystery" in generated_args).toBe(false);
  });

  test("Optional args can be forced to be generated", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type Test = Expect<Equal<GeneratedArgs["optionalString"], string>>;
    expect(generated_args.optionalString).toEqual("hello");
  });
});
