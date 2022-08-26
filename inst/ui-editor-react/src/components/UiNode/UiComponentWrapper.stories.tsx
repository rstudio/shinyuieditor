import React from "react";

import Button from "components/Inputs/Button/Button";

import UiComponentWrapper from "./UiComponentWrapper";

export default {
  title: "UiComponentWrapper",
  component: UiComponentWrapper,
};

export const Primary = () => {
  //   const [list, setList] = React.useState<string[] | undefined>(["a", "b", "c"]);
  return (
    <UiComponentWrapper
      onClick={() => {
        console.log("Node was clicked!");
      }}
      path={[0, 1, 2]}
    >
      {/* Testing */}
      <div>I am a child of the wrapper</div>
    </UiComponentWrapper>
  );
};
