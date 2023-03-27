// A simple storybook story for the IconSelector component

import { IconSelector } from "./IconSelector";

export default {
  title: "Icon Selector",
  component: IconSelector,
};

export const Primary = () => (
  <div
    style={{
      width: "var(--layout-elements-panel-w, 200px)",
      height: "90vh",
      outline: "1px solid grey",
      backgroundColor: "var(--light-grey)",
    }}
  >
    <IconSelector onIconSelect={(icon) => console.log(icon)} />
  </div>
);
