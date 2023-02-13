import { useState } from "react";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CSSMeasure } from "./CSSMeasure";
import { CSSUnitInput } from "./CSSUnitInput";

function UseCssUnitInput({ initialValue }: { initialValue: CSSMeasure }) {
  const [value, setValue] = useState<CSSMeasure>(initialValue);

  return (
    <CSSUnitInput
      label="My CSS Input"
      id={"usedCSSUnit"}
      value={value}
      onChange={setValue}
      units={["px", "auto", "rem", "%"]}
    />
  );
}

test("Can show a subset of units", async () => {
  render(
    <CSSUnitInput
      label="My CSS Input"
      id={"my-unit"}
      value={"3rem"}
      units={["rem", "px"]}
      onChange={(newVal) => {}}
    />
  );

  await waitFor(() => {
    const selectInput = screen.getByLabelText(/value-unit/i);
    expect(selectInput).toBeTruthy();

    expect(within(selectInput).queryByText(/rem/i)).toBeTruthy();
    expect(within(selectInput).queryByText(/px/i)).toBeTruthy();

    expect(within(selectInput).queryByText(/auto/i)).toBeFalsy();
    expect(within(selectInput).queryByText(/fr/i)).toBeFalsy();
  });
});

test("Auto units will disable the count input", async () => {
  render(<UseCssUnitInput initialValue={"1px"} />);

  const countInput = screen.getByLabelText("value-count");
  const unitInput = screen.getByLabelText("value-unit");

  await waitFor(() => {
    expect(countInput).not.toBeDisabled();
    expect(unitInput).toHaveValue("px");
  });
  await waitFor(() => {
    userEvent.selectOptions(screen.getByLabelText("value-unit"), "auto");
    expect(countInput).toBeDisabled();
    expect(unitInput).toHaveValue("auto");
  });
});
