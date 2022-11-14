import React from "react";

import { useBackendCallbacks } from "backendCommunication/useBackendMessageCallbacks";

import type { TemplateSelection } from "./filterTemplates";

export function useRequestTemplate() {
  const { sendMsg } = useBackendCallbacks();

  const requestTemplate = React.useCallback(
    (template: TemplateSelection) => {
      // Sending a request for a template to backend
      sendMsg({
        path: "TEMPLATE-SELECTION",
        payload: template,
      });
    },
    [sendMsg]
  );

  return requestTemplate;
}
