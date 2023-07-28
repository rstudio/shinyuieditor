import type { NodePath } from "ui-node-definitions/src/NodePath";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";

import { generateUiNodeGithubErrorLink } from "../../utils/generate_issue_reports";
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
        generateUiNodeGithubErrorLink({
          node,
          path,
          app_state: state_at_error,
        })
      }
    />
  );
}
