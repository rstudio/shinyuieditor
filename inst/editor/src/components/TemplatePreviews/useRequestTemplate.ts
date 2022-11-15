import React from "react";

import type { TemplateSelection } from "communication-types";

import { useBackendCallbacks } from "../../backendCommunication/useBackendMessageCallbacks";

export function useRequestTemplate() {
  const { sendMsg } = useBackendCallbacks();

  const requestTemplate = React.useCallback(
    (template: TemplateSelection) => {
      // Sending a request for a template to backend
      sendMsg({
        path: "TEMPLATE-SELECTION",
        payload: template as TemplateSelection,
      });
    },
    [sendMsg]
  );

  return requestTemplate;
}
