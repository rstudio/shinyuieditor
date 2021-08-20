import { memo } from "preact/compat";
import { LayoutDispatch } from "../../state-logic/layout-updating-logic";
import { GridLayoutTemplate } from "../../types";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

// Not totally sure why this memo works because items is an array that should
// get replaced each state update.
export const EditorItemsListView = memo(
  ({
    items,
    layoutDispatch,
  }: {
    items: GridLayoutTemplate["items"];
    layoutDispatch: LayoutDispatch;
  }) => (
    <GridCard title="Items" icon={"items"} gridArea="items">
      {items.map(({ name }) => (
        <ItemListItem key={name} name={name} layoutDispatch={layoutDispatch} />
      ))}
    </GridCard>
  )
);

const ItemListItem = memo(
  ({
    name,
    layoutDispatch,
  }: {
    name: string;
    layoutDispatch?: LayoutDispatch;
  }) => {
    return (
      <div
        className={
          classes.item + (layoutDispatch ? " " + classes.isDeletable : "")
        }
      >
        <span style={{ justifySelf: "start" }}>{name}</span>
        {layoutDispatch ? (
          <button
            onClick={() => layoutDispatch({ type: "Delete-Item", name })}
            title={`Delete ${name} item`}
          >
            <SvgIcon name={"trashcan"} />
          </button>
        ) : null}
      </div>
    );
  }
);
