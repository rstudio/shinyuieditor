import { useStore } from "react-redux";

import { useHistoryGoBackward } from "../../EditorContainer/HistoryGoBackwardProvider";
import type {
  NodePath,
  ShinyUiNode,
} from "../../Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "../../state/store";
import { generate_ui_node_github_error_link } from "../../utils/generate_issue_reports";
import { TooltipButton } from "../PopoverEl/Tooltip";

import styles from "./UiNodeErrorView.module.css";

export function UiNodeErrorView({
  node,
  path,
  error,
  resetErrorBoundary,
}: {
  node: ShinyUiNode;
  path: NodePath;
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const { goBackward, canGoBackward } = useHistoryGoBackward();

  const store = useStore<RootState>();

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        Something went wrong rendering {node.uiName}()
      </h3>
      <p className={styles.information}>Error message:</p>
      <code className={styles.error_msg}>{error.message}</code>

      <div className={styles.actions}>
        <TooltipButton
          variant="regular"
          position="right"
          text="Try rendering again to see if it fixes the error"
          onClick={() => resetErrorBoundary()}
        >
          Reset
        </TooltipButton>

        {canGoBackward ? (
          <TooltipButton
            variant="regular"
            position="right"
            text="Undo the last state change to see if that fixes issue"
            onClick={() => {
              goBackward();
              resetErrorBoundary();
            }}
          >
            Undo last change
          </TooltipButton>
        ) : null}
        <a
          href={generate_ui_node_github_error_link({
            node,
            path,
            app_state: store.getState(),
          })}
          target="_blank"
          rel="noreferrer"
        >
          Submit bug report
        </a>
      </div>
    </div>
  );
}
