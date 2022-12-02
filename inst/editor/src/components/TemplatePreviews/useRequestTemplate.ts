import React from "react";

import type { TemplateSelection } from "communication-types";

import { useBackendConnection } from "../../backendCommunication/useBackendMessageCallbacks";

export function useRequestTemplate() {
  const { sendMsg } = useBackendConnection();

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
