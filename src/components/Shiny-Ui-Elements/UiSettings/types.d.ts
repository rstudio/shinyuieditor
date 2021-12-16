export type InputProblem = { which: keyof ShinySliderInputProps; msg: string };
/**
 * Takes a set of arguments for a given shiny UI element and returns validation errors
 */
export type UiSettingsValidator<Args extends ShinyUiArguments> = (
  p: Args
) => InputProblem[];
