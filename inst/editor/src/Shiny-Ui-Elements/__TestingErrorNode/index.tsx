import { useErrorBoundary } from "react-error-boundary";
import { testing_error_node } from "ui-node-definitions/src/internal/testing_error_node";

import Button from "../../components/Inputs/Button/Button";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import styles from "./styles.module.css";

// Provides a node that throws an error when a button is clicked in editor or
// settings panel (for testing error boundaries)
export const testingErrorNodeInfo = add_editor_info_to_ui_node(
  testing_error_node,
  {
    UiComponent: ({ namedArgs, path, wrapperProps }) => {
      const { showBoundary } = useErrorBoundary();

      return (
        <div className={styles.container} {...wrapperProps}>
          <h3>Error Node! I throw errors</h3>
          <Button
            variant="delete"
            aria-label="Throw an error"
            onClick={() => {
              // throw an error with message "something broke!"
              showBoundary(new Error(`Ui Node error: ${namedArgs.error_msg}`));
            }}
          >
            💣
          </Button>
        </div>
      );
    },

    settingsFormRender: ({ inputs, settings }) => {
      if (settings.error_msg === "Trigger settings error") {
        throw new Error(`Settings panel render error:\n${settings.error_msg}`);
      }

      return (
        <>
          <p>
            Set the error message to "Trigger settings error" to cause the
            settings panel to throw an error
          </p>
          {inputs.error_msg}
        </>
      );
    },
  }
);
