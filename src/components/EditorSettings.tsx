/** @jsxImportSource @emotion/react */

import { Box, Grid, StackDivider, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
export const EditorSettings: React.FC = ({ children }) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {children}
    </VStack>
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
