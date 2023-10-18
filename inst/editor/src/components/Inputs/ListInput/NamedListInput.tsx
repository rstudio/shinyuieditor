import React from "react";

import { FaPlus } from "react-icons/fa";
import { MdDragHandle } from "react-icons/md";
import { ReactSortable } from "react-sortablejs";

import type { InputComponentByType } from "../../../ui-node-definitions/inputFieldTypes";
import { makeLabelId } from "../../../ui-node-definitions/inputFieldTypes";
import { mergeClasses } from "../../../utils/mergeClasses";
import { Trash } from "../../Icons";
import { ControlledPopup } from "../../PopoverEl/ControlledPopup";
import Button from "../Button/Button";

import { useListState } from "./useListState";

export type NamedList = Record<string, string>;

export function NamedListInput({
  id,
  label,
  value,
  onChange,
  newItemValue = (i) => ({ key: "Value" + i, value: "value" + i }),
}: InputComponentByType<"list">) {
  // TODO: Update this name/format to be "true" when the mode is "simple" or
  // value-only to avoid so many negative conditions
  const [valueOnlyMode, setValueOnlyMode] = React.useState<boolean>(false);
  const [showKeyValueMismatch, setShowKeyValueMismatch] = React.useState(false);
  const {
    state,
    addItem,
    deleteItem,
    reorderItems,
    updateKey,
    updateValue,
    mergeKeysAndValues,
  } = useListState({
    value,
    onChange,
    newItemValue,
    valueOnlyMode,
  });

  React.useEffect(() => {
    // Check if all the keys and values are the same. If they are not, show mismatch message
    const sameKeysAndValues = state.every(
      (item) => item.key === item.value || item.key === ""
    );

    if (valueOnlyMode && !sameKeysAndValues) {
      setShowKeyValueMismatch(true);
    } else {
      setShowKeyValueMismatch(false);
    }
  }, [valueOnlyMode, state, value]);

  return (
    <div>
      <ControlledPopup
        isOpen={showKeyValueMismatch}
        onClose={() => setShowKeyValueMismatch(false)}
        accent="warning"
        content={
          <>
            <span>
              There are mismatches between keys and values. Should these be
              merged to just the values?
            </span>
            <div className="flex gap-1 mt-2">
              <Button onClick={mergeKeysAndValues}>Merge</Button>
              <Button>Cancel</Button>
            </div>
          </>
        }
      >
        <div className="flex gap-2 items-center">
          <label
            className="text-xs text-gray-800 italic"
            htmlFor="keyAndValueModeCheckbox"
            data-value={value ? "TRUE" : "FALSE"}
          >
            Separate label and values
          </label>
          <input
            className="transform[translateY(1px)] border mt-[2px]"
            id="keyAndValueModeCheckbox"
            aria-labelledby={makeLabelId(id)}
            aria-label={label}
            type="checkbox"
            checked={!valueOnlyMode}
            onChange={(e) => {
              setValueOnlyMode(!e.target.checked);
            }}
          />
        </div>
      </ControlledPopup>

      <div
        className="w-fit flex flex-col items-center my-2"
        aria-labelledby={makeLabelId(id)}
        aria-label={label}
      >
        <ListItem
          valueOnlyMode={valueOnlyMode}
          className="text-center -my-1"
          aria-label="Columns field labels"
        >
          {valueOnlyMode ? (
            <span className="col-start-2">Value</span>
          ) : (
            <>
              <span className="col-start-2">Key</span>
              <span className="col-start-4">Value</span>
            </>
          )}
        </ListItem>
        <ReactSortable
          list={state}
          setList={reorderItems}
          handle=".NamedListDragHandle"
        >
          {state.map((item, i) => (
            <ListItem
              valueOnlyMode={valueOnlyMode}
              className="my-1"
              aria-label="List item"
              key={i}
            >
              <div
                className="NamedListDragHandle grid place-items-center cursor-ns-resize"
                title="Reorder list"
              >
                <MdDragHandle />
              </div>
              {valueOnlyMode ? (
                <input
                  title="Value Field"
                  className="min-w-0"
                  type="text"
                  aria-label="List item value"
                  value={item.value}
                  onChange={(e) => {
                    updateValue({ index: i, newValue: e.target.value });
                  }}
                />
              ) : (
                <>
                  <input
                    title="Key Field"
                    className="min-w-0"
                    aria-label="List item key"
                    type="text"
                    value={item.key}
                    onChange={(e) => {
                      updateKey({ index: i, newKey: e.target.value });
                    }}
                  />
                  <span className="mb-[1px]">:</span>
                  <input
                    title="Value Field"
                    className="min-w-0"
                    type="text"
                    aria-label="List item value"
                    value={item.value}
                    onChange={(e) => {
                      updateValue({ index: i, newValue: e.target.value });
                    }}
                  />
                </>
              )}

              <Button
                className="grid place-content-center p-0 area[delete] hover:scale-110 mb-[2px]"
                onClick={() => deleteItem(item.id)}
                variant={["icon", "transparent"]}
                title={`Delete ${item.value}`}
              >
                <Trash />
              </Button>
            </ListItem>
          ))}
        </ReactSortable>
        <Button
          className="text-icon -mt-1 p-1"
          onClick={() => addItem()}
          variant={["icon", "transparent"]}
          title="Add new item"
          aria-label="Add new item to list"
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
}

// Custom div that takes all the same props as a <div> component
function ListItem({
  valueOnlyMode,
  className,
  ...props
}: React.ComponentProps<"div"> & { valueOnlyMode: boolean }) {
  return (
    <div
      className={mergeClasses(
        className,
        valueOnlyMode
          ? "grid-cols-[15px_1fr_15px]"
          : "grid-cols-[15px_1fr_auto_1fr_15px]",
        "w-100 grid ",
        "gap-1 p-1 items-center rounded [&.sortable-chosen]:outline",
        "[&.sortable-chosen]:outline-offset-[-2px] [&.sortable-chosen]:outline-rstudio-grey/30 [&.sortable-chosen]:shadow-lg"
      )}
      {...props}
    />
  );
}
