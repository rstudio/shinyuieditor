import React from "react";

import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NumberInput } from "./NumberInput";

function NumberInputDemo({ start = 10 }: { start?: number }) {
  const [value, setValue] = React.useState<number>(start);

  return (
    <>
      <button onClick={() => setValue(10)}>set to 10</button>
      <NumberInput
        id="MyNumber"
        label="My Number Input"
        value={value}
        onChange={setValue}
      />
    </>
  );
}

const setup = (init: number) => {
  const utils = render(<NumberInputDemo start={init} />);
  const input = utils.getByLabelText("My Number Input") as HTMLInputElement;
  const toTenButton = utils.getByText("set to 10") as HTMLInputElement;
  return {
    input,
    toTenButton,
    ...utils,
  };
};

test("Deleting back to nothing doesn't result in zero-prefixed value", async () => {
  const { input } = setup(10);
  // Delete twice and type a new number and make sure the new number doesn't have zero-prefixed
  await userEvent.type(input, "{Backspace}{Backspace}");
  await waitFor(() => {
    expect(input).toHaveDisplayValue("");
  });
});

test("Zero prefixed values can be typed intentionally", async () => {
  const { input } = setup(1);
  // Type a number backwards at one point needing to have the state of 04
  await userEvent.type(input, "{Backspace}4{ArrowLeft}0{ArrowLeft}3");
  await waitFor(() => {
    expect(input).toHaveDisplayValue("304");
  });
});

test("State updates from outside are respected", async () => {
  const { input, toTenButton } = setup(1);
  // Type a number backwards at one point needing to have the state of 04
  await userEvent.type(input, "3");
  await waitFor(() => {
    expect(input).toHaveDisplayValue("13");
  });

  await userEvent.click(toTenButton);
  await waitFor(() => {
    expect(input).toHaveDisplayValue("10");
  });
});
