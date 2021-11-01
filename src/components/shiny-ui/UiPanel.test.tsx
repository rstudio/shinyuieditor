import { render, screen } from "@testing-library/react";
import UiPanel from "./UiPanel";

describe("UiPanel shows the proper ui element", () => {
  test("shiny::plotOutput", () => {
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          componentName: "plotOutput",
          componentProps: { name: "My Plot Test" },
        }}
      />
    );
    expect(screen.getByLabelText(/shiny-plotOutput/i)).toBeInTheDocument();
  });
  test("shiny::sliderInput", () => {
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          componentName: "sliderInput",
          componentProps: { name: "My Slider Input" },
        }}
      />
    );
    expect(screen.getByLabelText(/shiny-sliderInput/i)).toBeInTheDocument();
  });

  test("gridlayout::titlePanel", () => {
    const testTitle = "My Test App Title";
    render(
      <UiPanel
        area="a"
        componentDefinition={{
          componentName: "titlePanel",
          componentProps: { title: testTitle },
        }}
      />
    );
    expect(screen.getByLabelText(/gridlayout-titlePanel/i)).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  test("No element", () => {
    // This is when the interface for defining a component has yet to be used
    render(<UiPanel area="a" componentDefinition={null} />);
    expect(screen.getByText(/choose shiny ui element/i)).toBeInTheDocument();
  });
});
