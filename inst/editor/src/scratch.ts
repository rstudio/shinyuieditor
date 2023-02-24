import { type } from "@testing-library/user-event/dist/types/setup/api";

import type { CSSMeasure } from "./components/Inputs/CSSUnitInput/CSSMeasure";
import type { DefaultSettingsFromInfo } from "./components/Inputs/SettingsFormBuilder/buildStaticSettingsInfo";
import type {
  DynamicFieldInfo,
  InputFieldEntryMap,
  KnownInputFieldTypes,
  SettingsTypeToInfo,
} from "./components/Inputs/SettingsFormBuilder/inputFieldTypes";
import type { NonOptionalKeys, OptionalKeys } from "./utils/TypescriptUtils";

const fn_name = "grid_page";

const full_ui_names = [
  "shiny::actionButton",
  "shiny::numericInput",
  "shiny::sliderInput",
  "shiny::textInput",
  "shiny::checkboxInput",
  "shiny::checkboxGroupInput",
  "shiny::selectInput",
  "shiny::radioButtons",
  "shiny::plotOutput",
  "shiny::textOutput",
  "shiny::uiOutput",
  "shiny::navbarPage",
  "shiny::tabPanel",
  "shiny::tabsetPanel",
  "gridlayout::grid_page",
  "gridlayout::grid_card",
  "gridlayout::grid_card_text",
  "gridlayout::grid_card_plot",
  "gridlayout::grid_container",
  "DT::DTOutput",
  "plotly::plotlyOutput",
  "unknownUiFunction",
];

// Just to avoid errors
export {};
