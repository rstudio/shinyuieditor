import React from "react";

import type { TemplateSelection } from "communication-types";

import { template_to_full_info } from "../../assets/app-templates/app_templates";
import { generate_full_app_script } from "../../backendCommunication/full_app_info";
import { useBackendConnection } from "../../backendCommunication/useBackendMessageCallbacks";

export function useRequestTemplate() {
  const { sendMsg } = useBackendConnection();

  const requestTemplate = React.useCallback(
    (template: TemplateSelection) => {
      const app_info = template_to_full_info(template);
      sendMsg({
        path: "UPDATED-APP",
        payload: {
          app: generate_full_app_script(app_info),
          app_info,
        },
      });
    },
    [sendMsg]
  );

  return requestTemplate;
}
