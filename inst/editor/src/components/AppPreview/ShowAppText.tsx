import React from "react";

import { useStore } from "react-redux";

import { generate_full_app_script } from "../../backendCommunication/full_app_info";
import { DialogPopover } from "../../EditorContainer/DialogPopover";
import { PanelHeader } from "../../EditorSkeleton/EditorSkeleton";
import type { RootState } from "../../state/store";
import Button from "../Inputs/Button/Button";
import { TooltipButton } from "../PopoverEl/Tooltip";

import classes from "./AppPreview.module.css";
import styles from "./ShowAppText.module.css";

export function ShowAppText() {
  const [script_visible, set_script_visible] = React.useState(false);
  const store = useStore();

  const getCurrentApp = () => {
    const app_state = (store.getState() as RootState).uiTree;
    if (app_state.mode !== "MAIN") return "Not in correct state";

    return generate_full_app_script(app_state).trim();
  };
  return (
    <>
      <PanelHeader className={classes.title}>Code</PanelHeader>
      <TooltipButton
        className={styles.show_btn}
        text="See current application code"
        position="left"
        onClick={() => set_script_visible((is_visible) => !is_visible)}
        variant="regular"
      >
        Get app script
      </TooltipButton>
      {script_visible ? (
        <DialogPopover
          className={styles.modal}
          title="App Script"
          onClose={() => set_script_visible(false)}
        >
          <h2>App script</h2>
          <p>
            The following code defines the currently being edited app. Copy and
            paste it to an <code>app.R</code> file to use.
          </p>
          <form method="dialog">
            <div className={styles.code_holder}>
              <pre>{getCurrentApp()}</pre>
            </div>
            <div className={styles.footer}>
              <Button type="submit">Okay</Button>
            </div>
          </form>
        </DialogPopover>
      ) : null}
    </>
  );
}
