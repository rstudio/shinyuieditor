import { Panels } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import { TemplatedGridProps } from "utils/gridTemplates/types";

export type InitialState = {
  elements: Panels;
  layout: { type: "gridlayout"; options: TemplatedGridProps };
};
export async function getInitialState(): Promise<InitialState> {
  const response = await fetch("app-please", { method: "GET" });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return backupState;
  }

  return await response.json();
}
const backupState: InitialState = {
  layout: {
    type: "gridlayout",
    options: {
      rowSizes: ["120px", "1fr", "100px"],
      colSizes: ["250px", "1fr"],
      gapSize: "2rem",
      areas: [
        ["header", "header"],
        ["sidebar", "plot"],
        ["footer", "footer"],
      ],
    },
  },
  elements: {
    header: {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        title: "Header from backup state",
      },
    },
    plot: {
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "distPlot",
      },
    },
    sidebar: {
      uiName: "shiny::sliderInput",
      uiArguments: {
        inputId: "numBins",
        label: "Number of Bins",
        min: 5,
        max: 10,
        value: 7,
      },
    },
    footer: {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        title: "My app's footer",
      },
    },
  },
};
