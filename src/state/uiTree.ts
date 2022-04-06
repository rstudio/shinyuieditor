import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import type { PlaceNodeArguments } from "components/UiNode/TreeManipulation/placeNode";
import { placeNodeMutating } from "components/UiNode/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "components/UiNode/TreeManipulation/removeNode";
import { removeNodeMutating } from "components/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "components/UiNode/TreeManipulation/updateNode";
import { updateNodeMutating } from "components/UiNode/TreeManipulation/updateNode";

export const initialUiTree: ShinyUiNode = {
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

// Note: The reducer callbacks use immer so the mutations we make to the object
// are safe and we just make the needed mutations to the tree object and don't
// return anything
export const uiTreeSlice = createSlice({
  name: "uiTree",
  initialState: initialUiTree as ShinyUiNode,
  reducers: {
    INIT_STATE: (tree, action: PayloadAction<{ initialState: ShinyUiNode }>) =>
      action.payload.initialState,
    UPDATE_NODE: (tree, action: PayloadAction<UpdateNodeArguments>) => {
      updateNodeMutating(tree, action.payload);
    },
    PLACE_NODE: (tree, action: PayloadAction<PlaceNodeArguments>) => {
      placeNodeMutating(tree, action.payload);
    },
    DELETE_NODE: (tree, action: PayloadAction<RemoveNodeArguments>) => {
      removeNodeMutating(tree, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_NODE, PLACE_NODE, DELETE_NODE, INIT_STATE } =
  uiTreeSlice.actions;

export type UpdateAction = (
  tree: ShinyUiNode,
  payload: UpdateNodeArguments
) => void;
export type DeleteAction = (
  tree: ShinyUiNode,
  payload: RemoveNodeArguments
) => void;

export default uiTreeSlice.reducer;
