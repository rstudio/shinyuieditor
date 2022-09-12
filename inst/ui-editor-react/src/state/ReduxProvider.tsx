import * as React from "react";

import { Provider } from "react-redux";

import { store } from "./store";

function ReduxProvider({ children }: { children: React.ReactElement }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
