import styled from "@emotion/styled";
import React from "react";
import { EditMode } from "../GridApp";

export function EditModeToggle({
  selected,
  onSelect,
}: {
  selected: EditMode;
  onSelect: (selection: EditMode) => void;
}) {
  return (
    <Container>
      <div className="label">Edit Mode:</div>
      <ButtonsHolder
        className={selected === "UI" ? "left-selected" : "right-selected"}
      >
        <button value="UI" className="left" onClick={() => onSelect("UI")}>
          UI
        </button>
        <button
          value="Layout"
          className="right"
          onClick={() => onSelect("Layout")}
        >
          Layout
        </button>
      </ButtonsHolder>
    </Container>
  );
}

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "3px",
  ".label": { fontWeight: 300 },
});

const ButtonsHolder = styled.div({
  "--roundness": "3px",
  "--w": "70px",
  "--h": "35px",
  "--bar-transform": "var(--roundness)",
  "--color-bar": "var(--rstudio-blue, forestgreen)",
  "--color-selected": "var(--rstudio-blue, forestgreen)",
  "--color-selected-text": "var(--rstudio-white, blue)",
  "--color-border": "var(--light-grey, red)",
  position: "relative",
  width: "calc(2*var(--w))",
  height: "var(--h)",
  "& > button": {
    padding: "5px 10px",
    width: "var(--w)",
    height: "var(--h)",
    transition: "borderColor borderWidth 0.2s ease-in",
    backgroundColor: "var(--light-grey)",
    color: "#303030",
  },
  "& > button.left": {
    borderTopLeftRadius: "var(--roundness)",
    borderBottomLeftRadius: "var(--roundness)",
  },
  "& > button.right": {
    borderTopRightRadius: "var(--roundness)",
    borderBottomRightRadius: "var(--roundness)",
  },
  "&.left-selected > button.left": {
    backgroundColor: "var(--color-selected)",
    color: "var(--color-selected-text)",
  },
  "&.right-selected > button.right": {
    backgroundColor: "var(--color-selected)",
    color: "var(--color-selected-text)",
  },
  "&.right-selected": {
    "--bar-transform": "var(--w)",
  },
  "&::after": {
    content: `""`,
    position: "absolute",
    bottom: "-4px",
    height: "3px",
    left: 0,
    transform: "translateX(var(--bar-transform))",
    width: "calc(var(--w) - var(--roundness))",
    backgroundColor: "var(--color-bar)",
    transition: "transform 0.1s ease-in",
  },
});
