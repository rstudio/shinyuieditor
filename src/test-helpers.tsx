import userEvent from "@testing-library/user-event";

export function clearThenType(
  inputOrig: HTMLInputElement | HTMLElement,
  textToType: string | number
) {
  const input = inputOrig as HTMLInputElement;
  input.setSelectionRange(0, input.value.length);
  userEvent.type(input, String(textToType));
}
