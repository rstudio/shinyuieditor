import * as React from "react";

import { Provider } from "react-redux";

import { store } from "./store";

const ReduxProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
