import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import GridApp from ".";
import { ShinySliderInputProps } from "../ShinySliderInput";

const mainLayout: TemplatedGridProps = {
  areas: [
    ["title", "title"],
    ["numBins", "plot"],
    ["footer", "footer"],
  ],
  rowSizes: ["100px", "350px", "30px"],
  colSizes: ["250px", "1fr"],
};

const originalError = console.error;
beforeEach(() => {
  // Use a mock to clean up the console output
  console.error = jest.fn();
});
afterEach(() => {
  console.error = originalError;
});

const startingState = {
  title: {
    componentName: "titlePanel",
    componentProps: { title: "My Test App Title" },
  },
  numBins: {
    componentName: "sliderInput",
    componentProps: { name: "My slider!" } as ShinySliderInputProps,
  },
  plot: {
    componentName: "plotOutput",
    componentProps: { name: "My Plot!" },
  },
};

describe("Adding and removing panels", () => {
  test("Existing panel", () => {
    render(
      <GridApp
        layout={mainLayout}
        panels={startingState as React.ComponentProps<typeof GridApp>["panels"]}
      />
    );

    // First remove the title panel
    const titlePanel = screen.getByLabelText(/title panel/i);
    expect(titlePanel).toBeInTheDocument();
    userEvent.click(within(titlePanel).getByLabelText(/delete/i));
    expect(titlePanel).not.toBeInTheDocument();

    // Next remove the settings panel
    const settingsPanel = screen.getByLabelText(/numBins panel/i);
    expect(settingsPanel).toBeInTheDocument();
    userEvent.click(within(settingsPanel).getByLabelText(/delete/i));
    expect(settingsPanel).not.toBeInTheDocument();

    // Replace the now deleted settings panel with another plot output
    const newPlotButton = within(
      screen.getByLabelText(/Ui-Chooser for numBins/i)
    ).getByLabelText(/Add plotOutput to app/);
    userEvent.click(newPlotButton);

    expect(
      within(screen.getByLabelText(/numBins panel/i)).getByLabelText(
        /shiny-plotOutput/i
      )
    ).toBeInTheDocument();
  });
});
