import type { BackendConnection } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { BackendConnectionProvider } from "./backendCommunication/useBackendMessageCallbacks";
import { GeneralErrorView } from "./components/ErrorCatcher/GeneralErrorView";
import { EditorContainer } from "./EditorContainer/EditorContainer";
import type { ShinyUiRootNode } from "./Shiny-Ui-Elements/uiNodeTypes";
import ReduxProvider from "./state/ReduxProvider";
import styles from "./SUE.module.css";
import {
  generate_gh_issue_url,
  generate_serialized_state_for_error,
} from "./utils/generate_issue_reports";
import { mergeClasses } from "./utils/mergeClasses";

export type SUE_Props = {
  backendDispatch?: BackendConnection;
  showMessages?: boolean;
  defaultTree?: ShinyUiRootNode;
};
export function SUE({
  showMessages = true,
  defaultTree,
  backendDispatch: { sendMsg, incomingMsgs, mode } = setupStaticBackend({
    messageDispatch: makeMessageDispatcher(),
    showMessages,
    defaultTree: defaultTree ?? "TEMPLATE_CHOOSER",
  }),
}: SUE_Props) {
  const dispatch: BackendConnection = showMessages
    ? {
        sendMsg,
        incomingMsgs: {
          subscribe: (on, callback) => {
            // eslint-disable-next-line no-console
            console.log(`backendMsgs.subscribe("${on}", ...)`);
            return incomingMsgs.subscribe(on, callback);
          },
        },
        mode,
      }
    : {
        sendMsg,
        incomingMsgs,
        mode,
      };

  return (
    <ReduxProvider>
      <ErrorBoundary fallbackRender={WholeAppErrorFallback}>
        <BackendConnectionProvider {...dispatch}>
          <EditorContainer />
        </BackendConnectionProvider>
      </ErrorBoundary>
    </ReduxProvider>
  );
}

const WholeAppErrorFallback = (fallbackProps: FallbackProps) => {
  return (
    <div className={styles.error_fallback_container}>
      <div className={mergeClasses("card", styles.error_fallback)}>
        <h2>Uh oh! you shouldn't be here...</h2>
        <GeneralErrorView
          header="ShinyUiEditor encountered an error"
          generateIssueLink={(state_at_error) =>
            generate_gh_issue_url({
              title: "Error in ShinyUiEditor at root",
              body: `Error at root of editor:\n${generate_serialized_state_for_error(
                state_at_error
              )}`,
            })
          }
          {...fallbackProps}
        />
      </div>
    </div>
  );
};
