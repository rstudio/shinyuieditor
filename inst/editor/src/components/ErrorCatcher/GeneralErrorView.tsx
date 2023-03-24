import { useStore } from "react-redux";

import { useHistoryGoBackward } from "../../EditorContainer/HistoryGoBackwardProvider";
import type { RootState } from "../../state/store";
import { PopoverButton } from "../Inputs/PopoverButton";

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
        <PopoverButton
          placement="top"
          popoverContent={"Try rendering again to see if it fixes the error"}
          onClick={() => resetErrorBoundary()}
        >
          Reset
        </PopoverButton>

        {canGoBackward ? (
          <PopoverButton
            variant="regular"
            placement="top"
            popoverContent="Undo the last state change to see if that fixes issue"
            onClick={() => {
              goBackward();
              // Call resetErrorBoundary after a 10ms delay
              // This is to give the state time to update
              // before the error boundary is reset
              setTimeout(resetErrorBoundary, 5);
            }}
          >
            Undo last change
          </PopoverButton>
        ) : null}

        <PopoverButton
          role="link"
          popoverContent="Generate a bug report for github"
          variant="regular"
          placement="top"
          onClick={() => {
            window.open(generateIssueLink(store.getState()), "_blank");
          }}
        >
          Submit bug report
        </PopoverButton>
      </div>
    </div>
  );
}
