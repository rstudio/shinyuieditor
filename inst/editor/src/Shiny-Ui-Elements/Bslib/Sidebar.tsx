import { ChevronLeft } from "react-bootstrap-icons";

import { add_editor_info_by_id } from "../utils/add_editor_info_to_ui_node";

import classes from "./Sidebar.module.css";

export const bslibSidebar = add_editor_info_by_id("sidebar", {
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <div {...wrapperProps}>
        <div className={classes.sidebar}>
          <div className={classes.sidebarContent}>
            <h3>{namedArgs.title}</h3>
            <p>Sidebar children will go here</p>
          </div>
          <div
            className={classes.openToggle}
            onClick={(e) => {
              e.preventDefault();
              e.currentTarget.parentElement?.classList.toggle(
                classes.collapsed
              );
            }}
          >
            <ChevronLeft />
          </div>
        </div>
      </div>
    );
  },
});
