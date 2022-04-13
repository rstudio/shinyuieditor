import React from "react";

import ListInputOriginal from ".";

import type { NamedList } from "./NamedListInput";
import NamedListInputOriginal from "./NamedListInput";
export const ListInput = () => {
  const [list, setList] = React.useState<string[] | undefined>(["a", "b", "c"]);
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      <ListInputOriginal
        name="MyListInput"
        value={list}
        onChange={({ value }) => setList(value)}
      />
      <div>
        <h2>List Values</h2>
        <ol>
          {list?.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export const NamedListInput = () => {
  const [list, setList] = React.useState<NamedList | undefined>({
    a: "item 1",
    b: "item 2",
    c: "item 3",
  });

  console.log("List", list);
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      <NamedListInputOriginal
        name="MyListInput"
        value={list}
        onChange={({ value }) => setList(value)}
      />
      <div>
        <h2>List Values</h2>
        <ol>
          {list
            ? Object.keys(list).map((key) => (
                <li key={key}>
                  {key}:{list[key]}
                </li>
              ))
            : null}
        </ol>
      </div>
    </div>
  );
};
