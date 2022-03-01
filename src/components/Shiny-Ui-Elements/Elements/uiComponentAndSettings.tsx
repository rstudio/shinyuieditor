import { DragAndDropHandlers } from "../DragAndDropHelpers/useDragAndDropElements";

type AllowedBaseElements = HTMLDivElement;
type PassthroughProps = DragAndDropHandlers &
  Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<AllowedBaseElements>,
      AllowedBaseElements
    >,
    "onClick"
  >;

export type UiNodeComponent<NodeSettings extends object> = React.FC<
  { uiArguments: NodeSettings } & PassthroughProps
>;
