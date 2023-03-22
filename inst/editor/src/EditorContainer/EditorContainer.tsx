import { useSyncUiWithBackend } from "../backendCommunication/useSyncUiWithBackend";

import { sizes_inline_styles } from "./App_Layout_Sizes";
import styles from "./EditorContainer.module.css";
import { EditorView } from "./EditorView";
import { HeaderView } from "./HeaderView";
import { LostConnectionPopup } from "./LostConnectionPopup";

export function EditorContainer() {
  const { state, history } = useSyncUiWithBackend();

  return (
    <div className={styles.EditorContainer} style={sizes_inline_styles}>
      <HeaderView state={state} history={history} />
      <EditorView state={state} />
      <LostConnectionPopup />
    </div>
  );
}
