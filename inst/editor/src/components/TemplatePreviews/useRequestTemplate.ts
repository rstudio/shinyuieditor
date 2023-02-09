import React from "react";

import type { TemplateSelection } from "communication-types";

import { template_to_app_contents } from "../../assets/app-templates/app_templates";
import { useBackendConnection } from "../../backendCommunication/useBackendMessageCallbacks";

export function useRequestTemplate() {
  const { sendMsg } = useBackendConnection();

  const requestTemplate = React.useCallback(
    (template: TemplateSelection) => {
      sendMsg({
        path: "UPDATED-APP",
        payload: template_to_app_contents(template),
      });
    },
    [sendMsg]
  );

  return requestTemplate;
}
