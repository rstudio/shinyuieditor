import React from "react";

export type OnChangeCallback = (x: {
  name: string;
  value: string | number | undefined;
}) => void;

export const OnChangeContext = React.createContext<OnChangeCallback | null>(
  null
);

/**
 * Get an onChange callback to use. If a callback is directly provided as an
 * input, that one will be used, so the onChange can allways be explicitely
 * provided by a function. If the onChange is not provided, then the calling
 * components context is searched for an OnChangContext value which is used, if
 * available. Otherwise an error is given.
 * @param provided An onChange callback that, if provided will simply returned
 * @returns
 */
export function useOnChange(provided?: OnChangeCallback): OnChangeCallback {
  const context = React.useContext(OnChangeContext);

  // Prefer to use a provided callback if it exists, otherwise check for the
  // context and use that. Otherwise error
  if (provided) {
    return provided;
  }

  if (context) {
    return context;
  }

  throw new Error("No onChange context or fallback provided.");
}

export const SettingsUpdateContext: React.FC<{
  onChange: OnChangeCallback;
}> = ({ onChange, children }) => {
  return (
    <OnChangeContext.Provider value={onChange}>
      {children}
    </OnChangeContext.Provider>
  );
};
