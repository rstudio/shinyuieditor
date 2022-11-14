import * as React from "react";

import { getDefaultSettings } from "components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { PopoverEl } from "components/PopoverEl/PopoverEl";
import type { ShinyUiNames, ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";

import classes from "./styles.module.css";

export function UiElementIcon({ uiName }: { uiName: ShinyUiNames }) {
  const {
    iconSrc,
    title,
    settingsInfo,
    description: infoPopup = title,
  } = shinyUiNodeInfo[uiName];

  const node = {
    uiName,
    uiArguments: getDefaultSettings(settingsInfo),
  } as ShinyUiNode;

  const dragProps = useMakeDraggable({ nodeInfo: { node } });

  if (iconSrc === undefined) {
    return null;
  }

  return (
    <PopoverEl
      popoverContent={infoPopup}
      contentIsMd={true}
      openDelayMs={500}
      triggerEl={
        <div className={classes.OptionContainer}>
          <div
            className={classes.OptionItem}
            data-ui-name={uiName}
            {...dragProps}
          >
            <img src={iconSrc} alt={title} className={classes.OptionIcon} />
            <label className={classes.OptionLabel}>{title}</label>
          </div>
        </div>
      }
    ></PopoverEl>
  );
}
