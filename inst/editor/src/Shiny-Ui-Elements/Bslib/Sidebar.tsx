import { add_editor_info_by_id } from "../utils/add_editor_info_to_ui_node";

export const bslibSidebar = add_editor_info_by_id("sidebar", {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <div {...wrapperProps}>
        <h1>{namedArgs.title}</h1>
        <div>Here's some content for my sidebar</div>
      </div>
    );
  },
});
