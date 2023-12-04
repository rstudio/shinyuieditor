import ReactMarkdown from "react-markdown";

import {
  is_array_node,
  extract_array_contents,
} from "../../../r-parsing/NodeTypes/ArrayNode";
import {
  is_string_node,
  extract_string_content,
} from "../../../r-parsing/NodeTypes/StringNode";
import icon from "../../assets/icons/shinyMarkdown.png";
import { nodeInfoFactory } from "../../nodeInfoFactory";

export const markdown_node = nodeInfoFactory<{
  mds: string;
}>()({
  title: "Markdown Text",
  r_info: {
    fn_name: "markdown",
    package: "shiny",
    preprocess_raw_ast_arg: (arg) => {
      if (arg.name !== "mds") return null;

      const node = arg.value;

      let parsed_text = arg.value.text;

      if (is_array_node(node)) {
        parsed_text = extract_array_contents(node).join("\n");
      }

      // Handle single element character vector
      if (is_string_node(node)) {
        parsed_text = extract_string_content(node);
      }

      return { name: "mds", value: parsed_text };
    },

    transform_named_args: (named_args) => {
      // Break up the text into array by lines
      return {
        ...named_args,
        mds: named_args.mds.split("\n"),
      };
    },
  },
  id: "markdown",
  takesChildren: false,
  settingsInfo: {
    mds: {
      inputType: "string",
      label: "Text",
      defaultValue: "hello _world_",
      longform: true,
      fill_space: true,
    },
  },
  category: "Utilities",
  description: "Write markdown text that will be rendered as HTML.",
  iconSrc: icon,
  ui_component: ({ namedArgs: { mds }, wrapperProps }) => {
    return (
      <div {...wrapperProps}>
        <ReactMarkdown children={mds} />
      </div>
    );
  },
});
