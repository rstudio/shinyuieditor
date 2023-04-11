import React from "react";

import type {
  Single_File_Full_Info,
  Multi_File_Full_Info,
} from "communication-types/src/AppInfo";
import { useStore } from "react-redux";

import { generate_full_app_script } from "../../ast_parsing/generate_full_app_script";
import { DialogPopover } from "../../EditorContainer/DialogPopover";
import { PanelHeader } from "../../EditorLayout/PanelHeader";
import { useLanguageMode } from "../../state/languageMode";
import type { RootState } from "../../state/store";
import Button from "../Inputs/Button/Button";
import { TooltipButton } from "../PopoverEl/Tooltip";

import classes from "./AppPreview.module.css";
import styles from "./ShowAppText.module.css";

function AppFilesViewer({
  info,
}: {
  info: Single_File_Full_Info | Multi_File_Full_Info;
}) {
  const language = useLanguageMode();
  const app_scripts = generate_full_app_script(info, {
    include_info: false,
    language,
  });

  if (app_scripts.app_type === "SINGLE-FILE") {
    return (
      <>
        <h2 className={styles.title}>App script</h2>
        <p className={styles.description}>
          The following code defines the currently being edited app. Copy and
          paste it to an <code>app.R</code> file to use.
        </p>
        <div className={styles.code_holder}>
          <label>app.R</label>
          <pre>{app_scripts.app}</pre>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className={styles.title}>App scripts</h2>
      <p className={styles.description}>
        The following code defines the currently being edited app. Copy and
        paste the ui and server scripts into <code>ui.R</code> and{" "}
        <code>server.R</code> files to use.
      </p>
      <div className={styles.code_holder}>
        <label>ui.R</label>
        <pre>{app_scripts.ui}</pre>
      </div>
      <div className={styles.code_holder}>
        <label>server.R</label>
        <pre>{app_scripts.server}</pre>
      </div>
    </>
  );
}
export function ShowAppText() {
  const [script_visible, set_script_visible] = React.useState(false);
  const store = useStore();

  const current_state = (store.getState() as RootState).app_info;

  if (current_state.mode !== "MAIN") return null;

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
          <form method="dialog">
            <AppFilesViewer info={current_state} />
            <div className={styles.footer}>
              <Button type="submit">Okay</Button>
            </div>
          </form>
        </DialogPopover>
      ) : null}
    </>
  );
}
