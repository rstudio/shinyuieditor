import { forwardRef, useId, useRef, useState } from "react";

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import type { NonEmptyArray } from "util-functions/src/TypescriptUtils";

import allBsIconNames from "../../../assets/bsicons/all-bsicon-names.json";
import { mergeClasses } from "../../../utils/mergeClasses";

import { BsIcon } from "./BsIcon";

export function IconSelector({
  initialValue,
  onIconSelect,
}: {
  initialValue: string;
  onIconSelect: (icon: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { x, y, strategy, refs, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [role, dismiss, listNav]
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    // Replace spaces with dashes
    value = value.replace(/\s+/g, "-");
    if (AlphaNumericRegex.test(value)) {
      setInputValue(value);
    } else {
      //  Ignoring invalid input type
    }

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  const select_icon = (icon: string) => {
    setInputValue(icon);
    setOpen(false);
    onIconSelect(icon);
    setActiveIndex(null);
  };

  const filtered_icons = FilterIconsList(inputValue);

  const current_selection =
    filtered_icons === null ? null : filtered_icons[activeIndex ?? 0];

  return (
    <div className={mergeClasses("flex items-center gap-2 pl-2")}>
      <BsIcon icon_name={current_selection ?? "bootstrap"} className="w-4" />
      <input
        {...getReferenceProps({
          ref: refs.setReference,
          onChange,
          value: inputValue,
          placeholder: "Search for icon...",
          "aria-autocomplete": "list",
          className: "w-40",
          onKeyDown(event) {
            if (
              event.key === "Enter" &&
              activeIndex != null &&
              filtered_icons &&
              filtered_icons[activeIndex]
            ) {
              select_icon(filtered_icons[activeIndex]);
            }
          },
        })}
      />
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            initialFocus={-1}
            visuallyHiddenDismiss
          >
            <div
              {...getFloatingProps({
                ref: refs.setFloating,
                className:
                  "z-10 flex flex-col w-40 max-h-96 overflow-auto rounded bg-white shadow-md",
                style: {
                  position: strategy,
                  left: x ?? 0,
                  top: y ?? 0,
                },
              })}
              role="listbox"
            >
              {filtered_icons ? (
                filtered_icons.map((icon, index) => (
                  <IconResult
                    key={icon}
                    {...getItemProps({
                      ref(node) {
                        listRef.current[index] = node;
                      },
                      onClick() {
                        select_icon(icon);
                      },
                    })}
                    active={activeIndex === index}
                    icon={icon}
                    divider={index !== filtered_icons.length - 1}
                  />
                ))
              ) : (
                <IconResult
                  icon="EmojiFrown"
                  active={false}
                  label="No results"
                />
              )}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  );
}

const IconResult = forwardRef<
  HTMLDivElement,
  {
    icon: string;
    label?: string;
    active: boolean;
    divider?: boolean;
  } & React.HTMLProps<HTMLDivElement>
>(({ icon, label, active, divider, ...rest }, ref) => {
  const id = useId();
  return (
    <>
      <div
        ref={ref}
        role="option"
        id={id}
        className={mergeClasses(
          "grid grid-cols-[20px_1fr] gap-1 cursor-pointer px-3 py-2 items-center",
          "[&[aria-selected='true']]:bg-rstudio-blue [&[aria-selected='true']]:text-white"
        )}
        aria-selected={active}
        aria-label={icon}
        {...rest}
      >
        <BsIcon icon_name={icon} />
        <span>{label ?? icon}</span>
      </div>
      {divider && <ListDivider />}
    </>
  );
});

function ListDivider() {
  return (
    // For some reason we need content for the divider to show up
    <div className="bg-light-grey h-[1px] text-transparent select-none">
      divider
    </div>
  );
}
const AlphaNumericRegex = /^[A-Za-z0-9-]*$/;

function FilterIconsList(icon_search: string): NonEmptyArray<string> | null {
  const filtered_list = allBsIconNames.filter((item) =>
    item.toLowerCase().startsWith(icon_search.toLowerCase())
  );

  if (filtered_list.length > 0) {
    return filtered_list as NonEmptyArray<string>;
  } else {
    return null;
  }
}
