import { useRecoilState } from "recoil";
import { gapState } from "../state-logic/gridLayoutAtoms";
import { CssUnitInput } from "./CssUnitInput";

export function GapSizeSetting() {
  const [gap, setGap] = useRecoilState(gapState);
  return <CssUnitInput value={gap} onChange={setGap} />;
}
