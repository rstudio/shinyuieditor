import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * An app with a node that spits errors for testing error catching.
 */
export const errorTestingTree = {
  id: "gridlayout::grid_page",
  uiArguments: {
    layout: ["A"],
    gap_size: "1rem",
    col_sizes: ["1fr"],
    row_sizes: ["1fr"],
  },
  uiChildren: [
    {
      id: "gridlayout::grid_card",
      uiArguments: {
        area: "A",
      },
      uiChildren: [
        {
          id: "bslib::card_body_fill",
          uiArguments: {},
          uiChildren: [
            {
              id: "TESTING::error_node",
              uiArguments: { error_msg: "Uh oh" },
            },
          ],
        },
      ],
    },
  ],
}  satisfies KnownShinyUiNode;
