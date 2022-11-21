import clone from "just-clone";

import type { TractDirection } from "../../Shiny-Ui-Elements/GridlayoutGridPage";
import addItem from "../../utils/gridTemplates/addItem";
import addTract from "../../utils/gridTemplates/addTract";
import { removeItem, removeItems } from "../../utils/gridTemplates/removeItem";
import removeTract from "../../utils/gridTemplates/removeTract";
import { renameItem } from "../../utils/gridTemplates/renameItem";
import resizeTract from "../../utils/gridTemplates/resizeTract";
import swapItems from "../../utils/gridTemplates/swapItems";
import type { GridItemExtent } from "../../utils/gridTemplates/types";
import type { TemplatedGridProps } from "../Grids/EditableGridContainer/TemplatedGridProps";
import type { CSSMeasure } from "../Inputs/CSSUnitInput/CSSMeasure";

import type { GridLayoutArgs } from "./GridLayoutArgs";
import {
  convertGridlayoutArgsToTemplatedLayout,
  convertTemplatedLayoutToGridlayoutArgs,
} from "./layoutParsing";

export type GridLayoutAction =
  | { type: "ADD_ITEM"; name: string; pos: GridItemExtent }
  | { type: "REMOVE_ITEM"; name: string }
  | { type: "RENAME_ITEM"; oldName: string; newName: string }
  | { type: "REMOVE_ITEMS"; names: string[] }
  | { type: "SWAP_ITEMS"; item_a: string; item_b: string }
  | { type: "MOVE_ITEM"; name: string; pos: GridItemExtent }
  | {
      type: "ADD_TRACT";
      dir: TractDirection;
      afterIndex: number;
      size: CSSMeasure;
    }
  | {
      type: "REMOVE_TRACT";
      dir: TractDirection;
      index: number;
    }
  | {
      type: "RESIZE_TRACT";
      dir: TractDirection;
      index: number;
      size: CSSMeasure;
    }
  | {
      type: "SET_GAP";
      size: CSSMeasure;
    };

export function gridLayoutReducer(
  layout: GridLayoutArgs,
  action: GridLayoutAction
): GridLayoutArgs {
  const layoutToUpdate = convertGridlayoutArgsToTemplatedLayout(layout);

  return convertTemplatedLayoutToGridlayoutArgs(
    gridLayoutTemplateReducer(layoutToUpdate, action)
  );
}

function gridLayoutTemplateReducer(
  layout: TemplatedGridProps,
  action: GridLayoutAction
): TemplatedGridProps {
  const layoutToUpdate = layout;

  switch (action.type) {
    case "ADD_ITEM":
    // eslint-disable-next-line no-fallthrough
    case "MOVE_ITEM":
      return addItem(layoutToUpdate, { name: action.name, ...action.pos });

    case "RENAME_ITEM":
      return renameItem(layoutToUpdate, action.oldName, action.newName);

    case "REMOVE_ITEM":
      return removeItem(layoutToUpdate, action.name);

    case "REMOVE_ITEMS":
      return removeItems(layoutToUpdate, action.names);

    case "SWAP_ITEMS":
      return swapItems(layoutToUpdate, action);

    case "ADD_TRACT":
      return addTract(layoutToUpdate, action);

    case "REMOVE_TRACT":
      return removeTract(layoutToUpdate, action);

    case "RESIZE_TRACT":
      return resizeTract(
        layoutToUpdate,
        { dir: action.dir, index: action.index },
        action.size
      );

    case "SET_GAP":
      return { ...clone(layoutToUpdate), gap_size: action.size };

    default:
      // eslint-disable-next-line no-console
      console.error(action);
      throw new Error("Have yet to implement layout action type");
  }
}
