import React from "react";

import { CardBody } from "./CardBody";
import type { CardContainerProps } from "./CardContainer";
import { CardContainer } from "./CardContainer";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";

export const CardContainerShowcase = (args: CardContainerProps) => {
  console.log("Rendering card", args);
  return <CardContainer {...args}></CardContainer>;
};

const card_styles = { height: "400px", width: "400px" } as const;

export default {
  title: "bslib Cards",
  component: CardContainerShowcase,
  args: {
    style: card_styles,
    header: (
      <CardHeader>
        <h2>Hi, I'm a card</h2>
      </CardHeader>
    ),
    body: (
      <CardBody>
        <div>I'm a card child</div>
      </CardBody>
    ),
    footer: <CardFooter>I'm the footer of this here card</CardFooter>,
  },
};

export const Empty = () => <CardContainer style={card_styles}></CardContainer>;
