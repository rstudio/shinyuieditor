import * as React from "react";

import type { CSSMeasure, ParsedCSSMeasure } from "./CSSMeasure";
import { parseCSSMeasure } from "./CSSMeasure";
import type { CSSUnits } from "./CSSUnitInput";
import { defaultCounts } from "./CSSUnitInput";

export function useCSSUnitState(initialValue: CSSMeasure) {
  const [cssValue, setCssValue] = React.useState<ParsedCSSMeasure>(
    parseCSSMeasure(initialValue)
  );
  const updateCount = React.useCallback(
    (newCount?: number) => {
      if (newCount === undefined) {
        if (cssValue.unit !== "auto") {
          throw new Error("Undefined count with auto units");
        }

        setCssValue({ unit: cssValue.unit, count: null });
        return;
      }
      if (cssValue.unit === "auto") {
        // eslint-disable-next-line no-console
        console.error("How did you change the count of an auto unit?");
        return;
      }

      setCssValue({ unit: cssValue.unit, count: newCount });
    },
    [cssValue.unit]
  );

  const updateUnit = React.useCallback((newUnit: CSSUnits) => {
    // All we're doing is changing the unit the count stays the same
    setCssValue((oldCSS) => {
      const oldUnit = oldCSS.unit;
      if (newUnit === "auto") {
        return {
          unit: newUnit,
          count: null,
        };
      }

      if (oldUnit === "auto") {
        return { unit: newUnit, count: defaultCounts[newUnit] };
      }

      return { unit: newUnit, count: oldCSS.count };
    });
  }, []);

  return {
    cssValue,
    updateCount,
    updateUnit,
  };
}