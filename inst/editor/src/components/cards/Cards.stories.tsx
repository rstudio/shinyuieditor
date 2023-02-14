import React from "react";

import type { CardContainerProps } from "./CardContainer";
import { CardContainer } from "./CardContainer";

export const CardContainerShowcase = (opts: { props: CardContainerProps }) => {
  return (
    <div style={containerStyles}>
      <CardContainer {...opts.props}>
        <div>I'm a card child</div>
      </CardContainer>
    </div>
  );
};

const containerStyles: React.CSSProperties = {
  outline: "4px solid grey",
  width: "900px",
  height: "700px",
  padding: "0",
};

export default {
  title: "bslib Cards",
  component: CardContainerShowcase,
  args: {
    title: "My Card",
  },
};
