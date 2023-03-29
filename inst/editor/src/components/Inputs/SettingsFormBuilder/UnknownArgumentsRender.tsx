import { inANotInB } from "util-functions/src/arrays";

import { isKnownShinyUiNode } from "../../../Shiny-Ui-Elements/isShinyUiNode";
import type { UnknownUiNode } from "../../../Shiny-Ui-Elements/UnknownUiFunction";
import { Trash } from "../../Icons";
import { SimpleTooltip, TooltipButton } from "../../PopoverEl/Tooltip";

import type { FormBuilderProps } from "./FormBuilder";

export function UnknownArgumentsRender({
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps) {
  const unknownArguments = inANotInB(
    Object.keys(settings),
    Object.keys(settingsInfo)
  );

  if (unknownArguments.length === 0) return null;

  return (
    <section className="unknown-arguments-list">
      <div className="divider-line">
        <label>
          <SimpleTooltip
            text="Arguments present in UI code but not known about or editable by the shinyuieditor"
            position="left"
            size="fit"
          >
            Unknown arguments
          </SimpleTooltip>
        </label>
      </div>

      <ul className="unknown-form-fields" aria-label="Unknown arguments list">
        {unknownArguments.map((argName) => (
          <li
            className="unknown-argument"
            aria-label="Unknown argument"
            key={argName}
            style={{ cursor: "default" }}
          >
            <code
              aria-label={printValueOfUnknownArg(settings[argName])}
              data-balloon-pos={"left"}
              style={{ cursor: "inherit" }}
            >
              {argName}
            </code>

            <TooltipButton
              text={`Remove ${argName} argument`}
              onClick={() => onSettingsChange(argName, { type: "REMOVE" })}
              type="button"
              position="left"
            >
              <Trash />
            </TooltipButton>
          </li>
        ))}
      </ul>
    </section>
  );
}

function isUnknownUiFunction(x: unknown): x is UnknownUiNode {
  if (!isKnownShinyUiNode(x)) return false;
  return x.uiName === "unknownUiFunction";
}

// Maximum number of characters of value to show before truncating
const MAX_VALUE_PRINT = 50;
function printValueOfUnknownArg(unknownArgValue: unknown): string {
  let argumentValue = JSON.stringify(
    isUnknownUiFunction(unknownArgValue)
      ? unknownArgValue.uiArguments.text
      : unknownArgValue
  );

  // Add four characters to limit to account for the four characters of elipses
  // we append
  if (argumentValue.length > MAX_VALUE_PRINT + 4) {
    argumentValue = argumentValue.substring(0, MAX_VALUE_PRINT);
    argumentValue += "...";
  }

  return "Value: " + argumentValue;
}
