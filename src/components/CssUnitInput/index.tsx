import { FunctionComponent, JSX } from "preact";
import { useState } from "preact/hooks";

type CSSUnits = "fr" | "px" | "rem" | "auto";
type CSSMeasure = `${number}${CSSUnits}`;
export const CssUnitInput: FunctionComponent<{
  startCount?: number;
  startUnit?: CSSUnits;
  onChange: (value: CSSMeasure) => void;
}> = ({ startCount = 1, startUnit = "fr", onChange }) => {
  const availableUnits = ["fr", "px", "rem", "auto"];

  const [currentCount, updateCount] = useState(startCount);
  const [currentUnit, updateUnit] = useState(startUnit);
  
  const newValue = () => {
    onChange(`${currentCount}${currentUnit}`);
  }

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
    <form onSubmit={onSubmit} onChange={newValue} >
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
