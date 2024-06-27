import type { CSSProperties } from "react";

import type { ParserNode } from "treesitter-parsers";
import { extract_call_content, is_call_node } from "treesitter-parsers";

import icon from "../../../assets/icons/shinyValueBox.png";
import { PopoverButton } from "../../../components/Inputs/PopoverButton";
import { RadioInputs } from "../../../components/Inputs/RadioInputs/RadioInputsSimple";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/PopoverEl/FloatingPopover";
import { DropWatcherPanel } from "../../../DragAndDropHelpers/DropWatcherPanel";
import {
  extract_string_content,
  is_string_node,
} from "../../../r-parsing/NodeTypes/StringNode";
import { InputLabelWrapper } from "../../../SettingsPanel/SettingsInput/SettingsInput";
import { mergeClasses } from "../../../utils/mergeClasses";
import { ChildrenWithDropNodes } from "../../ChildrenWithDropNodes";
import { makeUnknownUiFunction } from "../../internal/UnknownUiFunction/make_unknown_ui_function";
import type {
  PreprocessedArgNode,
  UiNodeComponent,
} from "../../nodeInfoFactory";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { ShinyUiNode } from "../../ShinyUiNode";
import type { NamedArgsObject } from "../../uiNodeTypes";

import { BsIcon } from "./BsIcon";
import { IconSelector } from "./IconSelector";

type ValueBoxArgs = {
  title: string;
  showcase_icon?: string;
  showcase?: unknown;
  value?: ShinyUiNode;
  showcase_layout?: keyof typeof layout_dir_to_code;
};

const ValueBoxComponent: UiNodeComponent<
  ValueBoxArgs,
  { TakesChildren: true }
> = ({ namedArgs, children, path, wrapperProps }) => {
  const showcase_right = namedArgs.showcase_layout === "right";
  return (
    <div
      className="flex-1 relative"
      style={
        {
          "--font-color": "var(--rstudio-white",
          "--selected-outline-color": "black",
        } as CSSProperties
      }
      {...wrapperProps}
    >
      <div
        className={mergeClasses(
          "bg-primary text-white h-100 grid gap-md p-md overflow-auto",
          showcase_right ? "grid-cols-[7fr_3fr]" : "grid-cols-[3fr_7fr]"
        )}
      >
        <div
          className={mergeClasses(
            "p-sm col-start-1 row-start-1 min-w-0",
            showcase_right ? "col-start-2" : "col-start-1"
          )}
        >
          <BsIcon
            className="w-100 h-100"
            icon_name={namedArgs.showcase_icon ?? "question-circle"}
          />
        </div>
        <div
          className={mergeClasses(
            "flex flex-col justify-center row-start-1 min-w-0",
            showcase_right ? "col-start-1" : "col-start-2"
          )}
        >
          <h5 className="">{namedArgs.title}</h5>
          <div>
            <DropWatcherPanel
              className={
                namedArgs.value?.id === "textNode" ? "text-[1.5rem]" : ""
              }
              existing_node={namedArgs.value}
              child_loc={"value"}
              parentPath={path}
              visibleWhenEmpty={true}
              messageOnHover={
                namedArgs.value ? "Replace value" : "Drop a value node here"
              }
              placeHolder={<EmptyValuePlaceholder />}
              parentNodeType="value_box"
            />
          </div>
          <ChildrenWithDropNodes
            children={children}
            parentPath={path}
            parentid="value_box"
            messageOnHover="Add node to value box"
          />
        </div>
      </div>
    </div>
  );
};

function EmptyValuePlaceholder() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="opacity-70 italic h-10 border grid place-content-center">
          No value present
        </div>
      </TooltipTrigger>
      <TooltipContent>
        Drag content here to set the value box's main value field.
      </TooltipContent>
    </Tooltip>
  );
}

const layout_dir_to_code = {
  left: "showcase_left_center()",
  right: "showcase_top_right()",
} as const;

export const value_box = nodeInfoFactory<ValueBoxArgs>()({
  id: "value_box",
  r_info: {
    fn_name: "value_box",
    package: "bslib",
    transform_named_args: (args) => {
      const { showcase_icon, showcase_layout, ...others } = args;

      const to_return = others as NamedArgsObject;
      if (showcase_icon) {
        to_return.showcase = makeUnknownUiFunction(
          `bsicons::bs_icon("${showcase_icon}")`
        );
      }

      if (showcase_layout) {
        to_return.showcase_layout = makeUnknownUiFunction(
          layout_dir_to_code[showcase_layout]
        );
      }

      return to_return;
    },
    preprocess_raw_ast_arg: ({ name, value }) => {
      switch (name) {
        case "showcase":
          return convertShowcaseArg(value);
        case "showcase_layout":
          return convertShowcaseLayoutArg(value);
        default:
          return null;
      }
    },
  },
  title: "Value Box",
  takesChildren: true,
  settingsInfo: {
    title: {
      label: "Title of valuebox",
      inputType: "string",
      defaultValue: "Look at me!",
    },
    showcase_icon: {
      inputType: "omitted",
      optional: true,
      defaultValue: "database",
      useDefaultIfOptional: true,
    },
    showcase: {
      inputType: "omitted",
      optional: true,
    },
    value: {
      inputType: "ui-node",
      optional: true,
      defaultValue: {
        id: "textNode",
        namedArgs: {
          contents: "My value",
        },
      },
    },
    showcase_layout: {
      inputType: "omitted",
      defaultValue: "left",
      optional: true,
    },
  },
  iconSrc: icon,
  category: "Cards",
  description: "Colorful box to display a value",
  ui_component: ValueBoxComponent,
  settingsFormRender: ({ settings, onSettingsChange, inputs }) => {
    return (
      <div>
        <InputLabelWrapper
          label={`Showcase ${settings.showcase_icon ? "Icon" : "Value"}`}
          labelId="showcase-icon"
          mainInput={
            settings.showcase_icon ? (
              <IconSelector
                initialValue={settings.showcase_icon}
                onIconSelect={(icon_name) => {
                  onSettingsChange?.("showcase_icon", {
                    type: "UPDATE",
                    value: icon_name,
                  });
                }}
              />
            ) : (
              <PopoverButton
                className="w-100 h-[25px]"
                use_markdown={true}
                popoverContent="Replace current showcase value with an icon from the
                  bsicons package."
                onClick={() => {
                  onSettingsChange?.("showcase_icon", {
                    type: "UPDATE",
                    value: "database",
                  });
                }}
              >
                Replace with icon
              </PopoverButton>
            )
          }
        />
        <InputLabelWrapper
          label="Showcase Direction"
          labelId="showcase-direction"
          mainInput={
            <RadioInputs
              id="showcase-direction"
              label="Showcase Direction"
              value={settings.showcase_layout ?? "left"}
              onChange={(dir) => {
                onSettingsChange?.(
                  "showcase_layout",
                  dir === "left"
                    ? { type: "REMOVE" }
                    : {
                        type: "UPDATE",
                        value: dir,
                      }
                );
              }}
              optionsPerColumn={2}
              choices={{
                left: { label: "Left" },
                right: { label: "Right" },
              }}
            />
          }
        />

        {Object.values(inputs)}
      </div>
    );
  },
});

/**
 *
 * @param arg Argument representing the passed value to the "showcase" argument
 * of the value_box function call
 * @returns Updated argument, switching the name to the internal "showcase_icon"
 * and converting the icon, if it exists, to a character node representing the
 * icon name. If the passed value doesn't match an icon format. Then the
 * original is returned.
 */
function convertShowcaseArg(value: ParserNode): PreprocessedArgNode | null {
  if (!is_call_node(value)) {
    return null;
  }
  const { fn_name, fn_args } = extract_call_content(value);
  const is_icon_call = fn_name === "bsicons::bs_icon" || fn_name === "bs_icon";

  if (is_icon_call && is_string_node(fn_args[0])) {
    return {
      name: "showcase_icon",
      value: extract_string_content(fn_args[0]),
    };
  }

  return null;
}

/**
 *
 * @param arg Argument representing the passed value to the "showcase_layout"
 * argument of the value_box function call.
 * @returns Updated argument, converting the function call to a character node
 * of left or right based on the original passed function.
 */
function convertShowcaseLayoutArg(
  value: ParserNode
): PreprocessedArgNode | null {
  if (!is_call_node(value)) {
    return null;
  }
  const { fn_name } = extract_call_content(value);

  if (fn_name === "showcase_left_center") {
    return {
      name: "showcase_layout",
      value: "left",
    };
  }
  if (fn_name === "showcase_top_right") {
    return {
      name: "showcase_layout",
      value: "right",
    };
  }

  return null;
}
