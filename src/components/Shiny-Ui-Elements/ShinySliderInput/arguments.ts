export type ShinySliderInputProps = {
  inputId: string;
  label: string;
  min: number;
  value: number;
  max: number;
};

export const sliderDefaultSettings: ShinySliderInputProps = {
  inputId: "mySlider",
  label: "slider input",
  min: 0,
  max: 10,
  value: 5,
};

export function validateNumber(x?: string | number) {
  if (typeof x === "number") return x;

  const parsed = Number(x);

  if (isNaN(parsed)) return undefined;

  return parsed;
}

// export function buildSliderSettings(
//   settings: Partial<ShinySliderInputProps>
// ): ShinySliderInputProps {
//   if (settings.min) settings.min = validateNumber(settings.min);
//   if (settings.max) settings.max = validateNumber(settings.max);
//   if (settings.value) settings.value = validateNumber(settings.value);

//   return settings;
// }
