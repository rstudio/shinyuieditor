import { useRecoilState } from "recoil";
import type { GapStateAtom } from "../state-logic/gridLayout/atoms";
import { CssUnitInput } from "./CssUnitInput";

export function GapSizeSetting({gapAtom}:{gapAtom: GapStateAtom}) {
  const [gap, setGap] = useRecoilState(gapAtom);
  return <CssUnitInput value={gap} onChange={setGap} />;
}
