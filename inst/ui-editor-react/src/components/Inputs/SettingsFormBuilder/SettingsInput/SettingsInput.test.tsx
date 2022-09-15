import { useState } from "react";
import React from "react";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
// import jest from "jest";

import type { SettingsUpdateAction } from "./SettingsInput";
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

  it("CSS input", async () => {
    const onChange = vi.fn();
    render(
      <SettingsInput
        type="cssMeasure"
        value={"4rem"}
        name="cssVal"
        defaultValue="4rem"
        label="My CSS Input"
        requiredOrOptional="required"
        onChange={onChange}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Css Unit Input")).toBeInTheDocument();
      expect(screen.getByLabelText("My CSS Input")).toBeInTheDocument();
    });
  });
});

function StatefullOptionalText({
  initialVal,
  defaultVal,
}: {
  initialVal: string;
  defaultVal: string;
}) {
  const [value, setValue] = React.useState<string | undefined>(initialVal);
  const updateValue = (action: SettingsUpdateAction) => {
    if (action.type === "UPDATE") {
      setValue(action.value as string);
    }
    if (action.type === "REMOVE") {
      setValue(undefined);
    }
  };
  return (
    <SettingsInput
      name="myStringVal"
      value={value}
      defaultValue={defaultVal}
      type="string"
      label="Optional String Input"
      requiredOrOptional="optional"
      onChange={updateValue}
    />
  );
}

describe("Inputs can be optional", async () => {
  const initialVal = "initial value";
  const defaultVal = "default value";
  it("String input", async () => {
    render(
      <StatefullOptionalText initialVal={initialVal} defaultVal={defaultVal} />
    );

    expect(screen.getByLabelText(`Use myStringVal argument`)).toBeChecked();

    // Starts with initial value
    expect(screen.getByLabelText("Optional String Input")).toHaveValue(
      initialVal
    );

    // Click to disable argument
    userEvent.click(screen.getByLabelText(`Use myStringVal argument`));
    await waitFor(() => {
      // Now the input should be unset
      expect(screen.getByLabelText("Optional String Input")).toHaveTextContent(
        /unset/i
      );
    });

    // Click to re-enable
    userEvent.click(screen.getByLabelText(`Use myStringVal argument`));

    // Now the value should be the default value
    await waitFor(() => {
      expect(screen.getByLabelText("Optional String Input")).toHaveValue(
        defaultVal
      );
    });
  });
});
