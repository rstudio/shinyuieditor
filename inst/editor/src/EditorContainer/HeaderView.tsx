import { AppTour } from "../AppTour";
import SvgShinyLogo from "../components/Icons/ShinyLogo";
import { UndoRedoButtons } from "../components/UndoRedoButtons/UndoRedoButtons";
import type { HistoryInfo } from "../HistoryNavigation/useUndoRedo";
import type { MainStateOption } from "../state/app_info";
import { mergeClasses } from "../utils/mergeClasses";

import styles from "./HeaderView.module.css";
import { LanguageModeBadge } from "./LanguageModeBadge";
import { OpenSideBySideWindowButton } from "./OpenSideBySideWindowButton";

export function HeaderView({
  state,
  history,
}: {
  state: MainStateOption;
  history: HistoryInfo;
}) {
  return (
    <header className={styles.header}>
      <SvgShinyLogo className={styles.shiny_logo} />
      <h1 className={styles.app_title}>Shiny UI Editor</h1>
      <LanguageModeBadge />
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
  );
}
