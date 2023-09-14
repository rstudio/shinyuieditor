import { mergeClasses } from "../../utils/mergeClasses";

import type { UiNodeProps } from "./UiNode";
import type { UiNodeWrapperProps } from "./useMakeWrapperProps";
import { useMakeWrapperProps } from "./useMakeWrapperProps";

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

// Prefered way to wrap a node in wrapperProps object. Lots of nodes still just
// spread the props on a div which is okay but going forward we should try and
// use this function so we can easily add more complicated behavior if neccesary
export function NodeWrapper({
  wrapperProps,
  className,
  ...divProps
}: { wrapperProps: UiNodeWrapperProps | UiNodeProps } & DivProps) {
  // If we've received the node without the wrapper props generated, we will
  // send it off to a component that can generate them for us
  if ("path" in wrapperProps) {
    return (
      <NodeWrapperGenerateProps
        nodeProps={wrapperProps}
        className={className}
        {...divProps}
      />
    );
  }
  return (
    <div
      className={mergeClasses(
        className,
        `relative`,
        // If we're the selected node, we want to make sure we're sitting nice
        // and high in the z-index stack so we don't get cutoff
        wrapperProps["data-is-selected-node"] && "z-50"
      )}
      {...wrapperProps}
      // Pass div props second so they can overwrite any wrapper props if needed
      {...divProps}
    />
  );
}

// Who wraps the wrapper? This component does. It's a seperate component because
// of the whole, "no conditional hooks" rule in react but it just calls the hook
// to make the wrapper props and then goes right back to the main NodeWrapper
// component
function NodeWrapperGenerateProps({
  nodeProps,
  ...divProps
}: { nodeProps: UiNodeProps } & DivProps) {
  const wrapperProps = useMakeWrapperProps(nodeProps);

  return <NodeWrapper wrapperProps={wrapperProps} {...divProps} />;
}
