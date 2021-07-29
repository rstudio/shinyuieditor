import { FunctionComponent, JSX } from "preact";
import { useState } from "preact/hooks";
import {
  deparseCSSMeasure,
  parseCSSMeasure,
} from "../../helper-scripts/css-helpers";
import { CSSMeasure, CSSUnits } from "../../types";
import classes from "./style.module.css";

export const CssUnitInput: FunctionComponent<{
  startValue?: CSSMeasure | string;
  onChange: (value: CSSMeasure) => void;
}> = ({ startValue = "1fr", onChange }) => {
  const availableUnits = ["fr", "px", "rem", "auto"];

  const { count: startCount, unit: startUnit } = parseCSSMeasure(startValue);

  const [currentCount, updateCount] = useState(startCount);
  const [currentUnit, updateUnit] = useState(startUnit);

  const newValue = () => {
    onChange(deparseCSSMeasure({ count: currentCount, unit: currentUnit }));
  };

  const onSubmit: JSX.EventHandler<JSX.TargetedEvent<
    HTMLFormElement,
    Event
  >> = (e) => {
    newValue();
    e.preventDefault();
  };

  const onCountInput: JSX.EventHandler<JSX.TargetedEvent<
    HTMLInputElement,
    Event
  >> = (e) => {
    const target = e.target as HTMLInputElement;
    updateCount(Number(target.value));
  };

  const onUnitInput: JSX.EventHandler<JSX.TargetedEvent<
    HTMLSelectElement,
    Event
  >> = (e) => {
    const target = e.target as HTMLSelectElement;
    updateUnit(target.value as CSSUnits);
  };

  return (
    <form class={classes.form} onSubmit={onSubmit} onChange={newValue}>
      <input
        type="number"
        min={0}
        value={currentCount}
        step={1}
        onInput={onCountInput}
      ></input>
      <select value={currentUnit} onInput={onUnitInput}>
        {availableUnits.map((unit) => (
          <option value={unit}>{unit}</option>
        ))}
      </select>
    </form>
  );
};
