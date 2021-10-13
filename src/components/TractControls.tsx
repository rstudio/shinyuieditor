import { Box, IconButton } from "@chakra-ui/react";
import { CSSUnitInput } from "components/CSSUnitInput";
import { TractGutter } from "components/TractGutter";
import * as React from "react";
import { FaTrash } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  colsState,
  rowsState,
  TractDirection,
} from "state-logic/gridLayout/atoms";
import useRemoveTract from "state-logic/tractDeletion";
import { CSSMeasure } from "../GridTypes";

export function TractControls({ dir }: { dir: TractDirection }) {
  const isRows = dir === "rows";
  const tracts = useRecoilValue(isRows ? rowsState : colsState);

  const setTractSizes = useSetRecoilState(isRows ? rowsState : colsState);
  const removeTract = useRemoveTract();

  if (tracts.length === 0) return null;

  const updateTract = (index: number) => (newValue: CSSMeasure) => {
    setTractSizes((tracts) => {
      const updatedTracts = [...tracts];
      updatedTracts[index] = newValue;
      return updatedTracts;
    });
  };

  const gridTemplates = `25px 1fr`;
  const sideOffset = "calc(100% + var(--main-gap)/2)";
  const commonStyles = {
    display: "grid",
    position: "absolute",
  };
  const placementStyles = isRows
    ? {
        height: "100%",
        right: sideOffset,
        width: `calc(var(--row-controls-gap) + var(--main-gap))`,
        gridTemplateColumns: gridTemplates,
        alignItems: "center",
      }
    : {
        width: "100%",
        bottom: sideOffset,
        height: `calc(var(--col-controls-gap) +  var(--main-gap))`,
        gridTemplateRows: gridTemplates,
        justifyItems: "center",
      };

  const singularDir = isRows ? "row" : "column";
  return (
    <>
      {tracts.map((size, index) => (
        <TractGutter key={dir + "sizer" + index} dir={dir} index={index}>
          <Box sx={{ ...commonStyles, ...placementStyles }}>
            <IconButton
              variant="ghost"
              w={isRows ? "100%" : "auto"}
              minW={isRows ? "100%" : "auto"}
              h={isRows ? "auto" : "100%"}
              minH={isRows ? "auto" : "100%"}
              aria-label={`Delete ${singularDir} ${index}`}
              icon={<FaTrash />}
              onClick={() => removeTract(dir, index)}
            />
            <CSSUnitInput
              value={size}
              w="100%"
              onChange={updateTract(index)}
              label={`Set size of ${singularDir} ${index}`}
            />
          </Box>
        </TractGutter>
      ))}
    </>
  );
}
