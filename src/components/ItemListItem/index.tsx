import { useLayoutDispatch } from "../../layout-updating-logic";
import { TrashcanIcon } from "../icons";
import classes from "./style.module.css";

export const ItemListItem = ({
  name,
  isDeletable,
}: {
  name: string;
  isDeletable?: boolean;
}) => {
  const layoutDispatch = useLayoutDispatch();

  return (
    <div class={classes.item + (isDeletable ? " " + classes.isDeletable : "")}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      {isDeletable ? (
        <button
          onClick={() => {
            layoutDispatch({ type: "Delete-Item", name });
          }}
          title={`Delete ${name} item`}
        >
          <TrashcanIcon />
        </button>
      ) : null}
    </div>
  );
};
