import { TrashcanIcon } from "../icons";
import classes from "./style.module.css";

export const ItemListItem = ({
  name,
  isDeletable,
}: {
  name: string;
  isDeletable?: boolean;
}) => {
  return (
    <div class={classes.item + (isDeletable ? " " + classes.isDeletable : "")}>
      <span style={{ justifySelf: "start" }}>{name}</span>
      {isDeletable ? <TrashcanIcon /> : null}
    </div>
  );
};
