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
const testTitle = "My Test App Title";

const originalError = console.error;
beforeEach(() => {
  // Use a mock to clean up the console output
  console.error = jest.fn();
});
afterEach(() => {
  console.error = originalError;
});

describe("Updating settings is reflected in entire app", () => {
  test("Full basic app", () => {
    const onUpdateMock = jest.fn();
    // const onUpdateMock = console.log;

    const startingState = {
      title: {
        uiName: "titlePanel",
        uiArguments: { title: testTitle },
      },
      numBins: {
        uiName: "sliderInput",
        uiArguments: { name: "My slider!" } as ShinySliderInputProps,
      },
      plot: {
        uiName: "plotOutput",
        uiArguments: { name: "My Plot!" },
      },
    };
    render(
      <GridApp
        layout={mainLayout}
        panels={startingState as React.ComponentProps<typeof GridApp>["panels"]}
        onNewState={onUpdateMock}
      />
    );

    const numBinsPanel = screen.getByLabelText(/numBins panel/i);
    const openSettingsButton =
      within(numBinsPanel).getByLabelText(/open settings/i);
    const settingsDialog = within(numBinsPanel).getByLabelText(
      /settings for sliderInput/i
    );
    // The thing that gets the visibility attribute changed is actually the
    // parent of the popover body due to how Chakra structures the dom
    const popoverHolder = settingsDialog.parentElement;

    expect(onUpdateMock).toHaveBeenCalledWith(startingState);

    expect(popoverHolder).not.toBeVisible();
    userEvent.click(openSettingsButton);
    expect(popoverHolder).toBeVisible();

    const newProps = {
      min: 7,
      max: 88,
      val: 42,
      name: "My Updated Slider",
    };

    clearThenType(
      within(settingsDialog).getByLabelText(/minimum value/i),
      newProps.min
    );
    // screen.debug(settingsDialog);
    // console.log(settingsDialog);

    clearThenType(
      within(settingsDialog).getByLabelText(/maximum value/i),
      newProps.max
    );
    // clearThenType(
    //   within(settingsDialog).getByLabelText(/starting value/i),
    //   newProps.val
    // );
    // clearThenType(
    //   within(settingsDialog).getByLabelText(/slider name/i),
    //   newProps.name
    // );
    // userEvent.click(within(numBinsPanel).getByText(/update/i));

    // expect(popoverHolder).not.toBeVisible();

    // startingState.numBins.settings = newProps;
    // expect(onUpdateMock).toHaveBeenLastCalledWith(startingState);
  });
});
