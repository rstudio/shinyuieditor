import * as React from "react";

import Joyride from "react-joyride";
import type { Step, Styles } from "react-joyride";

export const joyrideSteps: Step[] = [
  {
    target: ".elements-panel",
    content:
      "Drag elements from here into the app pane on the right to add them to your app",
    placementBeacon: "right",
    placement: "right-start",
  },
  {
    target: ".properties-panel",
    content:
      "After selecting an element in your app, the settings for that element will appear here",
    placement: "left-start",
  },
];
export function AppTour() {
  return (
    <Joyride
      steps={joyrideSteps}
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
  );
}

const beaconColorBase = `#e07189;`;
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
