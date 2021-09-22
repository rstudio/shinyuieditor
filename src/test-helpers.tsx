import React from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { fullAppState } from "./state-logic/gridLayout/atoms";
import layouts from "./assets/layouts";
import { render } from "./test-utils";

export function useInitializeToDefaultLayout(addLayout = true) {
  const setUpNewLayout = useSetRecoilState(fullAppState);
  React.useEffect(() => {
    if (addLayout) {
      setUpNewLayout(layouts[0]);
    }
  }, [setUpNewLayout, addLayout]);
}

export function renderWithRecoil(component: React.ReactNode) {
  return render(<RecoilRoot>{component}</RecoilRoot>);
}
