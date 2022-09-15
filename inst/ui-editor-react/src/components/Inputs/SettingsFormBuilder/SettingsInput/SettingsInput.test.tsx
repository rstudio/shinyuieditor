import { useState } from "react";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
// import jest from "jest";

import { SettingsInput } from "./SettingsInput";

describe("Required inputs work", async () => {
  it("String input", async () => {
    const onChange = vi.fn();
    render(
      <SettingsInput
        name="name"
        value={"test"}
        defaultValue="name default"
        type="string"
        label="String Input"
        onChange={onChange}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("String Input")).toHaveAttribute(
        "type",
        "text"
      );
      expect(screen.getByLabelText("String Input")).toHaveValue("test");
    });
  });
  it("Number input", async () => {
    const onChange = vi.fn();
    render(
      <SettingsInput
        type="number"
        name="name"
        value={42}
        defaultValue={10}
        label="Number Input"
        onChange={onChange}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Number Input")).toHaveAttribute(
        "type",
        "number"
      );

      expect(screen.getByLabelText("Number Input")).toHaveValue(42);
    });
  });

  //   it("CSS input", async () => {
  //     const onChange = vi.fn();
  //     render(
  //       <SettingsInput
  //         type="cssMeasure"
  //         value={"4rem"}
  //         name="cssVal"
  //         defaultValue="4rem"
  //         label="CSS Input"
  //         requiredOrOptional="required"
  //         onChange={onChange}
  //       />
  //     );

  //     // screen.debug();
  //     await waitFor(() => {
  //       expect(screen.getByLabelText("CSS Input")).toHaveAccessibleDescription(
  //         /css unit input/
  //       );
  //     });
  //   });
});
