import {
  InputProblem,
  UiSettingsValidator,
} from "components/Shiny-Ui-Elements/UiSettings/types";

export type SliderSettings = {
  inputId: string;
  label?: string;
  min: number;
  value: number;
  max: number;
};

export const sliderDefaultSettings: SliderSettings = {
  inputId: "mySlider",
  min: 0,
  max: 10,
  value: 5,
};

export type ShinySliderInputProps = Partial<SliderSettings>;

function validateNumber(x?: string | number) {
  if (typeof x === "number") return x;

  const parsed = Number(x);

  if (isNaN(parsed)) return null;

  return parsed;
}

export function buildSliderSettings(
  settings: Partial<SliderSettings>
): SliderSettings {
  let { inputId } = settings;
  let min = validateNumber(settings.min);
  let max = validateNumber(settings.max);
  let value = validateNumber(settings.value);
  const missingAll =
    typeof min !== "number" &&
    typeof max !== "number" &&
    typeof value !== "number";
  const haveAll =
    typeof min === "number" &&
    typeof max === "number" &&
    typeof value === "number";

  if (!missingAll && !haveAll)
    throw new Error(
      "A minimum, maximum, and starting value are needed for slider."
    );

  if (typeof min !== "number") min = 0;
  if (typeof max !== "number") max = 100;
  if (typeof value !== "number") value = 50;

  if (min > max) {
    throw new Error("Need to define a minimum value that is below the max");
  }

  if (value > max) {
    throw new Error(
      "Cant set starting value of slider above the maximum allowed value"
    );
  }

  if (value < min) {
    throw new Error(
      "Cant set starting value of slider below the minimum allowed value"
    );
  }

  if (typeof inputId !== "string") {
    inputId = "Default slider name";
  }

  return { min, max, value, inputId };
}

export const validateSliderSettings: UiSettingsValidator<
  ShinySliderInputProps
> = ({ min, max, value: val, inputId }) => {
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
      which: "value",
      msg: "Cant set starting value of slider above the maximum allowed value",
    });
  }

  if (val < min) {
    problems.push({
      which: "value",
      msg: "Cant set starting value of slider below the minimum allowed value",
    });
  }

  return problems;
};
