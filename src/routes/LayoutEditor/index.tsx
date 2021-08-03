import { useReducer, useRef } from "preact/hooks";
import { SetGapSize } from "../../components/SetGapSize";
import { TheAppGridContainer } from "../../components/TheAppGridContainer";
import { TheInstructions } from "../../components/TheInstructions";
import { TheItemsListView } from "../../components/TheItemsListView";
import { TheSettingsPanel } from "../../components/TheSettingsPanel";
import {
  LayoutDispatch,
  layoutUpdater,
} from "../../state-logic/layout-updating-logic";
import { GridLayoutTemplate } from "../../types";
import classes from "./style.module.css";

export default function LayoutEditor(props: {
  startingLayout: GridLayoutTemplate;
}) {
  const [layout, updateLayout] = useReducer(
    layoutUpdater,
    props.startingLayout
  );

  // We need a reference to the main parent element of everything so we can
  // attach event handlers for drag detection to it.
  const editorRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutDispatch.Provider value={updateLayout}>
      <div className={classes.editor} ref={editorRef}>
        <TheSettingsPanel>
          <SetGapSize gapSize={layout.gap} updateLayout={updateLayout} />
        </TheSettingsPanel>
        <TheInstructions />
        <TheItemsListView items={layout.items} />
        <TheAppGridContainer
          layout={layout}
          editorRef={editorRef}
        ></TheAppGridContainer>
      </div>
    </LayoutDispatch.Provider>
  );
}
