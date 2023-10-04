import React from "react";

import type { AppInfo } from "communication-types/src/AppInfo";
import { ArrowUpRightSquare } from "react-bootstrap-icons";
import { useStore } from "react-redux";

import { DialogPopover } from "../../EditorContainer/DialogPopover";
import { PanelHeader } from "../../EditorLayout/PanelHeader";
import { useLanguageMode } from "../../state/languageMode";
import type { RootState } from "../../state/store";
import { generateFullAppScript } from "../../ui-node-definitions/code_generation/generate_full_app_script";
import Button from "../Inputs/Button/Button";
import { PopoverButton } from "../Inputs/PopoverButton";

import classes from "./AppPreview.module.css";
import { pythonAppToShinyliveUrl } from "./python_app_to_shinylive_url";
import styles from "./ShowAppText.module.css";

function AppFilesViewer({ info }: { info: AppInfo }) {
  const language = useLanguageMode();
  const app_scripts = generateFullAppScript(info, {
    include_info: false,
  });

  return (
    <>
      <h2 className={styles.title}>App script</h2>
      <p className={styles.description}>
        The following code defines the currently being edited app. Copy and
        paste it to an <code>app.{language === "PYTHON" ? "py" : "R"}</code>{" "}
        file to use.
      </p>

      {language === "PYTHON" ? (
        <div className={styles.openButtons}>
          <span>Want to start coding your app? </span>
          <Button
            onClick={() => {
              const editor_url = pythonAppToShinyliveUrl(
                app_scripts.app,
                "editor"
              );
              window.open(editor_url);
            }}
          >
            <ArrowUpRightSquare />
            Open in ShinyLive Editor
          </Button>
        </div>
      ) : null}
      <div className={styles.code_holder}>
        <label>app.R</label>
        <pre>{app_scripts.app}</pre>
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
      <PopoverButton
        className={styles.show_btn}
        popoverContent="See current application code"
        placement="left"
        onClick={() => set_script_visible((is_visible) => !is_visible)}
        variant="regular"
      >
        Get app script
      </PopoverButton>
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
