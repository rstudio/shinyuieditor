import React from "react";

import type { SettingsInfo } from "../constructInputComponents";

import type { SettingsOnChangeCallback } from "./SettingsInput";
import { SettingsInput } from "./SettingsInput";

export default {
  title: "SettingsInput",
  component: SettingsInput,
};

const settingsInfo: SettingsInfo = {
  name: { defaultValue: "name default", label: "This is my name" },
  myNumberArg: {
    defaultValue: 42,
    label: "This is a value",
    requiredOrOptional: "optional",
  },
};

export const RequiredStringInput = () => {
  const [value, setValue] = React.useState("test");

  return (
    <SettingsInput
      name="name"
      value={value}
      info={settingsInfo["name"]}
      onChange={setValue as SettingsOnChangeCallback}
    />
  );
};

export const OptionalNumberInput = () => {
  const [value, setValue] = React.useState(10);

  return (
    <SettingsInput
      name="myNumberArg"
      value={value}
      info={settingsInfo["myNumberArg"]}
      onChange={setValue as SettingsOnChangeCallback}
    />
  );
};

// export const RenderProps = () => {
//   const [value, setValue] = React.useState({
//     name: "test",
//     myNumberArg: 3,
//   });

//   return (
//     <SettingsFormBuilder
//       settings={value}
//       settingsInfo={settingsInfo}
//       onSettingsChange={(key, value) => {
//         console.log(key);
//         setValue((old) => ({ ...old, [key]: value }));
//       }}
//       renderInputs={(Inputs) => {
//         return (
//           <>
//             <section>
//               <h2>Number inputs</h2>
//               {Inputs.myNumberArg}
//             </section>
//             <section>
//               <h2>Text Inputs</h2>
//               {Inputs.name}
//             </section>
//           </>
//         );
//       }}
//     />
//   );
// };
