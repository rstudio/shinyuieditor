import { useErrorBoundary } from "react-error-boundary";

import Button from "../../components/Inputs/Button/Button";
import { nodeInfoFactory } from "../nodeInfoFactory";

import styles from "./styles.module.css";

// Provides a node that throws an error when a button is clicked in editor or
// settings panel (for testing error boundaries)
export const testingErrorNodeInfo = nodeInfoFactory<{
  error_msg: string;
}>()({
  r_package: "TESTING",
  name: "error_node",
  title: "Error Throwing Node",
  takesChildren: false,
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
  settingsInfo: {
    error_msg: {
      label: "Message for error",
      inputType: "string",
      defaultValue: "Uh oh, an error!",
    },
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
  // iconSrc: icon,
  category: "TESTING",
  description:
    "Node that throws an error when a button is clicked in editor or settings panel",
});
