import React from "react";

import { AppTour } from "../AppTour";
import { useSyncUiWithBackend } from "../backendCommunication/useSyncUiWithBackend";
import AppPreview from "../components/AppPreview";
import SvgShinyLogo from "../components/Icons/ShinyLogo";
import { TemplateChooserView } from "../components/TemplatePreviews/TemplateChooserView";
import UiNode from "../components/UiNode/UiNode";
import { UndoRedoButtons } from "../components/UndoRedoButtons/UndoRedoButtons";
import { EditorSkeleton } from "../EditorSkeleton/EditorSkeleton";
import { LostConnectionPopup } from "../EditorSkeleton/LostConnectionPopup";
import ElementsPalette from "../ElementsPalette";
import { SettingsPanel } from "../SettingsPanel/SettingsPanel";
import { mergeClasses } from "../utils/mergeClasses";

import { sizes_inline_styles } from "./App_Layout_Sizes";
import styles from "./EditorContainer.module.css";
import { OpenSideBySideWindowButton } from "./OpenSideBySideWindowButton";

export function EditorContainer() {
  const { state, errorInfo, history } = useSyncUiWithBackend();

  let pageBody: React.ReactNode;

  if (errorInfo || state.mode === "ERROR") {
    const { context, msg } =
      state.mode === "ERROR"
        ? state
        : errorInfo
        ? errorInfo
        : {
            context: "Error Context Placeholder",
            msg: "This error message should not be seen",
          };

    pageBody = (
      <MessageForUser>
        <h2>Error {context ? `while ${context}` : ``}</h2>
        <p className={styles.error_msg}>{msg}</p>
      </MessageForUser>
    );
  } else if (state.mode === "LOADING") {
    pageBody = (
      <MessageForUser>
        <h2>Loading initial state from server</h2>
      </MessageForUser>
    );
  } else if (state.mode === "MAIN") {
    pageBody = (
      <EditorSkeleton
        main={<UiNode node={state.ui_tree} path={[]} canDrag={false} />}
        left={<ElementsPalette />}
        properties={<SettingsPanel tree={state.ui_tree} />}
        preview={<AppPreview />}
      />
    );
  } else {
    pageBody = <TemplateChooserView {...state.options} />;
  }

  return (
    <div className={styles.EditorContainer} style={sizes_inline_styles}>
      <header className={styles.header}>
        <SvgShinyLogo className={styles.shiny_logo} />
        <h1 className={styles.app_title}>Shiny UI Editor</h1>
        <div className={styles.right}>
          {state.mode === "MAIN" ? (
            <>
              <OpenSideBySideWindowButton />
              <AppTour />
            </>
          ) : null}
          <div className={styles.divider} />
          <UndoRedoButtons {...history} />
          <div className={mergeClasses(styles.spacer, styles.last)} />
        </div>
      </header>
      {pageBody}
      <LostConnectionPopup />
    </div>
  );
}

function MessageForUser({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.message_for_user}>
      <div className={styles.message_container}>{children}</div>
    </div>
  );
}
