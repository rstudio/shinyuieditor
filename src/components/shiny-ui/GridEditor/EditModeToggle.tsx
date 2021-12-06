import styled from "@emotion/styled";
import React from "react";
import { EditMode } from "./index";

export function EditModeToggle({ selected, onSelect }: { selected: EditMode; onSelect: (selection: EditMode) => void; }) {
    return <Container className={selected === "UI" ? "left-selected" : "right-selected"}>
        <button name="UI" className="left" onClick={() => onSelect("UI")}>UI</button>
        <button name="Layout" className="right" onClick={() => onSelect("Layout")}>Layout</button>
    </Container>;
}
const Container = styled.div({
    "--roundness": "8px",
    "--w": "70px",
    "--h": "40px",
    "--bar-transform": "var(--roundness)",
    "--color-bar": "var(--rstudio-blue, forestgreen)",
    "--color-selected": "var(--rstudio-blue, forestgreen)",
    "--color-selected-text": "var(--rstudio-white, blue)",
    "--color-border": "var(--light-grey, red)",
    "position": "relative",
    width: "calc(2*var(--w))",
    height: "var(--h)",
    "& > button": {
        padding: "5px 10px",
        width: "var(--w)",
        transition: "borderColor borderWidth 0.2s ease-in",
        backgroundColor: "var(--light-grey)",
        color: "#303030",
    },
    "& > button.left": {
        borderTopLeftRadius: "var(--roundness)",
        borderBottomLeftRadius: "var(--roundness)",
    },
    "&.left-selected > button.left": {
        backgroundColor: "var(--color-selected)",
        color: "var(--color-selected-text)",
    },
    "&.right-selected > button.right": {
        backgroundColor: "var(--color-selected)",
        color: "var(--color-selected-text)",
    },
    "& > button.right": {
        borderTopRightRadius: "var(--roundness)",
        borderBottomRightRadius: "var(--roundness)",
    },
    "&.right-selected": {
        "--bar-transform": "var(--w)",
    },
    "&::after": {
        content: `""`,
        position: "absolute",
        bottom: "2px",
        height: "3px",
        left: 0,
        transform: "translateX(var(--bar-transform))",
        width: "calc(var(--w) - var(--roundness))",
        backgroundColor: "var(--color-bar)",
        transition: "transform 0.1s ease-in",
    },
});
