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

export function UiElementIcon({ id }: { id: ShinyUiNodeNames }) {
  const {
    iconSrc,
    title,
    settingsInfo,
    description: infoPopup = title,
    default_node,
  } = getUiNodeInfo(id);

  const node = default_node
    ? {
        id,
        ...default_node,
      }
    : ({
        id,
        namedArgs: getDefaultSettings(settingsInfo),
      } as ShinyUiNode);

  const dragProps = useMakeDraggable({ node });

  if (iconSrc === undefined) {
    return null;
  }

  return (
    <Tooltip placement="right">
      <TooltipTrigger asChild>
        <div className={classes.OptionContainer}>
          <div className={classes.OptionItem} data-ui-name={id} {...dragProps}>
            <img src={iconSrc} alt={title} className={classes.OptionIcon} />
            <label className={classes.OptionLabel}>{title}</label>
          </div>
        </div>
      </TooltipTrigger>
      <MarkdownTooltipContent content={infoPopup} />
    </Tooltip>
  );
}
