/** @jsxImportSource @emotion/react */
import { IconButton } from "@chakra-ui/button";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";
import { IconType } from "react-icons";
import { BiMove } from "react-icons/bi";
import {
  BsArrowDown,
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsArrowUpLeft,
  BsArrowUpRight,
} from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  selectedItemNameState,
  selectedItemState,
  useDeleteItem,
} from "state-logic/gridItems";
import { useDragToMove } from "state-logic/itemDragToMove";
import { useDragToResize } from "state-logic/itemDragToResize";
import { placeItemOnGrid } from "utils/placeItemOnGrid";
import { DragDir, GridItemDef } from "../GridTypes";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import { selectedUiElement, uiElementAtoms } from "state-logic/uiElements";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/popover";
import { uiComponentAndSettings } from "./shiny-ui/UiPanel";
import {
  ShinyUiNameAndProps,
  ShinyUiSettingsComponent,
} from "./shiny-ui/componentTypes";

export function SelectedItemOverlay() {
  const resetSelection = useResetRecoilState(selectedItemNameState);
  const selectedItem = useRecoilValue(selectedItemState);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const startDrag = useDragToResize(itemRef);

  const { startMoving } = useDragToMove();

  // The reason that we have a separate div for triggering the resetting of the
  // selected item is because if the click event was listening on the main div
  // it's really hard to differentiate between the drag events and the click to
  // close events, whereas the mouse-down on a drag handle wont trigger a click
  // event on the cancelBox div behind it.

  if (selectedItem === null) return null;

  const beingDragged = typeof selectedItem.absoluteBounds !== "undefined";
  return (
    <div
      ref={itemRef}
      css={overlayStyles}
      style={placeItemOnGrid(selectedItem)}
    >
      {dirToDragger.map(({ dir, DragIcon, label, styles }) => (
        <IconHolder
          key={dir}
          css={{ ...styles }}
          aria-label={label}
          onMouseDown={(e) => startDrag(e, dir)}
          onClick={(e) => e.stopPropagation()}
        >
          <DragIcon size="1.3rem" />
        </IconHolder>
      ))}
      <IconHolder css={{ gridArea: "middle", cursor: "grab" }}>
        <BiMove
          onMouseDown={() => startMoving(selectedItem.name)}
          onClick={(e) => e.stopPropagation()}
        />
      </IconHolder>
      <SettingsToolbarMemo
        name={selectedItem.name}
        beingDragged={beingDragged}
      />
      <div
        css={cancelBoxStyles}
        onClick={() => {
          resetSelection();
        }}
      />
    </div>
  );
}

function SettingsToolbar({
  name,
  beingDragged,
}: {
  name: GridItemDef["name"];
  beingDragged: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [itemUi, setItemUi] = useRecoilState(selectedUiElement);

  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  const deleteItem = useDeleteItem();

  let settingsButton: JSX.Element | null = null;

  if (itemUi !== null && itemUi !== "unset") {
    const { componentName, componentProps } = itemUi;
    // Make sure TS knows these are compatible types
    const components = uiComponentAndSettings[componentName];

    const SettingsComponent = components.SettingsComponent as ShinyUiSettingsComponent<
      typeof componentProps
    >;
    settingsButton =
      itemUi !== null ? (
        <Popover
          isOpen={isOpen}
          onClose={closePopover}
          onOpen={openPopover}
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <IconButton
              h="100%"
              padding="3px"
              variant="outline"
              aria-label="Open settings dialog"
              icon={<SettingsIcon />}
            />
          </PopoverTrigger>
          <PopoverContent aria-label={`Settings for component`} color="black">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <code>{componentName}</code> settings
            </PopoverHeader>
            <PopoverBody>
              <SettingsComponent
                startingSettings={componentProps}
                onUpdate={(newSettings) => {
                  setItemUi({
                    componentName,
                    componentProps: newSettings,
                  } as ShinyUiNameAndProps);
                  closePopover();
                }}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : null;
  }

  return (
    <div
      css={{
        "--inset": "var(--corner-radius)",
        gridRow: "1",
        gridColumn: "1/-1",
        justifySelf: "center",
        position: "relative",
        width: "min(calc(100% - 2*var(--inset)), 250px)",
      }}
    >
      <div
        css={{
          position: "absolute",
          transition:
            "box-shadow var(--animation-speed) var(--animation-curve)",
          borderRadius: "var(--corner-radius)",
          boxShadow: beingDragged ? "var(--raised-shadow)" : "var(--shadow)",
          background: "var(--rstudio-blue)",
          color: "white",
          bottom: "calc(100% + var(--selected-border-width))",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: "0.2rem 0.5rem",
          gap: "5px",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontWeight: 500,
        }}
      >
        <span>{name}</span>
        <IconButton
          h="100%"
          padding="3px"
          variant="outline"
          title={"Delete " + name}
          aria-label={"Delete " + name}
          icon={<FaTrash />}
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(name);
          }}
        />
        {settingsButton}
      </div>
    </div>
  );
}

const SettingsToolbarMemo = React.memo(SettingsToolbar);

const IconHolder = styled.span({
  color: "var(--light-grey, blue)",
  placeSelf: "center",
  padding: "4px",
  zIndex: 1000, //High z index so the draggers sit above the cancel listener div
});

const overlayStyles = css({
  borderRadius: "var(--corner-radius)",
  border: "var(--selected-border-width) solid var(--selected-border-color)",
  display: "grid",
  gridTemplateAreas: `
    "topLeft    top      topRight"
    "left       middle   right"
    "bottomLeft bottom   bottomRight"`,
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateRows: "auto 1fr auto",
});

const cancelBoxStyles = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  // low z index so the draggers sit above the cancel listener div
  zIndex: 0,
});

const dirToDragger: {
  dir: DragDir;
  DragIcon: IconType;
  label: string;
  styles: React.CSSProperties;
}[] = [
  {
    dir: "top",
    label: "Resize up",
    DragIcon: BsArrowUp,
    styles: { gridArea: "top", cursor: "n-resize" },
  },
  {
    dir: "bottom",
    label: "Resize down",
    DragIcon: BsArrowDown,
    styles: { gridArea: "bottom", cursor: "s-resize" },
  },
  {
    dir: "left",
    label: "Resize left",
    DragIcon: BsArrowLeft,
    styles: { gridArea: "left", cursor: "w-resize" },
  },
  {
    dir: "right",
    label: "Resize right",
    DragIcon: BsArrowRight,
    styles: { gridArea: "right", cursor: "e-resize" },
  },
  {
    dir: "topLeft",
    label: "Resize upper-left",
    DragIcon: BsArrowUpLeft,
    styles: { gridArea: "topLeft", cursor: "nw-resize" },
  },
  {
    dir: "topRight",
    label: "Resize upper-right",
    DragIcon: BsArrowUpRight,
    styles: { gridArea: "topRight", cursor: "ne-resize" },
  },
  {
    dir: "bottomLeft",
    label: "Resize lower-left",
    DragIcon: BsArrowDownLeft,
    styles: { gridArea: "bottomLeft", cursor: "sw-resize" },
  },
  {
    dir: "bottomRight",
    label: "Resize lower-right",
    DragIcon: BsArrowDownRight,
    styles: { gridArea: "bottomRight", cursor: "se-resize" },
  },
];
