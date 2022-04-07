import React from "react";

export type OnChangeCallback = (x: {
  name: string;
  value: string | number | undefined;
}) => void;

export const OnChangeContext = React.createContext<OnChangeCallback | null>(
  null
);

export function useOnChange(fallback?: OnChangeCallback): OnChangeCallback {
  const context = React.useContext(OnChangeContext);

  if (context) {
    return context;
  }

  if (fallback) {
    return fallback;
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
