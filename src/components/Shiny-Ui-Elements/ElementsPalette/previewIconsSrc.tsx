import containerIcon from "assets/icons/shinyContainer.png";
import gridIcon from "assets/icons/shinyDatatable.png";
import plotIcon from "assets/icons/shinyPlot.png";
import sliderIcon from "assets/icons/shinySlider.png";
import textIcon from "assets/icons/shinyText.png";
import { ShinyUiNames } from "components/Shiny-Ui-Elements/uiNodeTypes";

export const previewIconsSrc: Record<ShinyUiNames, string> = {
  "shiny::plotOutput": plotIcon,
  "shiny::sliderInput": sliderIcon,
  "gridlayout::title_panel": textIcon,
  "gridlayout::grid_panel": containerIcon,
  "gridlayout::grid_page": gridIcon,
};
