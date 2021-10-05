/** @jsxImportSource @emotion/react */
import { Heading } from "@chakra-ui/react";
import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import { HistoryNav } from "components/HistoryNav";
import * as React from "react";

export function TheHeader() {
  return (
    <header
      css={{
        padding: "0.25rem 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "var(--shadow)",
        background: "var(--rstudio-white, white)",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          "& > img": {
            display: "inline-block",
            margin: "0 1rem",
            height: "100%",
            borderRadius: "1rem",
            padding: "0.5rem",
          },
        }}
      >
        <Heading>Shiny Visual Editor</Heading>
        <img src={rstudioLogo} alt="RStudio Logo" />
        <img
          src={shinyLogo}
          css={{ backgroundColor: "var(--rstudio-blue, pink)" }}
          alt="Shiny Logo"
        />
      </div>
      <HistoryNav />
    </header>
  );
}
