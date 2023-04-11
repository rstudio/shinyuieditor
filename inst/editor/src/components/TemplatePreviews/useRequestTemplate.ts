import React from "react";

import type { TemplateSelection } from "communication-types";

import { template_to_app_contents } from "../../assets/app-templates/app_templates";
import { useBackendConnection } from "../../backendCommunication/useBackendMessageCallbacks";
import { useLanguageMode } from "../../state/languageMode";

export function useRequestTemplate() {
  const { sendMsg } = useBackendConnection();
  const language = useLanguageMode();

  const requestTemplate = React.useCallback(
    (template: TemplateSelection) => {
      sendMsg({
        path: "UPDATED-APP",
        payload: template_to_app_contents(template, language),
      });
    },
    [sendMsg, language]
  );

  return requestTemplate;
}
