import React from "react";

import { Switch } from "@headlessui/react";

import { mergeClasses } from "../../../utils/mergeClasses";

export function ToggleSwitch({
  enabled,
  setEnabled,
  label,
}: {
  label: string;
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={mergeClasses(
        enabled ? "bg-rstudio-blue" : "bg-gray-300",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer",
        "rounded-full border-2 border-transparent transition-colors",
        "duration-200 ease-in-out focus:outline-none focus:ring-2",
        "focus:ring-indigo-600 focus:ring-offset-2"
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        style={{
          transform: `translateY(1px) translateX(${
            enabled ? "1rem" : "-.25rem"
          })`,
        }}
        className={mergeClasses(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full",
          "bg-rstudio-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  );
}
