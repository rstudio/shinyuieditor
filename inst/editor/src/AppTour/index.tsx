import * as React from "react";

import type { CallBackProps, Step, Styles } from "react-joyride";
import Joyride, { ACTIONS, EVENTS } from "react-joyride";

import PngIcon from "../components/Icons";
import Button from "../components/Inputs/Button/Button";
import styles from "../DragAndDropHelpers/DropWatcherPanel.module.css";
import { useMetaData } from "../state/metaData";
import { mergeClasses } from "../utils/mergeClasses";

export function AppTour() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [run, setRun] = React.useState(false);

  const metaData = useMetaData();
  const appPreview = metaData === null ? false : metaData.app_preview;

  const handleJoyrideCallback: (data: CallBackProps) => void = (data) => {
    const { action, index, type } = data;
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
  };

  const startTour = () => {
    setRun(true);
  };

  const joyrideSteps: Step[] = React.useMemo(
    () => [
      {
        target: "[aria-label='App Skeleton']",
        disableBeacon: true,
        content: (
          <div>
            <p>
              The app view shows a skeleton view of the current state of your
              app's UI.
            </p>
            <p>
              You can click on elements to select them or drag them around to
              move them.
            </p>
            <p>Cards can be resized by dragging resize handles on the sides.</p>
            <p>
              Rows and Columns can be resized by dragging between tracts and
              added by hovering over the left and top respectively to reveal the
              tract controls widget.
            </p>

            <p>
              <a href="https://rstudio.github.io/shinyuieditor/articles/how-to.html#show-size-widget">
                More info
              </a>
            </p>
          </div>
        ),
      },
      {
        target: "[aria-label='Elements Panel']",
        content: (
          <div>
            <p>
              Drag elements from the elements palette into the app pane on the
              right to add them to your app.
            </p>
            <p>
              In the app view, the areas available for the element to be dropped
              in will pulse orange:{" "}
              <span
                className={mergeClasses(
                  styles.can_accept_drop,
                  "text-transparent"
                )}
                // Ignore for screen readers
                aria-hidden="true"
                style={{ padding: "2px" }}
              >
                drop
              </span>
              .
            </p>
          </div>
        ),
        placement: "right-start",
        disableBeacon: true,
      },
      {
        target: "[aria-label='Properties panel']",

        content: (
          <div>
            <p>
              After selecting an element in your app, you can adjust the
              settings for that element in the properties pane.
            </p>
            <p>
              Changes made will be automatically applied to your element both in
              the app view and your code so there's no need to save or submit
              these changes.
            </p>
          </div>
        ),
        placement: "left-start",
      },
      {
        target: "[aria-label='App Preview']",
        content: appPreview ? (
          <div>
            <p>
              At any point while editing your application you can see the code
              to recreate the current app.
            </p>
            <p>
              Simply copy and paste the code into your editor of choice to get
              going with your app.
            </p>
          </div>
        ) : (
          <div>
            <p>
              You can see how the changes impact your app with the app preview.
            </p>
            <p>
              Click in the center of the preview to expand it to full screen to
              get a better view of your app.
            </p>

            <p>
              Any log messages from the app will be placed into the "App Logs"
              drawer.
            </p>
          </div>
        ),
        placement: "top-start",
      },
      {
        target: "[aria-label='Undo/Redo buttons']",
        content:
          "Mess something up? You can use the change history to undo or redo your changes",
        placement: "bottom",
      },
    ],
    [appPreview]
  );

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
  tooltipContainer: {
    textAlign: "left",
  },
};
