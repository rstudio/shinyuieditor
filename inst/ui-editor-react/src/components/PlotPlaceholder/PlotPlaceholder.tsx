import React from "react";

import { seqArray } from "utils/array-helpers";
import "./styles.scss";

const NUM_BARS = 11;

const bar_values = normalize(seqArray(NUM_BARS).map(Math.random)).map(
  (x) => `${Math.round(x * 100)}%`
);

export function PlotPlaceholder({
  title = <span>My Plot</span>,
}: {
  title?: React.ReactNode;
}) {
  return (
    <div className="PlotPlaceholder">
      <div className="plot">
        <div className="title">{title}</div>

        <div className="plot-body">
          {bar_values.map((val, i) => (
            <div
              className="bar"
              key={val}
              style={{ "--value": val } as React.CSSProperties}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function normalize(arr: number[]) {
  const MAX_VAL = 0.95;
  const MIN_VAL = 0.1;
  const RANGE_SCALE = MAX_VAL - MIN_VAL;
  let max: number = -Infinity;
  let min: number = Infinity;

  for (let x of arr) {
    max = Math.max(max, x);
    min = Math.min(min, x);
  }

  const range = max - min;

  const normalized = arr.map((x) => {
    return ((x - min) / range + MIN_VAL) * RANGE_SCALE;
  });

  return normalized;
}
