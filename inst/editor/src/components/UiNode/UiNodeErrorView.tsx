import { useHistoryGoBackward } from "../../EditorContainer/HistoryGoBackwardProvider";
import type { ShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { TooltipButton } from "../PopoverEl/Tooltip";

import styles from "./UiNodeErrorView.module.css";

export function UiNodeErrorView({
  node,
  error,
  resetErrorBoundary,
}: {
  node: ShinyUiNode;
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const { goBackward, canGoBackward } = useHistoryGoBackward();

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        Something went wrong rendering {node.uiName}()
      </h3>
      <p className={styles.information}>Here's the error message</p>
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
      </div>
    </div>
  );
}
