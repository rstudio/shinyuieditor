import { extendTheme } from "@chakra-ui/react";
import "./cssVariables.css";
const rstudio_blue = "#75aadb";
// const rstudio_grey = "#404040";
const rstudio_white = "#ffffff";

export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "normal",
        color: "var(--rstudio-grey)",
      },
    },
    Button: {
      variants: {
        main: {
          bg: rstudio_blue,
          color: rstudio_white,
        },
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
