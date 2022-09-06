import "./styles.scss";

type OptionsDropdownProps<Option extends string> = {
  options: Option[];
  selected: Option;
  onChange: (sel: Option) => void;
};
export function OptionsDropdown<Option extends string>({
  options,
  selected,
  onChange,
}: OptionsDropdownProps<Option>) {
  return (
    <select
      className="OptionsDropdown"
      onChange={(e) => onChange(options[e.target.selectedIndex])}
      value={selected}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
