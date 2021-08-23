import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { LayoutDispatch } from "../../state-logic/layout-updating-logic";
import { GridLayoutTemplate } from "../../types";
import { GridCard } from "../GridCard";
import { SvgIcon } from "../Icons";
import classes from "./style.module.css";

// Not totally sure why this memo works because items is an array that should
// get replaced each state update.

let EditorItemsListView: FunctionalComponent<{
  items: GridLayoutTemplate["items"];
  layoutDispatch: LayoutDispatch;
}> = ({ items, layoutDispatch }) => (
  <GridCard title="Items" icon={"items"} gridArea="items">
    {items.map(({ name }) => (
      <ItemListItem key={name} name={name} layoutDispatch={layoutDispatch} />
    ))}
  </GridCard>
);
EditorItemsListView.displayName = "EditorItemsListView";
EditorItemsListView = memo(EditorItemsListView);

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

export { EditorItemsListView };
