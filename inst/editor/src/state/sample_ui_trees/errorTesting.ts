import type { KnownShinyUiNode } from "../../Shiny-Ui-Elements/uiNodeTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

/**
 * An app with a node that spits errors for testing error catching.
 */
export const errorTestingTree = {
  id: "grid_page",
  namedArgs: {
    layout: ["A"],
    gap_size: "1rem",
    col_sizes: ["1fr"],
    row_sizes: ["1fr"],
  },
  children: [
    {
      id: "grid_card",
      namedArgs: {
        area: "A",
      },
      children: [
        {
          id: "card_body_fill",
          namedArgs: {},
          children: [
            {
              id: "error_node",
              namedArgs: { error_msg: "Uh oh" },
            },
          ],
        },
      ],
    },
  ],
}  satisfies KnownShinyUiNode;
