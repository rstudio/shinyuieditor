import type { InputWidgetCommonProps } from "..";

export default function ListInput({
  name,
  label,
  value,
  onChange,
  noLabel = false,
  optional = false,
}: InputWidgetCommonProps<string[]> & {
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <h3>{name ?? label} options:</h3>
      {value?.map((x) => (
        <div>{x}</div>
      ))}
    </div>
  );
}
