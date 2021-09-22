import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../test-utils";
import { CSSUnitInput } from "./CSSUnitInput";

test("Initializes properly", () => {
  render(<CSSUnitInput value={"3rem"} onChange={(newVal) => {}} />);
  expect(screen.getByLabelText("value-count")).toHaveValue("3");
  expect(screen.getByLabelText("value-unit")).toHaveValue("rem");
});

test("Can be incremented by the arrows", () => {
  const handleChange = jest.fn();

  render(<CSSUnitInput value={"1px"} onChange={handleChange} />);
  expect(screen.getByLabelText("value-count")).toHaveValue("1");
  expect(screen.getByLabelText("value-unit")).toHaveValue("px");

  userEvent.click(screen.getByLabelText(/increase count/i));
  expect(screen.getByLabelText("value-count")).toHaveValue("2");
  expect(handleChange).toHaveBeenCalledWith("2px");

  userEvent.click(screen.getByLabelText(/decrease count/i));
  expect(screen.getByLabelText("value-count")).toHaveValue("1");
  expect(handleChange).toHaveBeenCalledWith("1px");
});

test("Auto units will disable the count input", () => {
  const handleChange = jest.fn();

  render(<CSSUnitInput value={"1px"} onChange={handleChange} />);

  const countInput = screen.getByLabelText("value-count");
  const unitInput = screen.getByLabelText("value-unit");

  expect(countInput).not.toBeDisabled();
  expect(unitInput).toHaveValue("px");

  userEvent.selectOptions(screen.getByLabelText("value-unit"), "auto");
  expect(countInput).toBeDisabled();
  expect(unitInput).toHaveValue("auto");
  expect(handleChange).toHaveBeenCalledWith("auto");

  // When going back to a counted unit the old value is remembered
  userEvent.selectOptions(screen.getByLabelText("value-unit"), "rem");
  expect(countInput).toHaveValue("1");
  expect(unitInput).toHaveValue("rem");
  expect(handleChange).toHaveBeenCalledWith("1rem");
});
