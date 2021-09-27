import { Box } from "@chakra-ui/react";
import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CSSMeasure } from "../GridTypes";
import {
  colsState,
  rowsState,
  TractDirection,
} from "../state-logic/gridLayout/atoms";
import { CSSUnitInput } from "./CSSUnitInput";
import { TractGutter } from "./TractGutter";

export function TractSizers({ dir }: { dir: TractDirection }) {
  const tracts = useRecoilValue(
    dir === "rows" ? rowsState : colsState
  ) as CSSMeasure[];

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
          marginLeft: `calc(-${pad} - ${sizeOfChooser})`,
        }
      : {
          position: "absolute",
          bottom: `calc(100% + ${pad})`,
          left: `calc(50% - ${sizeOfChooser}/2)`,
        };
  return (
    <>
      {tracts.map((size, index) => (
        <TractGutter key={dir + "sizer" + index} dir={dir} index={index}>
          <Box sx={placementStyles}>
            <CSSUnitInput
              value={size as CSSMeasure}
              w={sizeOfChooser}
              onChange={updateTract(index)}
            />
          </Box>
        </TractGutter>
      ))}
    </>
  );
}
