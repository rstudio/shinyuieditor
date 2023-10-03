import React from "react";

import type { InputComponentByType } from "../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../ui-node-definitions/inputFieldTypes";

/**
 * A list of values that are already in use and a warning message to display
 * when the user tries to use one of them.
 *
 */
export type OffLimitsValues = {
  existingValues: Set<string>;
  warningMsg: (value: string) => string;
};

/**
 * A context object to hold a list of values that are off limits for the input.
 */
export const existingValuesContext = React.createContext<OffLimitsValues>({
  existingValues: new Set(),
  warningMsg: (value: string) => `The value ${value} is already taken`,
});

export function ExistingValuesProvider({
  children,
  offLimitValues,
}: {
  children: React.ReactNode;
  offLimitValues: OffLimitsValues;
}) {
  return (
    <existingValuesContext.Provider value={offLimitValues}>
      {children}
    </existingValuesContext.Provider>
  );
}

export function StringInput({
  id,
  label,
  value,
  onChange,
  longform,
}: InputComponentByType<"string">) {
  const offLimitsInfo = React.useContext(existingValuesContext);
  const isInvalid = offLimitsInfo?.existingValues.has(value);

  const common_props = {
    className: "SUE-Input",
    "aria-label": label,
    "aria-labelledby": makeLabelId(id),
    "aria-invalid": isInvalid,
    id,
    value,
    onChange: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const newValue = e.target.value;

      onChange(newValue);
    },
  };

  return (
    <>
      {longform ? (
        <textarea {...common_props} className="h-24 w-100 flex-grow" />
      ) : (
        <input {...common_props} type="text" />
      )}
      {isInvalid && (
        <div className="text-danger">
          <small>{offLimitsInfo.warningMsg(value)}</small>
        </div>
      )}
    </>
  );
}
