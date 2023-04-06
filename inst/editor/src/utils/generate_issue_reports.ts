import { collapseText } from "util-functions/src/strings";

import type { NodePath, ShinyUiNode } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { RootState } from "../state/store";

/**
 *
 * @param code Serialized code to be wrapped in code chunks
 * @param single_or_multiline Whether to use single or multiline code chunks
 * @returns Markdown code chunk
 */
function generate_code_chunk(
  code: string,
  single_or_multiline: "single" | "multi" = "multi"
) {
  const delimeter = single_or_multiline === "single" ? "`" : "\n```\n";
  return `${delimeter}${code}${delimeter}`;
}

function single_line_code_chunk(code: string) {
  return generate_code_chunk(code, "single");
}
function multi_line_code_chunk(code: string) {
  return generate_code_chunk(code, "multi");
}

/**
 *
 * @param app_state Main app state when error occured
 * @returns A string that summarized salient state information for github issue
 */
export function generate_serialized_state_for_error(app_state: RootState) {
  switch (app_state.app_info.mode) {
    case "MAIN": {
      const ui_tree = JSON.stringify(app_state.app_info.ui_tree, null, 2);
      const current_selection =
        (app_state.selected_path ?? []).join(" > ") ?? "null";

      return collapseText(
        `## Ui-Tree at error:\n${multi_line_code_chunk(ui_tree)}`,
        `__Selection path:__ ${single_line_code_chunk(current_selection)}`
      );
    }
    case "TEMPLATE_CHOOSER": {
      const template_chooser_options = JSON.stringify(
        app_state.app_info.options,
        null,
        2
      );
      return collapseText(
        `## Template chooser options at error:`,
        `${multi_line_code_chunk(template_chooser_options)}`
      );
    }
    default: {
      const other_app_state = JSON.stringify(app_state.app_info, null, 2);

      return `## App state at error:\n${multi_line_code_chunk(
        other_app_state
      )}`;
    }
  }
}

/**
 *
 * @param info Information about error to be encoded in github issue link with properties:
 * - `node`: The node being rendered when error occured
 * - `path`: Path to node
 * - `app_state`: Main app state at time of error
 *
 * @returns URL that encodes info about error in github issue is links to
 */
export function generate_ui_node_github_error_link(info: {
  /** The node being rendered when error occured */
  node: ShinyUiNode;
  /** Path to node */
  path: NodePath;
  /** Main app state at time of error */
  app_state: RootState;
}) {
  const { node, path, app_state } = info;
  return generate_gh_issue_url({
    title: `Error rendering ${node.id}`,
    body: collapseText(
      `This is what I was going when this error happened...\n`,
      generate_serialized_state_for_error(app_state),
      `__Path to node at error:__ \`${path.join(" > ")}\``
    ),
    labels: ["testing-labels", "ui-node-rendering"],
  });
}

/**
 *
 * @param info Information for prefilling github issue with properties:
 * - `title`: Prefilled title of issue
 * - `body`: Prefilled body of issue
 * - `labels`: List of labels to add to issue (in addition to `"autogenerated"`)
 * @returns URL that links to github issue with the given info prefilled
 */
export function generate_gh_issue_url(info: {
  title: string;
  body: string;
  labels?: string[];
}) {
  const build_url = () => {
    const params = [
      `title=${encodeURIComponent(info.title)}`,
      `labels=${encodeURIComponent(["autogenerated"].join(","))}`,
      `body=${encodeURIComponent(info.body)}`,
    ].join("&");

    return `https://github.com/rstudio/shinyuieditor/issues/new?${params}`;
  };

  // Check if url text is longer than 5000 characters and replace it with message saying it's too long if it is
  const full_url = build_url();

  // Based on https://www.geeksforgeeks.org/maximum-length-of-a-url-in-different-browsers/ as of 2022-03-23
  const max_body_text_chars = 65000;

  if (full_url.length > max_body_text_chars) {
    info.body =
      "State of app during error was too large to encode in url. Please describe state of app when error occured as best you can! Thank you!";
    return build_url();
  }

  return full_url;
}
