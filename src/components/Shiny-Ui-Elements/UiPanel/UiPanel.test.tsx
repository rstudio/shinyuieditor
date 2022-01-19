import { render, screen } from "@testing-library/react";
import UiPanel from ".";

describe("UiPanel shows the proper ui element", () => {
  test("shiny::plotOutput", () => {
    render(
      <UiPanel
        area="a"
        uiDef={{
          uiName: "shiny::plotOutput",
          uiArguments: { outputId: "MyPlotTest" },
        }}
      />
    );
    expect(
      screen.getByLabelText(/panel with shiny::plotOutput/i)
    ).toBeInTheDocument();
  });
  test("shiny::sliderInput", () => {
    render(
      <UiPanel
        area="a"
        uiDef={{
          uiName: "shiny::sliderInput",
          uiArguments: { inputId: "MySliderInput", label: "My Slider Input" },
        }}
      />
    );
    expect(
      screen.getByLabelText(/panel with shiny::sliderInput/i)
    ).toBeInTheDocument();
  });

  test("gridlayout::title_panel", () => {
    const testTitle = "My Test App Title";
    render(
      <UiPanel
        area="a"
        uiDef={{
          uiName: "gridlayout::title_panel",
          uiArguments: { title: testTitle },
        }}
      />
    );
    expect(
      screen.getByLabelText(/panel with gridlayout::title_panel/i)
    ).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });
});

describe("shiny:shiny::sliderInput can update defaults", () => {
  test("Desired values are properly mirrored", () => {
    render(
      <UiPanel
        area="a"
        uiDef={{
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "MySliderInput",
            label: "My Slider Input",
            min: 10,
            max: 90,
            value: 20,
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
          uiDef={{
            uiName: "shiny::sliderInput",
            uiArguments: { inputId: "My Slider Input", min: 10, value: 20 },
          }}
        />
      )
    ).toThrowError(
      "A minimum, maximum, and starting value are needed for slider."
    );
    console.error = originalError;
  });
});
