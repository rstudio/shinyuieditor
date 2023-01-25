import * as React from "react";

import type { CallBackProps, Step, Styles } from "react-joyride";
import Joyride, { ACTIONS, EVENTS } from "react-joyride";

import PngIcon from "../components/Icons";
import Button from "../components/Inputs/Button/Button";

import { AppPreviewAbout } from "./AppPreviewAbout";
import { AppViewAbout } from "./AppViewAbout";
import { ElementsPanelAbout } from "./ElementsPanelAbout";
import { PropertiesPanelAbout } from "./PropertiesPanelAbout";

const joyrideSteps: Step[] = [
  {
    target: ".app-view",
    content: AppViewAbout,
    disableBeacon: true,
  },
  {
    target: ".elements-panel",
    content: ElementsPanelAbout,
    placement: "right-start",
    disableBeacon: true,
  },
  {
    target: ".properties-panel",
    content: PropertiesPanelAbout,
    placement: "left-start",
  },
  {
    target: ".app-preview",
    content: AppPreviewAbout,
    placement: "top-start",
  },
  {
    target: ".undo-redo-buttons",
    content:
      "Mess something up? You can use the change history to undo or redo your changes",
    placement: "bottom",
  },
];

export function AppTour() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [run, setRun] = React.useState(false);

  const handleJoyrideCallback: (data: CallBackProps) => void =
    React.useCallback((data) => {
      const { action, index, type } = data;
      // console.log(data); //eslint-disable-line no-console

      if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
        if (action === ACTIONS.NEXT) {
          setStepIndex(index + 1);
        } else if (action === ACTIONS.PREV) {
          setStepIndex(index - 1);
        } else if (action === ACTIONS.CLOSE) {
          setRun(false);
        }
      }

      if (type === EVENTS.TOUR_END) {
        if (action === ACTIONS.NEXT) {
          setRun(false);
          setStepIndex(0);
        }
        if (action === ACTIONS.SKIP) {
          setRun(false);
        }
      }
    }, []);

  const startTour = React.useCallback(() => {
    setRun(true);
  }, []);

  return (
    <>
      <Button
        onClick={startTour}
        title="Take a guided tour of app"
        variant="transparent"
      >
        <PngIcon id="tour" size="24px" />
        Tour App
      </Button>
      <Joyride
        callback={handleJoyrideCallback}
        steps={joyrideSteps}
        stepIndex={stepIndex}
        run={run}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        disableScrolling={true}
        locale={{
          next: "Next",
          back: "Back",
          close: "Close",
          last: "Let's go!",
          open: "Open the dialog",
          skip: "Skip tour",
        }}
        styles={joyrideStyles}
      />
    </>
  );
}

const beaconColorBase = `#e07189`;
const beaconColorLight = `#f6d5dc`;

const joyrideStyles: Styles = {
  options: {
    arrowColor: "var(--rstudio-white, white)",
    backgroundColor: "var(--rstudio-white, white)",
    primaryColor: "var(--rstudio-blue, steelblue)",
    textColor: "var(--rstudio-grey, black)",
  },
  beaconInner: {
    backgroundColor: beaconColorBase,
  },
  beaconOuter: {
    backgroundColor: beaconColorLight,
    border: `2px solid ${beaconColorBase}`,
  },
};
