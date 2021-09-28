import { extendTheme } from "@chakra-ui/react";
import "./cssVariables.css";
export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "normal",
        color: "var(--rstudio-grey)",
      },
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        width: "100%",
        bg: "#edf2f7",
      },
      ".disable-text-selection *": {
        userSelect: "none",
      },
    },
  },
});
