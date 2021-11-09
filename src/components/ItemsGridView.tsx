/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  gridItemAtoms,
  gridItemNames,
  useToggleSelectedItem,
} from "state-logic/gridItems";
import { uiElementAtoms } from "state-logic/uiElements";
import { makeBoxShadow } from "utils/css-helpers";
import { placeItemOnGrid } from "utils/placeItemOnGrid";
import { ShinyUiComponent } from "./shiny-ui/componentTypes";
import UiChooser from "./shiny-ui/UiChooser";
import { uiComponentAndSettings } from "./shiny-ui/UiPanel";

function EditableGridItem({
  name,
  onClick,
}: {
  name: string;
  onClick: (name: string) => void;
}) {
  const itemDef = useRecoilValue(gridItemAtoms(name));
  const [itemUi, setItemUi] = useRecoilState(uiElementAtoms(name));
  const positionStyles = placeItemOnGrid(itemDef);

  let uiContent;
  if (itemUi === "unset") {
    uiContent = <UiChooser onChoose={setItemUi} />;
  } else {
    const UiComponent = uiComponentAndSettings[itemUi.componentName]
      .UiComponent as ShinyUiComponent<typeof itemUi.componentProps>;

    uiContent = <UiComponent {...itemUi.componentProps} />;
  }

  return (
    <div
      css={itemStyles}
      style={positionStyles}
      onClick={() => onClick(name)}
      title={name}
      aria-label={`${name}-item`}
    >
      {uiContent}
    </div>
  );
}

const itemStyles = css({
  backgroundColor: "var(--rstudio-white, pink)",
  borderRadius: "var(--corner-radius)",
  border: "1px solid var(--light-grey, orangred)",
  boxShadow: makeBoxShadow(),
});

export default function ItemsGridView() {
  const itemNames = useRecoilValue(gridItemNames);
  const toggleSelectedItem = useToggleSelectedItem();

  return (
    <>
      {itemNames.map((name) => (
        <EditableGridItem key={name} name={name} onClick={toggleSelectedItem} />
      ))}
    </>
  );
}
