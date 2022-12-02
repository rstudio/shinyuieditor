import React from "react";

import type { MessageToClientByPath } from "communication-types";

import { useBackendConnection } from "../../backendCommunication/useBackendMessageCallbacks";

export type AppLogs = string[];

export type AppPreviewStatus =
  | MessageToClientByPath["APP-PREVIEW-STATUS"]
  | "HIDDEN";

type CommunicationState = {
  appLogs: AppLogs;
  clearLogs: () => void;
  restartApp: () => void;
  stopApp: () => void;
  appLoc: AppPreviewStatus;
  errors: string | null;
};

export function useCommunicateWithBackend(): CommunicationState {
  const { sendMsg, incomingMsgs } = useBackendConnection();
  const [appLoc, setAppLoc] = React.useState<AppPreviewStatus>("HIDDEN");
  const [appLogs, setAppLogs] = React.useState<AppLogs>([]);
  const [errors, setErrors] = React.useState<string | null>(null);

  React.useEffect(() => {
    const previewReadySubscription = incomingMsgs.subscribe(
      "APP-PREVIEW-STATUS",
      (previewLoc) => {
        setErrors(null);
        setAppLoc(previewLoc);
      }
    );
    const previewLogsSubscription = incomingMsgs.subscribe(
      "APP-PREVIEW-LOGS",
      (logs) => {
        setAppLogs(ensureArray(logs));
      }
    );
    const previewCrashSubscription = incomingMsgs.subscribe(
      "APP-PREVIEW-CRASH",
      (crash_msg) => {
        setErrors(crash_msg);
      }
    );

    sendMsg({ path: "APP-PREVIEW-REQUEST" });
    setRestartApp(() => () => sendMsg({ path: "APP-PREVIEW-RESTART" }));
    setStopApp(() => () => sendMsg({ path: "APP-PREVIEW-STOP" }));

    return () => {
      previewReadySubscription.unsubscribe();
      previewLogsSubscription.unsubscribe();
      previewCrashSubscription.unsubscribe();
    };
  }, [incomingMsgs, sendMsg]);

  const [restartApp, setRestartApp] = React.useState<() => void>(
    // eslint-disable-next-line no-console
    () => () => console.warn("No app running to reset")
  );
  const [stopApp, setStopApp] = React.useState<() => void>(
    // eslint-disable-next-line no-console
    () => () => console.warn("No app running to stop")
  );

  const clearLogs = React.useCallback(() => {
    setAppLogs([]);
  }, []);

  return {
    appLogs,
    clearLogs,
    restartApp,
    stopApp,
    appLoc,
    errors,
  };
}

function ensureArray<T>(x: T | T[]): T[] {
  if (Array.isArray(x)) return x;

  return [x];
}
