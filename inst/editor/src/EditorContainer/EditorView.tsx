import AppPreview from "../components/AppPreview";
import { TemplateChooserView } from "../components/TemplatePreviews/TemplateChooserView";
import UiNode from "../components/UiNode/UiNode";
import { EditorLayout } from "../EditorLayout/EditorLayout";
import ElementsPalette from "../ElementsPalette";
import { SettingsPanel } from "../SettingsPanel/SettingsPanel";
import type {
  EditingState,
  ErrorState,
  MainStateOption,
} from "../state/app_info";

import { ErrorMessagePrinter, MessageForUser } from "./MessageForUser";

export function EditorView({ state }: { state: MainStateOption }) {
  switch (state.mode) {
    case "MAIN":
      return <MainEditorView state={state} />;

    case "LOADING":
      return <LoadingView />;

    case "ERROR":
      return <ErrorView state={state} />;

    case "CONNECTION-LOST":
      return <LostConnectionView />;

    case "TEMPLATE_CHOOSER":
      return <TemplateChooserView {...state.options} />;

    default:
      return (
        <ErrorView
          state={{
            mode: "ERROR",
            context: "EditorView",
            msg: `Editor in unknown state. Congratulations you found a bug!`,
          }}
        />
      );
  }
}

function MainEditorView({ state }: { state: EditingState }) {
  return (
    <EditorLayout
      main={<UiNode node={state.ui_tree} path={[]} canDrag={false} />}
      left={<ElementsPalette />}
      properties={<SettingsPanel tree={state.ui_tree} />}
      preview={<AppPreview />}
    />
  );
}

function ErrorView({ state }: { state: ErrorState }) {
  return (
    <MessageForUser>
      <h2>Error {state.context ? `while ${state.context}` : ``}</h2>
      <ErrorMessagePrinter msg={state.msg} />
    </MessageForUser>
  );
}

function LostConnectionView() {
  return (
    <MessageForUser>
      <h2>Lost connection to backend</h2>
      <p>Don't worry, nothing has been lost!</p>
      <p>
        Try refreshing the page if the editor has been sitting idle for a while.
        Otherwise try re-running the ui editor launch command.
      </p>
    </MessageForUser>
  );
}

function LoadingView() {
  return (
    <MessageForUser>
      <h2>Loading initial state from server</h2>
    </MessageForUser>
  );
}
