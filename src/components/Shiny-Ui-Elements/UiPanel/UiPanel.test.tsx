import { render, screen } from "@testing-library/react";
import UiPanel from ".";

describe("UiPanel shows the proper ui element", () => {
  test("shiny::shiny__plotOutput", () => {
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          uiName: "shiny__plotOutput",
          uiArguments: { name: "My Plot Test" },
        }}
      />
    );
    expect(
      screen.getByLabelText(/shiny-shiny__plotOutput/i)
    ).toBeInTheDocument();
  });
  test("shiny__sliderInput", () => {
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          uiName: "shiny__sliderInput",
          uiArguments: { name: "My Slider Input" },
        }}
      />
    );
    expect(
      screen.getByLabelText(/shinyshiny__sliderInput/i)
    ).toBeInTheDocument();
  });

  test("gridlayout::titlePanel", () => {
    const testTitle = "My Test App Title";
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          uiName: "gridlayout__titlePanel",
          uiArguments: { title: testTitle },
        }}
      />
    );
    expect(screen.getByLabelText(/gridlayout-titlePanel/i)).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });
});

describe("shiny:shiny__sliderInput can update defaults", () => {
  test("Desired values are properly mirrored", () => {
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          uiName: "shiny__sliderInput",
          uiArguments: {
            name: "My Slider Input",
            min: 10,
            max: 90,
            val: 20,
          },
        }}
      />
    );

    const slider = screen.getByLabelText(/slider input/i);
    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "90");
    expect(slider).toHaveAttribute("value", "20");
    expect(screen.getByText(/20/i)).toBeInTheDocument();
  });

  test("Errors properly", () => {
    // Use a mock to clean up the console output
    const originalError = console.error;
    console.error = jest.fn();
    expect(() =>
      render(
        <UiPanel
          area="a"
          componentDefinition={{
            uiName: "shiny__sliderInput",
            uiArguments: { name: "My Slider Input", min: 10, val: 20 },
          }}
        />
      )
    ).toThrowError(
      "A minimum, maximum, and starting value are needed for slider."
    );
    console.error = originalError;
  });
});
