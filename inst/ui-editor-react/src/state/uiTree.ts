import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { ShinyUiNode } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";
import type { PlaceNodeArguments } from "components/UiNode/TreeManipulation/placeNode";
import { placeNodeMutating } from "components/UiNode/TreeManipulation/placeNode";
import type { RemoveNodeArguments } from "components/UiNode/TreeManipulation/removeNode";
import { removeNodeMutating } from "components/UiNode/TreeManipulation/removeNode";
import type { UpdateNodeArguments } from "components/UiNode/TreeManipulation/updateNode";
import { updateNodeMutating } from "components/UiNode/TreeManipulation/updateNode";
import { subtractElements } from "utils/array-helpers";

export const initialUiTree: ShinyUiNode = {
  uiName: "gridlayout::grid_page",
  uiArguments: {
    areas: [["msg"]],
    rowSizes: ["1fr"],
    colSizes: ["1fr"],
    gapSize: "1rem",
  },
  uiChildren: [
    {
      uiName: "gridlayout::text_panel",
      uiArguments: {
        area: "msg",
        content: "Loading App...",
        h_align: "center",
      },
    },
  ],
};

// Ui Tree used if there's no backend connection
export const backupUiTree: ShinyUiNode = {
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
      uiName: "gridlayout::text_panel",
      uiArguments: {
        area: "header",
        content: "My App",
        h_align: "start",
        is_title: true,
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
    // This is used to teleport to a given state wholesale. E.g. undo-redo
    SET_FULL_STATE: (tree, action: PayloadAction<{ state: ShinyUiNode }>) =>
      action.payload.state,
    // This will initialize a state while also making sure the arguments match
    // what we expect in the app
    INIT_STATE: (tree, action: PayloadAction<{ initialState: ShinyUiNode }>) =>
      fillInDefaultValues(action.payload.initialState),
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

/**
 *
 * @param uiTree Shiny Ui Tree
 * @returns The ui tree modified by adding default values of any ommitted
 * properties with default values.
 *
 * It's not terribly clear if this is a good idea or not as it will immediately
 * mess with the user's code but will eliminate confusion when the settings
 * options controls don't actually match the presented values
 */
function fillInDefaultValues(uiTree: ShinyUiNode): ShinyUiNode {
  const { uiName, uiArguments, uiChildren } = uiTree;

  const defaultSettingsForNode = shinyUiNodeInfo[uiName].defaultSettings;

  const newUiArguments = { ...defaultSettingsForNode, ...uiArguments };

  const addedSettings = subtractElements(
    Object.keys(newUiArguments),
    Object.keys(uiArguments)
  );
  if (addedSettings.length > 0) {
    console.log(
      "Filled in missing arguments for node " + uiTree.uiName,
      addedSettings
    );
  }

  const newUiChildren = uiChildren
    ? uiChildren.map((childNode) => fillInDefaultValues(childNode))
    : undefined;

  return {
    uiName,
    uiArguments: newUiArguments,
    uiChildren: newUiChildren,
  } as ShinyUiNode;
}

// Action creators are generated for each case reducer function
export const {
  UPDATE_NODE,
  PLACE_NODE,
  DELETE_NODE,
  INIT_STATE,
  SET_FULL_STATE,
} = uiTreeSlice.actions;

export type UpdateAction = (
  tree: ShinyUiNode,
  payload: UpdateNodeArguments
) => void;
export type DeleteAction = (
  tree: ShinyUiNode,
  payload: RemoveNodeArguments
) => void;

export default uiTreeSlice.reducer;
