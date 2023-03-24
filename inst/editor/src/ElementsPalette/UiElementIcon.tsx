import { getDefaultSettings } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import {
  MarkdownTooltipContent,
  Tooltip,
  TooltipTrigger,
} from "../components/PopoverEl/FloatingPopover";
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
    default_node,
  } = getUiNodeInfo(uiName);

  const node = default_node
    ? {
        uiName,
        ...default_node,
      }
    : ({
        uiName,
        uiArguments: getDefaultSettings(settingsInfo),
      } as ShinyUiNode);

  const dragProps = useMakeDraggable({ node });

  if (iconSrc === undefined) {
    return null;
  }

  return (
    <Tooltip placement="right">
      <TooltipTrigger>
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
      </TooltipTrigger>
      <MarkdownTooltipContent content={infoPopup} />
    </Tooltip>
  );
}
