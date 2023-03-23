import { useStore } from "react-redux";

import { useHistoryGoBackward } from "../../EditorContainer/HistoryGoBackwardProvider";
import type { RootState } from "../../state/store";
import { TooltipButton } from "../PopoverEl/Tooltip";

import styles from "./GeneralErrorView.module.css";

export function GeneralErrorView({
  header,
  error,
  generateIssueLink,
  resetErrorBoundary,
}: {
  header: string;
  generateIssueLink: (state_at_error: RootState) => string;
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const store = useStore<RootState>();

  const { goBackward, canGoBackward } = useHistoryGoBackward();

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{header}</h3>
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
            position="up"
            text="Undo the last state change to see if that fixes issue"
            onClick={() => {
              goBackward();
              resetErrorBoundary();
            }}
          >
            Undo last change
          </TooltipButton>
        ) : null}
        <TooltipButton
          role="link"
          text="Generate a bug report for github"
          variant="regular"
          position="left"
          onClick={() => {
            window.open(generateIssueLink(store.getState()), "_blank");
          }}
        >
          Submit bug report
        </TooltipButton>
      </div>
    </div>
  );
}
