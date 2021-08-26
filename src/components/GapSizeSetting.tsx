import { useRecoilState } from "recoil";
import { gapState } from "../state-logic/recoilAtoms";
import { CssUnitInput } from "./CssUnitInput";
import { SettingPane } from "./EditorSettings";

export function GapSizeSetting() {
  const [gap, setGap] = useRecoilState(gapState);
  return (
    <SettingPane label="Gap Size">
      <CssUnitInput value={gap} onChange={setGap} />
    </SettingPane>
  );
}
