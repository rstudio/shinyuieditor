import React, { useEffect } from "react";
import { RecoilRoot, RecoilValue, useRecoilValue } from "recoil";
import { useInitializeToLayout } from "./state-logic/gridLayout/hooks";
import { render } from "./test-utils";

export function AppWLayout({
  children,
  layout = "default",
}: {
  children: React.ReactNode;
  layout: Parameters<typeof useInitializeToLayout>[0];
}) {
  useInitializeToLayout(layout);

  return <>{children}</>;
}

export function renderWithRecoil(component: React.ReactNode) {
  return render(<RecoilRoot>{component}</RecoilRoot>);
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
