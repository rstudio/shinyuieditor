import type { GlobalProvider } from "@ladle/react";

import ReduxProvider from "../src/state/ReduxProvider";

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ReduxProvider>
    <h1>Theme: {globalState.theme}</h1>
    {children}
  </ReduxProvider>
);
