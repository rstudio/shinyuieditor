import type { BackendConnection } from "communication-types";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "./App.css";

import { BackendConnectionProvider } from "./backendCommunication/useBackendMessageCallbacks";
import { GeneralErrorView } from "./components/ErrorCatcher/GeneralErrorView";
import { EditorContainer } from "./EditorContainer/EditorContainer";
import { TSParserProvider } from "./EditorContainer/TSParserProvider";
import { staticDispatchFromTree } from "./main";
import ReduxProvider from "./state/ReduxProvider";
import styles from "./SUE.module.css";
import {
  generateGhIssueURL,
  generateSerializedStateForError,
} from "./utils/generate_issue_reports";
import { mergeClasses } from "./utils/mergeClasses";

export function SUE({
  showMessages = true,
  backendDispatch: { sendMsg, incomingMsgs, mode } = staticDispatchFromTree(),
  pathToTreeSitterWasm,
}: {
  backendDispatch?: BackendConnection;
  showMessages?: boolean;
  /**
   * Optional path to the treesitter wasm bundle. This is useful when we're embedding
   * the editor somewhere that doesn't have the luxury of the file being bundled into
   * everything like it does with vite.
   */
  pathToTreeSitterWasm?: string;
}) {
  const dispatch: BackendConnection = showMessages
    ? {
        sendMsg,
        incomingMsgs: {
          subscribe: (on, callback) => {
            // eslint-disable-next-line no-console
            // console.log(`backendMsgs.subscribe("${on}", ...)`);
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
          <TSParserProvider pathToTreeSitterWasm={pathToTreeSitterWasm}>
            <EditorContainer />
            <ToastContainer />
          </TSParserProvider>
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
            generateGhIssueURL({
              title: "Error in ShinyUiEditor at root",
              body: `Error at root of editor:\n${generateSerializedStateForError(
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
