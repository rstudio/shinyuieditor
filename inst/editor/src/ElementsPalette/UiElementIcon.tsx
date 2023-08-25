import { getDefaultSettings } from "../components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import {
  MarkdownTooltipContent,
  Tooltip,
  TooltipTrigger,
} from "../components/PopoverEl/FloatingPopover";
import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";
import { getUiNodeIcon } from "../Shiny-Ui-Elements/registered_ui_nodes";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import type { ShinyUiNodeIds } from "../ui-node-definitions/uiNodeTypes";
import { getUiNodeInfo } from "../ui-node-definitions/uiNodeTypes";

import classes from "./styles.module.css";

export function UiElementIcon({ id }: { id: ShinyUiNodeIds }) {
  const {
    title,
    settingsInfo,
    description: infoPopup = title,
    default_node,
  } = getUiNodeInfo(id);

  const iconSrc = getUiNodeIcon(id);

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
