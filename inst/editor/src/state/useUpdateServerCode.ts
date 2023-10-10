import React from "react";

import { useDispatch } from "react-redux";

import { SET_APP_CODE_TEMPLATE, useCurrentAppInfo } from "./app_info";

/**
 * Hook that returns function that allows updating of the server code in the
 * app.
 * @returns A function that takes a callback that takes the old server code and
 * returns the new server code.
 */

export function useUpdateServerCode() {
  const dispatch = useDispatch();
  const appState = useCurrentAppInfo();

  const appTemplate = appState.mode === "MAIN" ? appState.app.code : null;

  const scriptUpdater = React.useCallback(
    (updateScript: (oldScript: string) => string) => {
      if (appTemplate === null) {
        throw new Error("Tried to update server code when no app template");
      }

      dispatch(SET_APP_CODE_TEMPLATE(updateScript(appTemplate)));
    },
    [appTemplate, dispatch]
  );

  return scriptUpdater;
}
