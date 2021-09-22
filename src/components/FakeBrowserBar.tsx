import * as React from "react";
import styled from "@emotion/styled";

const MenuBarContainer = styled.div({
  "--editor-radius": "var(--corner-radius, 1rem)",
  "--menu-bar-pad": "5px",
  "--menu-bar-height": "calc(100% - 2 * var(--menu-bar-pad))",
  "--buttons-container-width": "70px",
  "--button-diameter": "12px",
  "--button-color": "var(--rstudio-blue)",
  "--outline-color": "var(--light-grey)",
  "--border-type": "1px solid var(--outline-color)",
  width: "100%",
  height: "100%",
  borderBottom: "var(--border-type)",
  borderRadius: "var(--editor-radius) var(--editor-radius) 0 0",
  background: "var(--off-white)",
  display: "flex",
});

const ButtonContainer = styled.div({
  width: "var(--buttons-container-width)",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const BrowserButton = styled.div({
  background: "var(--button-color)",
  width: "var(--button-diameter)",
  height: "var(--button-diameter)",
  borderRadius: "calc(var(--button-diameter) / 2)",
});

const UrlBox = styled.div({
  width: "calc(100% - var(--buttons-container-width) - var(--menu-bar-pad))",
  marginTop: "var(--menu-bar-pad)",
  height: "var(--menu-bar-height)",
  border: "var(--border-type)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  fontFamily: "monospace",
  paddingLeft: "5px",
});

export const FakeBrowserBar = () => {
  return (
    <MenuBarContainer>
      <ButtonContainer>
        <BrowserButton />
        <BrowserButton />
        <BrowserButton />
      </ButtonContainer>
      <UrlBox>www.myShinyApp.com</UrlBox>
    </MenuBarContainer>
  );
};
