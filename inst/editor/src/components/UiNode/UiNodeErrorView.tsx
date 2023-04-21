import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

import { generate_ui_node_github_error_link } from "../../utils/generate_issue_reports";
import { GeneralErrorView } from "../ErrorCatcher/GeneralErrorView";

export function UiNodeErrorView({
  node,
  path,
  error,
  resetErrorBoundary,
}: {
  node: ShinyUiNode;
  path: NodePath;
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <GeneralErrorView
      header={`Something went wrong rendering ${node.id}()`}
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      generateIssueLink={(state_at_error) =>
        generate_ui_node_github_error_link({
          node,
          path,
          app_state: state_at_error,
        })
      }
    />
  );
}
