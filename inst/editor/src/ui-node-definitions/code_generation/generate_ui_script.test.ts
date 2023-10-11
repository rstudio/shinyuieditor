import type { KnownShinyUiNode } from "../uiNodeTypes";

import { generateUiScript } from "./generate_ui_script";
const starting_script: string = `
<PACKAGES>

ui <-  <UI>

server <- function(input, output) {
}

shinyApp(ui, server)
`;

describe("Can add needed libraries to script", () => {
  const app_with_DT: KnownShinyUiNode = {
    id: "navbarPage",
    namedArgs: {
      title: "My Navbar Page",
      collapsible: false,
    },
    children: [
      {
        id: "nav_panel",
        namedArgs: {
          title: "Plot 1",
        },
        children: [
          {
            id: "DTOutput",
            namedArgs: {
              outputId: " myTable",
            },
          },
        ],
      },
    ],
  };

  test("Can insert to blank template", () => {
    const generated_app = generateUiScript({
      ui_tree: app_with_DT,
      language: "R",
      packages: [],
      code: "",
    });

    // Expect the line library(DT) to be in the generated app
    expect(generated_app).toContain("library(DT)");
  });

  test("Can insert to existing template", () => {
    const generated_app = generateUiScript({
      ui_tree: app_with_DT,
      language: "R",
      packages: ["shiny", "bslib"],
      code: starting_script,
    });

    // Expect the line library(DT) to be in the generated app
    expect(generated_app).toContain("library(DT)");
  });
});
