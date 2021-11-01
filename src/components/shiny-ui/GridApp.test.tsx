import { render, screen } from "@testing-library/react";
import { TemplatedGridProps } from "utils/parseGridTemplateAreas";
import GridApp from "./GridApp";

const mainLayout: TemplatedGridProps = {
  areas: [
    ["title", "title"],
    ["settings", "plot"],
    ["footer", "footer"],
  ],
  rowSizes: ["100px", "350px", "30px"],
  colSizes: ["250px", "1fr"],
};
const testTitle = "My Test App Title";

describe("GridApp fills with proper elements", () => {
  test("Full basic app", () => {
    render(
      <GridApp
        layout={mainLayout}
        panels={{
          title: {
            componentName: "titlePanel",
            componentProps: { title: testTitle },
          },
          settings: {
            componentName: "sliderInput",
            componentProps: { name: "My slider!" },
          },
          plot: {
            componentName: "plotOutput",
            componentProps: { name: "My Plot!" },
          },
        }}
      />
    );

    expect(screen.getByLabelText(/shiny-plotOutput/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shiny-sliderInput/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gridlayout-titlePanel/i)).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  test("Empty app", () => {
    render(<GridApp layout={mainLayout} panels={{}} />);

    expect(
      screen.queryByLabelText(/shiny-plotOutput/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/shiny-sliderInput/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/gridlayout-titlePanel/i)
    ).not.toBeInTheDocument();
  });
});

describe("Checks for proper matching of layout and requested elements", () => {
  test("Mismatched grid location for item", () => {
    // Use a mock to clean up the console output
    const originalError = console.error;
    console.error = jest.fn();
    expect(() =>
      render(
        <GridApp
          layout={mainLayout}
          panels={{
            appTitle: {
              componentName: "titlePanel",
              componentProps: { title: testTitle },
            },
          }}
        />
      )
    ).toThrowError(
      "Tried to place a panel onto an area not in the defined grid layout"
    );
    console.error = originalError;
  });
});
