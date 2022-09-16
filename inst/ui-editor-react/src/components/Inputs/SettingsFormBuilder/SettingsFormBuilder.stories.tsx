import React from "react";

import omit from "just-omit";
import { getTabPanelTitle } from "Shiny-Ui-Elements/ShinyTabsetPanel/getTabPanelTitle";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type { SettingsInfo } from "./ArgumentInfo";
import type { DynamicSettingsInfo } from "./NodeSettingsFormBuilder";
import { NodeSettingsFormBuilder } from "./NodeSettingsFormBuilder";
import { SettingsFormBuilder } from "./SettingsFormBuilder";
import type { SettingsUpdateAction } from "./SettingsInput/SettingsInput";

export default {
  title: "SettingsFormBuilder",
  component: SettingsFormBuilder,
};

const settingsInfo: SettingsInfo = {
  name: {
    defaultValue: "name default",
    label: "String argument",
    type: "string",
  },
  myNumberArg: {
    defaultValue: 42,
    label: "Optional number argument",
    optional: true,
    type: "number",
  },
  myCSSArg: {
    type: "cssMeasure",
    label: "I am a css measure",
    defaultValue: "1rem",
    optional: true,
  },
  myBooleanArg: {
    type: "boolean",
    label: "I am a boolean measure",
    defaultValue: true,
    optional: true,
  },
};

export const AutoBuild = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
    iAmUnknown: "unknown value",
    myBooleanArg: false,
  });

  const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue((old) => ({ ...old, [key]: action.value }));
    }

    if (action.type === "REMOVE") {
      setValue((old) => {
        return omit(old, [key]) as typeof old;
      });
    }
  };
  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <SettingsFormBuilder
      settings={value}
      settingsInfo={settingsInfo}
      onSettingsChange={handleSettingsChange}
    />
  );
};

// export const DynamicOptions = () => {
//   const settingsInfo: SettingsInfo = {
//     dynamicDropdown: {
//       defaultValue: "name default",
//       label: "Options dropdown",
//       type: "optionsDropdown",
//       options: {
//         choices: ["a", "b", "c"],
//       },
//     },
//     myBooleanArg: {
//       type: "boolean",
//       label: "I am a boolean measure",
//       defaultValue: true,
//       requiredOrOptional: "optional",
//     },
//   };
//   const updatedOptionsList = ["first", "second", "third"];

//   const [value, setValue] = React.useState({
//     dynamicDropdown: "b",
//     myBooleanArg: false,
//   });

//   const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
//     if (action.type === "UPDATE") {
//       setValue((old) => ({ ...old, [key]: action.value }));
//     }

//     if (action.type === "REMOVE") {
//       setValue((old) => {
//         return omit(old, [key]) as typeof old;
//       });
//     }
//   };
//   React.useEffect(() => {
//     console.log(value);
//   }, [value]);

//   const node = {
//     uiArguments: value,
//   };

//   return (
//     <SettingsFormBuilder
//       node={node}
//       settingsInfo={settingsInfo}
//       dynamicOptions={{ dynamicDropdown: { choices: updatedOptionsList } }}
//       onSettingsChange={handleSettingsChange}
//     />
//   );
// };

// export const RenderProps = () => {
//   const [value, setValue] = React.useState({
//     name: "test",
//     myNumberArg: 3,
//   });

//   const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
//     console.log(`Updating ${key}`, action);

//     if (action.type === "UPDATE") {
//       setValue((old) => ({ ...old, [key]: action.value }));
//     }

//     if (action.type === "REMOVE") {
//       setValue((old) => {
//         return omit(old, [key]) as typeof old;
//       });
//     }
//   };

//   const node = {
//     uiArguments: value,
//   };

//   return (
//     <SettingsFormBuilder
//       node={node}
//       settingsInfo={settingsInfo}
//       onSettingsChange={handleSettingsChange}
//       renderInputs={({ inputs, unknownArguments }) => {
//         return (
//           <>
//             <section>
//               <h2>Number inputs</h2>
//               {inputs.myNumberArg}
//             </section>
//             <section>
//               <h2>Text Inputs</h2>
//               {inputs.name}
//             </section>
//             {unknownArguments ? (
//               <section>
//                 <h3>Unknown arguments</h3>
//                 {unknownArguments}
//               </section>
//             ) : null}
//           </>
//         );
//       }}
//     />
//   );
// };

const tabsetArgumentInfo: DynamicSettingsInfo = {
  selected: {
    type: "optionsDropdown",
    optional: true,
    label: "Selected tab on load",
    defaultValue: (node) => {
      const firstChild = node.uiChildren?.[0];

      if (!firstChild) return "failed";

      return getTabPanelTitle(firstChild) ?? "failed";
    },

    choices: (node) => {
      const titles = node.uiChildren?.map(
        (child) => getTabPanelTitle(child) ?? "failed"
      );

      if (!titles) return ["failed to find child tab titles"];
      return titles;
    },
  },
  id: {
    type: "string",
    label: "Id for tabset",
    defaultValue: "tabset-default-id",
    optional: true,
  },
};

export const TabsetSettings = () => {
  const [value, setValue] = React.useState({
    name: "test",
    myNumberArg: 3,
  });

  const handleSettingsChange = (key: string, action: SettingsUpdateAction) => {
    console.log(`Updating ${key}`, action);

    if (action.type === "UPDATE") {
      setValue((old) => ({ ...old, [key]: action.value }));
    }

    if (action.type === "REMOVE") {
      setValue((old) => {
        return omit(old, [key]) as typeof old;
      });
    }
  };

  const node = {
    uiName: "shiny::tabsetPanel",
    uiArguments: value,
    uiChildren: [
      { uiName: "shiny::tabPanel", uiArguments: { title: "First Tab" } },
      { uiName: "shiny::tabPanel", uiArguments: { title: "Tab B" } },
    ],
  };

  return (
    <NodeSettingsFormBuilder
      node={node as ShinyUiNode}
      settingsInfo={tabsetArgumentInfo}
      onSettingsChange={handleSettingsChange}
    />
  );
};
