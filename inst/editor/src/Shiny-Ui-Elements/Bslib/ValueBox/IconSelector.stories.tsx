// A simple storybook story for the IconSelector component

import { IconSelector } from "./IconSelector";

export default {
  title: "Icon Selector",
  component: IconSelector,
};

export const Primary = () => (
  <div
    style={{
      width: "100%",
      height: "90vh",
      outline: "1px solid grey",
      backgroundColor: "var(--light-grey)",
      padding: "50px",
      display: "grid",
      alignItems: "start",
      justifyItems: "center",

      position: "relative",
    }}
  >
    <IconSelector
      initialValue="circle"
      onIconSelect={(icon) => console.log(icon)}
    />
  </div>
);
