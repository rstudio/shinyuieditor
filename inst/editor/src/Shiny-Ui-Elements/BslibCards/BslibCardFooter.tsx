import { CardFooter } from "../../components/cards/CardFooter";
import { dragCallbacksReset } from "../../DragAndDropHelpers/useMakeDraggable";
import type { UiComponentInfo, UiNodeComponentProps } from "../uiNodeTypes";

import { ChildrenWithDropNodes } from "./ChildrenWithDropNodes";
import { MutedText } from "./MutedText";
import styles from "./style.module.css";

export const bslibCardFooterInfo: UiComponentInfo<CardFooterSettings> = {
  title: "Card Footer",
  UiComponent: BslibCardFooter,
  settingsInfo: {
    title: {
      label: "Name of node",
      inputType: "string",
      defaultValue: "NODE NAME",
    },
  },
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};

export type CardFooterSettings = {
  title: string;
};

function BslibCardFooter({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}: UiNodeComponentProps<CardFooterSettings>) {
  const wrapperPropsNoDrag = {
    ...wrapperProps,
    ...dragCallbacksReset,
  };
  return (
    <CardFooter {...wrapperPropsNoDrag}>
      <ChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        dropPanelClass={styles.drop_watcher}
        showOnEmpty={<MutedText>Drag elements to add to card footer</MutedText>}
      />
    </CardFooter>
  );
}
