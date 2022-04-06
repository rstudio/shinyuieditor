import type { GlobalProvider } from "@ladle/react";
import { ReduxProvider } from "react-redux";
import { store } from "../src/state/store";

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ReduxProvider store={store}>
    <h1>Theme: {globalState.theme}</h1>
    {children}
  </ReduxProvider>
);
