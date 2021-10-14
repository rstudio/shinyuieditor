import { CSSUnitInput } from "components/CSSUnitInput";
import { useRecoilState } from "recoil";
import { gapState } from "state-logic/gridLayout/atoms";
import { CSSUnits } from "../GridTypes";

const gapUnits: CSSUnits[] = ["rem", "px"];
export function GapSizeChooser() {
  const [gap, setGap] = useRecoilState(gapState);
  return <CSSUnitInput value={gap} onChange={setGap} units={gapUnits} />;
}
