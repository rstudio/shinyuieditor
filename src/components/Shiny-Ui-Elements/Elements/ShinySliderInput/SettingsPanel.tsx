import { NumericInput } from "components/Inputs/NumericInput";
import { TextInput } from "components/Inputs/TextInput";
import { ShinyUiArgumentsFields } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { ShinySliderInputProps } from ".";

export const ShinySliderInputSettings: ShinyUiArgumentsFields<
  ShinySliderInputProps
> = ({ currentSettings, onChange }) => {
  const settings = { ...currentSettings };

  const problems = validateSliderSettings(currentSettings);

  const validateAndUpdate = (newValues: Partial<ShinySliderInputProps>) => {
    const updatedValues = { ...settings, ...newValues };
    const problems = validateSliderSettings(updatedValues);
    onChange(updatedValues, problems.length === 0);
  };

  return (
    <>
      <TextInput
        label="Slider name"
        value={settings.name ?? "Default name"}
        onChange={(name) => validateAndUpdate({ name })}
      />
      <NumericInput
        label="Minimum value"
        value={settings.min}
        onChange={(min) => validateAndUpdate({ min })}
      />
      <ShowProblems problems={problems} which="min" />

      <NumericInput
        label="Maximum value"
        value={settings.max}
        onChange={(max) => validateAndUpdate({ max })}
      />
      <ShowProblems problems={problems} which="max" />

      <NumericInput
        label="Starting value"
        value={settings.val}
        onChange={(val) => validateAndUpdate({ val })}
      />
      <ShowProblems problems={problems} which="val" />
    </>
  );
};

type InputProblem = { which: keyof ShinySliderInputProps; msg: string };
export function validateSliderSettings({
  min,
  max,
  val,
  name,
}: Partial<ShinySliderInputProps>): InputProblem[] {
  const missingAny =
    typeof min !== "number" ||
    typeof max !== "number" ||
    typeof val !== "number";

  const problems: InputProblem[] = [];
  if (missingAny) return problems;
  // throw new Error(
  //   "A minimum, maximum, and starting value are needed for slider."
  // );

  if (min > max) {
    problems.push({
      which: "min",
      msg: "Need to define a minimum value that is below the max",
    });
    problems.push({
      which: "max",
      msg: "Need to define a minimum value that is below the max",
    });
  }

  if (val > max) {
    problems.push({
      which: "val",
      msg: "Cant set starting value of slider above the maximum allowed value",
    });
  }

  if (val < min) {
    problems.push({
      which: "val",
      msg: "Cant set starting value of slider below the minimum allowed value",
    });
  }

  return problems;
}

function ShowProblems({
  which,
  problems,
}: {
  which: InputProblem["which"];
  problems: InputProblem[];
}) {
  return (
    <>
      {problems
        .filter((p) => p.which === which)
        .map(({ msg }) => (
          <span style={{ color: "orangered" }}>{msg}</span>
        ))}
    </>
  );
}
