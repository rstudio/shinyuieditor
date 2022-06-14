import { useState } from "react";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CSSMeasure } from "../../../CSSMeasure";

import { CSSUnitInput } from ".";

function UseCssUnitInput({ initialValue }: { initialValue: CSSMeasure }) {
  const [value, setValue] = useState<CSSMeasure>(initialValue);

  return <CSSUnitInput value={value} onChange={setValue} />;
}

test("Initializes properly", async () => {
  render(<CSSUnitInput value={"3rem"} onChange={(newVal) => {}} />);

  await waitFor(() => {
    expect(screen.getByLabelText("value-count")).toHaveValue(3);
    expect(screen.getByLabelText("value-unit")).toHaveValue("rem");
  });
});

test("Can show a subset of units", async () => {
  render(
    <CSSUnitInput
      value={"3rem"}
      units={["rem", "px"]}
      onChange={(newVal) => {}}
    />
  );

  await waitFor(() => {
    const selectInput = screen.getByLabelText(/value-unit/g);
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
