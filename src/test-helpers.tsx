import React, { useEffect } from "react";
import {
  RecoilRoot,
  RecoilValue,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import layouts from "./assets/layouts";
import { MainGridCSSVariables } from "./components/MainGridCSSVariables";
import { GridLayoutTemplate } from "./GridTypes";
import { fullAppState } from "./state-logic/gridLayout/atoms";
import { render } from "./test-utils";

type LayoutInitialization = "default" | "none" | GridLayoutTemplate;
export function useInitializeToDefaultLayout(
  layout: LayoutInitialization = "default"
) {
  const setUpNewLayout = useSetRecoilState(fullAppState);
  React.useEffect(() => {
    if (layout === "default") {
      setUpNewLayout(layouts[0]);
    } else if (layout !== "none") {
      setUpNewLayout(layout);
    }
  }, [setUpNewLayout, layout]);
}

export function renderWithRecoil(component: React.ReactNode) {
  return render(<RecoilRoot>{component}</RecoilRoot>);
}

export function AppWLayout({
  children,
  layout = "default",
}: {
  children: React.ReactNode;
  layout: LayoutInitialization;
}) {
  useInitializeToDefaultLayout(layout);

  return (
    <>
      <MainGridCSSVariables />
      {children}
    </>
  );
}

export function RecoilObserver<T>({
  node,
  onChange,
}: {
  node: RecoilValue<T>;
  onChange: (value: any) => void;
}) {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
}
