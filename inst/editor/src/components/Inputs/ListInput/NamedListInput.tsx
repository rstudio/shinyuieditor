import React from "react";

import { ArrowsCollapse, Gear, X } from "react-bootstrap-icons";
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

export function NamedListInput({
  id,
  label,
  value,
  onChange,
  newItemValue = (i) => ({ key: "Value" + i, value: "value" + i }),
}: InputComponentByType<"list">) {
  const {
    flatList,
    addItem,
    deleteItem,
    reorderItems,
    updateKey,
    updateValue,
    swapKeyValueMode,
    listMode,
    onValueModeToggle,
    keyValueMismatches,
    onCancelSimplify,
  } = useListState({
    value,
    onChange,
    newItemValue,
  });

  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const isEmpty = flatList.length === 0;

  const ItemList = (
    <div
      className="w-fit flex flex-col items-center my-2"
      aria-labelledby={makeLabelId(id)}
      aria-label={label}
    >
      <ListItem
        valueOnlyMode={listMode === "value-only"}
        className="text-center -my-1"
        aria-label="Columns field labels"
      >
        {listMode === "value-only" ? (
          <span className="col-start-2">Value</span>
        ) : (
          <>
            <span className="col-start-2">Key</span>
            <span className="col-start-4">Value</span>
          </>
        )}
      </ListItem>
      <ReactSortable
        list={flatList}
        setList={reorderItems}
        handle=".NamedListDragHandle"
      >
        {flatList.map((item, i) => (
          <ListItem
            valueOnlyMode={listMode === "value-only"}
            className={mergeClasses(
              "my-1",
              keyValueMismatches &&
                keyValueMismatches.find((m) => m.key === item.key)
                ? "bg-danger/30"
                : null
            )}
            aria-label="List item"
            key={i}
          >
            <div
              className="NamedListDragHandle grid place-items-center cursor-ns-resize"
              title="Reorder list"
            >
              <MdDragHandle />
            </div>
            {listMode === "value-only" ? (
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
                <KeyInput
                  allElements={flatList}
                  index={i}
                  keyValue={item.key}
                  onUpdate={(newKey) => {
                    updateKey({ index: i, newKey });
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
    </div>
  );

  const haveMismatches = keyValueMismatches !== null;
  return (
    <ControlledPopup
      isOpen={settingsOpen}
      onClose={() => {
        setSettingsOpen(false);
        onCancelSimplify();
      }}
      description={`Settings panel for ${label} argument`}
      placement="right-start"
      accent={haveMismatches ? "warning" : "info"}
      offset={{
        mainAxis: 9,
        crossAxis: -23,
      }}
      content={
        <>
          <h2 className="bold text-base mb-3">Settings for {label} argument</h2>
          <div className="flex gap-2 justify-between items-center ">
            <label htmlFor="keyAndValueModeCheckbox">Keys and Value Mode</label>
            <input
              className="transform[translateY(1px)] border mt-[2px]"
              id="keyAndValueModeCheckbox"
              type="checkbox"
              checked={listMode === "key-value"}
              disabled={haveMismatches}
              onChange={(e) => {
                onValueModeToggle(!e.target.checked);
              }}
            />
          </div>
          <span className="text-xs text-gray-700 italic">
            Should the list be displayed as just values or as key-value pairs?
            Key value pairs will allow you to choose a different display name
            for each value.
          </span>
          {haveMismatches && (
            <>
              <hr />
              <p>
                There are some{" "}
                <span className="bg-danger/30 px-1 py-[2px] rounded">
                  mismatches
                </span>{" "}
                between keys and values preventing simplification to value-only
                mode. Merge to just the values?
              </p>

              <div className="flex justify-around mt-2">
                <Button
                  onClick={() => {
                    swapKeyValueMode("value-only");
                    onCancelSimplify();
                  }}
                >
                  <ArrowsCollapse className="text-lg" /> Merge
                </Button>
                <Button onClick={onCancelSimplify} variant="secondary">
                  {" "}
                  <X className="text-lg" />
                  Cancel
                </Button>
              </div>
            </>
          )}
        </>
      }
    >
      <div className="relative">
        <Button
          className="absolute right-0 bottom-100"
          variant={["icon", "transparent"]}
          onClick={() => {
            setSettingsOpen((prev) => !prev);
            onCancelSimplify();
          }}
          aria-label={`Open settings for ${label} argument`}
        >
          <Gear />
        </Button>

        {isEmpty ? (
          <div className="text-gray-500 text-xs bg-rstudio-white rounded italic w-full h-[23px] my-1 grid place-content-center ">
            Empty list
          </div>
        ) : (
          ItemList
        )}

        <Button
          className="text-icon -mt-1 p-1 bg-red-400 w-full"
          onClick={() => addItem()}
          variant="transparent"
          title="Add new item"
          aria-label="Add new item to list"
        >
          <FaPlus />
        </Button>
      </div>
    </ControlledPopup>
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

function KeyInput({
  keyValue,
  onUpdate,
  allElements,
  index,
}: {
  index: number;
  keyValue: string;
  onUpdate: (newKey: string) => void;
  allElements: ReturnType<typeof useListState>["flatList"];
}) {
  const [displayedValue, setDisplayedValue] = React.useState(keyValue);

  // Make sure whenever the passed in "true" value updates, then we update the
  // displayed value to match it
  React.useEffect(() => {
    setDisplayedValue(keyValue);
  }, [keyValue]);

  const otherKeys = allElements.filter((_, i) => i !== index).map((e) => e.key);

  const isEmpty = displayedValue === "";

  const isSameAsOtherKey = otherKeys.includes(displayedValue);

  const isInvalid = isEmpty || isSameAsOtherKey;

  return (
    <span
      className={mergeClasses(
        "block relative",
        isSameAsOtherKey &&
          `after:absolute after:content-["Duplicate_key"] after:block after:text-rstudio-white after:rounded after:min-w-fit after:p-1 after:border after:z-20 after:bg-danger/90`
      )}
    >
      <input
        title="Key Field"
        className={mergeClasses(
          "min-w-0 w-full placeholder:text-rstudio-white placeholder:text-xs",
          isInvalid && "bg-danger/30 transition-colors duration-500 delay-300"
        )}
        aria-invalid={isInvalid}
        aria-label="List item key"
        type="text"
        value={displayedValue}
        placeholder={isSameAsOtherKey ? "Duplicate" : "Required"}
        onChange={(e) => {
          e.stopPropagation();
          const newValue = e.target.value;

          setDisplayedValue(newValue);

          const validNewValue = !(
            newValue === "" ||
            otherKeys.some(
              (key) => key.toLowerCase() === newValue.toLowerCase()
            )
          );

          if (validNewValue) {
            onUpdate(e.target.value);
          }
        }}
      />
    </span>
  );
}
