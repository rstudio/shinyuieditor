import { extendTheme } from "@chakra-ui/react";

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
    colors: {
      "rstudio-blue": "green",
    },
    global: {
      // styles for the `body`
      body: {
        width: "100%",
        bg: "#edf2f7",
        "--rstudio-blue": "#75aadb",
        "--rstudio-grey": "#404040",
        "--rstudio-white": "#ffffff",
        "--light-grey": "#c4c4c4b2",
        "--header-height": "60px",
        "--shadow": `0.3px 1px 1.5px rgba(0, 0, 0, 0.11),
          0.9px 2.6px 3.4px rgba(0, 0, 0, 0.083),
          1.8px 5.3px 6.1px rgba(0, 0, 0, 0.075),
          3.7px 11px 11.2px rgba(0, 0, 0, 0.067),
          10px 30px 26px rgba(0, 0, 0, 0.051)`,
        "--selected-shadow": "inset 0px 0px 0px 3px var(--rstudio-grey)",
        "--selected-outline": "3px solid var(--rstudio-grey)",
        "--selection-color": "tomato",
        "--corner-radius": "5px",
        "--unit-input-width": "145px",
        "--card-header-height": "35px",
      },
      ".disable-text-selection *": {
        userSelect: "none",
      },
    },
  },
});
