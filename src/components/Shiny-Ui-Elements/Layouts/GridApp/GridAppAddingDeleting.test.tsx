import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShinySliderInputProps } from "components/Shiny-Ui-Elements/Elements/ShinySliderInput/arguments";
import { clearThenType } from "test-helpers";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import GridApp from ".";

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
    uiName: "gridlayout__titlePanel",
    uiArguments: { title: "My Test App Title" },
  },
  numBins: {
    uiName: "shiny__sliderInput",
    uiArguments: { inputId: "My slider!" } as ShinySliderInputProps,
  },
  plot: {
    uiName: "shiny__plotOutput",
    uiArguments: { name: "My Plot!" },
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
    userEvent.click(screen.getByLabelText(/Add new item at row 2 column 1/i));

    const configurePanel = screen.getByLabelText(/configure new ui element/i);

    userEvent.type(
      within(configurePanel).getByLabelText(/grid area name/i),
      "sidebar"
    );
    userEvent.click(within(configurePanel).getByText(/shiny__plotOutput/i));

    clearThenType(
      within(configurePanel).getByLabelText(/plot name/i),
      "second-plot"
    );

    userEvent.click(within(configurePanel).getByText(/add item/i));

    expect(
      screen.getByText("second-plot", { exact: false })
    ).toBeInTheDocument();
  });
});
