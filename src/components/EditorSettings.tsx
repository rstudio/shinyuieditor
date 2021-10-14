/** @jsxImportSource @emotion/react */
import { Box, Grid } from "@chakra-ui/react";
import * as React from "react";

export const EditorSettings: React.FC = ({ children }) => {
  return (
    <Grid
      gridTemplateColumns="auto auto"
      alignItems="center"
      justifyItems="end"
    >
      {children}
    </Grid>
  );
};

export const SettingPane: React.FC<{ label: string }> = ({
  label,
  children,
}) => {
  // Since the name is used as an id we can't be having spaces in it
  const name = `${label.replaceAll(" ", "-")}-setting`;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Box id={name}>{children}</Box>
    </>
  );
};
