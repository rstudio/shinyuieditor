import { useRecoilState } from "recoil";
import { CssUnitInput } from "./CssUnitInput";
import { SettingPane } from "./EditorSettings";
import { gapState } from "../state-logic/layout-updating-logic";

export function GapSizeSetting() {
  const [gap, setGap] = useRecoilState(gapState);
  return (
    <SettingPane label="Gap Size">
      <CssUnitInput value={gap} onChange={setGap} />
    </SettingPane>
  );
}
