import { Box } from "@chakra-ui/react";
import { CSSUnitInput } from "components/CSSUnitInput";
import { TractGutter } from "components/TractGutter";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  colsState,
  rowsState,
  TractDirection,
} from "state-logic/gridLayout/atoms";
import { CSSMeasure } from "../GridTypes";

export function TractSizers({ dir }: { dir: TractDirection }) {
  const tracts = useRecoilValue(dir === "rows" ? rowsState : colsState);

  const setTractSizes = useSetRecoilState(
    dir === "rows" ? rowsState : colsState
  );

  if (tracts.length === 0) return null;

  const updateTract = (index: number) => (newValue: CSSMeasure) => {
    setTractSizes((tracts) => {
      const updatedTracts = [...tracts];
      updatedTracts[index] = newValue;
      return updatedTracts;
    });
  };

  const pad = "5px";
  const sizeOfChooser = "125px";
  const placementStyles =
    dir === "rows"
      ? {
          alignSelf: "center",
          width: sizeOfChooser, // Otw it's full width and blocks click events
          marginLeft: `calc(-${pad} - ${sizeOfChooser})`,
        }
      : {
          position: "absolute",
          bottom: `calc(100% + ${pad})`,
          left: `calc(50% - ${sizeOfChooser}/2)`,
        };

  const singularDir = dir === "rows" ? "row" : "column";
  return (
    <>
      {tracts.map((size, index) => (
        <TractGutter key={dir + "sizer" + index} dir={dir} index={index}>
          <Box sx={placementStyles}>
            <CSSUnitInput
              value={size}
              w={sizeOfChooser}
              onChange={updateTract(index)}
              label={`Set size of ${singularDir} ${index}`}
            />
          </Box>
        </TractGutter>
      ))}
    </>
  );
}
