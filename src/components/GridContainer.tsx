/** @jsxImportSource @emotion/react */
import * as CSS from "csstype";
import * as React from "react";

export function GridContainer({
  cols,
  rows,
  gap,
  className,
  styles: extraStyles,
  divRef,
  children,
}: {
  cols?: string[];
  rows?: string[];
  gap: string;
  className?: string;
  styles?: CSS.Properties;
  divRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}) {
  const fullStyles = {
    ...extraStyles,
    "--gap": gap,
  };
  if (rows) fullStyles.gridTemplateRows = rows.join("");
  if (cols) fullStyles.gridTemplateColumns = cols.join("");

  return (
    <div ref={divRef} css={fullStyles} className={className}>
      {children}
    </div>
  );
}

const twoColGridDefs = { cols: ["1fr", "1fr"], gap: "0.5rem" };
const twoColGridStyles = { alignItems: "center" };
export const TwoColumnGrid: React.FC = ({ children }) => {
  return (
    <GridContainer {...twoColGridDefs} styles={twoColGridStyles}>
      {children}
    </GridContainer>
  );
};
