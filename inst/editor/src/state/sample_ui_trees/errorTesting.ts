import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * An app with a node that spits errors for testing error catching.
 */
export const errorTestingTree = {
  id: "gridlayout::grid_page",
  namedArgs: {
    layout: ["A"],
    gap_size: "1rem",
    col_sizes: ["1fr"],
    row_sizes: ["1fr"],
  },
  children: [
    {
      id: "gridlayout::grid_card",
      namedArgs: {
        area: "A",
      },
      children: [
        {
          id: "bslib::card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "TESTING::error_node",
              namedArgs: { error_msg: "Uh oh" },
            },
          ],
        },
      ],
    },
  ],
}  satisfies KnownShinyUiNode;
