import { getDefaultSettings } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import { PopoverEl } from "../components/PopoverEl/PopoverEl";
import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";
import type { ShinyUiNode } from "../main";
import type { ShinyUiNodeNames } from "../Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";

export function UiElementIcon({ uiName }: { uiName: ShinyUiNodeNames }) {
  const {
    iconSrc,
    title,
    settingsInfo,
    description: infoPopup = title,
  } = getUiNodeInfo(uiName);

  const node = {
    uiName,
    uiArguments: getDefaultSettings(settingsInfo),
  } as ShinyUiNode;

  const dragProps = useMakeDraggable({ node });

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
