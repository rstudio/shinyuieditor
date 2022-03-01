import containerIcon from "assets/icons/shinyContainer.png";
import gridIcon from "assets/icons/shinyDatatable.png";
import plotIcon from "assets/icons/shinyPlot.png";
import sliderIcon from "assets/icons/shinySlider.png";
import textIcon from "assets/icons/shinyText.png";
import { ShinyUiNames } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

const elementIcons: Record<ShinyUiNames, { iconSrc: string; title: string }> = {
  "shiny::plotOutput": { iconSrc: plotIcon, title: "Plot" },
  "shiny::sliderInput": { iconSrc: sliderIcon, title: "Slider Input" },
  "gridlayout::title_panel": { iconSrc: textIcon, title: "Title Panel" },
  "gridlayout::grid_panel": { iconSrc: containerIcon, title: "Grid Panel" },
  "gridlayout::vertical_stack_panel": {
    iconSrc: containerIcon,
    title: "Vertical Stack Panel",
  },
  "gridlayout::grid_page": { iconSrc: gridIcon, title: "Grid Page" },
};
export default elementIcons;
