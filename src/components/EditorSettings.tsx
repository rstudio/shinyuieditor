/** @jsxImportSource @emotion/react */

import { Box, Grid, Text } from "@chakra-ui/react";
import * as React from "react";
import { GridCard } from "./GridCard";
export const EditorSettings: React.FC = ({ children }) => {
  return (
    <GridCard title="Settings" icon="settings" gridArea="settings">
      {children}
    </GridCard>
  );
};

export const SettingPane: React.FC<{ label: string }> = ({
  label,
  children,
}) => (
  <Grid h="40px" gridTemplateColumns="1fr 2fr" alignItems="center">
    <Text>{label}</Text>
    <Box>{children}</Box>
  </Grid>
);
