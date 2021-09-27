import { useRecoilState } from "recoil";
import { CSSUnits } from "../GridTypes";
import { gapState } from "../state-logic/gridLayout/atoms";
import { CSSUnitInput } from "./CSSUnitInput";

const gapUnits: CSSUnits[] = ["rem", "px"];
export function GapSizeChooser() {
  const [gap, setGap] = useRecoilState(gapState);
  return <CSSUnitInput value={gap} onChange={setGap} units={gapUnits} />;
}
