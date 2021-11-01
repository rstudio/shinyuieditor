import { ChakraProvider } from "@chakra-ui/react";
import { addDecorator } from "@storybook/react";
import React from "react";
import "../src/cssVariables.css";
import { theme } from "../src/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((storyFn) => (
  <>
    <ChakraProvider theme={theme}>{storyFn()}</ChakraProvider>
  </>
));
