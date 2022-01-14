import {
  InputProblem,
  UiSettingsValidator,
} from "components/Shiny-Ui-Elements/UiSettings/types";

export type SliderSettings = {
  inputId: string;
  label: string;
  min: number;
  value: number;
  max: number;
};

export const sliderDefaultSettings: SliderSettings = {
  inputId: "mySlider",
  label: "slider input",
  min: 0,
  max: 10,
  value: 5,
};

export type ShinySliderInputProps = Partial<SliderSettings>;

export function validateNumber(x?: string | number) {
  if (typeof x === "number") return x;

  const parsed = Number(x);

  if (isNaN(parsed)) return undefined;

  return parsed;
}

export function buildSliderSettings(
  settings: Partial<SliderSettings>
): Partial<SliderSettings> {
  if (settings.min) settings.min = validateNumber(settings.min);
  if (settings.max) settings.max = validateNumber(settings.max);
  if (settings.value) settings.value = validateNumber(settings.value);

  return settings;
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
