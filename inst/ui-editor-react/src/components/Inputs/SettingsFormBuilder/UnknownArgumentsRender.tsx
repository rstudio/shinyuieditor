import { Trash } from "components/Icons";
import { Tooltip, TooltipButton } from "components/PopoverEl/Tooltip";
import type { ShinyUiNodeByName } from "Shiny-Ui-Elements/uiNodeTypes";
import { inANotInB } from "utils/array-helpers";

import { isShinyUiNode } from "../../../Shiny-Ui-Elements/isShinyUiNode";

import type { FormBuilderProps } from "./FormBuilder";
import type { FormInfo } from "./inputFieldTypes";

export function UnknownArgumentsRender<Info extends FormInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps<Info>) {
  const unknownArguments = inANotInB(
    Object.keys(settings),
    Object.keys(settingsInfo)
  );

  if (unknownArguments.length === 0) return null;

  return (
    <section className="unknown-arguments-list">
      <div className="divider-line">
        <label>
          <Tooltip
            text="Arguments present in UI code but not known about or editable by the shinyuieditor"
            position="left"
          >
            Unknown arguments
          </Tooltip>
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

type UnknownUiFunction = ShinyUiNodeByName["unknownUiFunction"];

export function isUnknownUiFunction(x: unknown): x is UnknownUiFunction {
  if (!isShinyUiNode(x)) return false;
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
