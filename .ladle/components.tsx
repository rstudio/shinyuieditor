import type { GlobalProvider } from "@ladle/react";

import ReduxProvider from "../src/state/ReduxProvider";

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ReduxProvider>{children}</ReduxProvider>
);
