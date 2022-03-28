import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type {
  NodePath,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import type { PlaceNodeArguments } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/placeNode";
import { placeNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/placeNode";
import { removeNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/removeNode";
import { updateNode } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/updateNode";

const initialState: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [
      ["header", "header"],
      ["sidebar", "plot"],
      ["sidebar", "plot"],
    ],
    rowSizes: ["100px", "1fr", "1fr"],
    colSizes: ["250px", "1fr"],
    gapSize: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        area: "header",
        title: "My App",
      },
    },
    {
      uiName: "gridlayout::vertical_stack_panel",
      uiArguments: {
        area: "sidebar",
        item_alignment: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider1",
            label: "Slider 1",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          uiName: "shiny::sliderInput",
          uiArguments: {
            inputId: "mySlider2",
            label: "Slider 2",
            min: 1,
            max: 10,
            value: 3,
          },
        },
      ],
    },
    {
      uiName: "gridlayout::vertical_stack_panel",
      uiArguments: {
        area: "plot",
        item_alignment: "center",
      },
      uiChildren: [
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
      ],
    },
  ],
};

// Note: Currently we're using Immer already so it's double immering this stuff
// which is not efficient.
export const uiTreeSlice = createSlice({
  name: "uiTree",
  initialState: initialState as ShinyUiNode,
  reducers: {
    UPDATE_NODE: (
      tree,
      action: PayloadAction<{ path: NodePath; newNode: ShinyUiNode }>
    ) =>
      updateNode(tree, {
        path: action.payload.path,
        node: action.payload.newNode,
      }),
    ADD_NODE: (tree, action: PayloadAction<PlaceNodeArguments>) =>
      placeNode(tree, action.payload),
    DELETE_NODE: (tree, action: PayloadAction<{ path: NodePath }>) =>
      removeNode(tree, {
        path: action.payload.path,
      }),
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_NODE, ADD_NODE, DELETE_NODE } = uiTreeSlice.actions;

export default uiTreeSlice.reducer;
