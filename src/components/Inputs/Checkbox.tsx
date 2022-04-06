import inputClasses from "./Inputs.module.css";

const Checkbox: React.FC<{
  label?: string;
  ariaLabel?: string;
  isChecked?: boolean;
  onChange: (newVal: boolean) => void;
  disabled?: boolean;
}> = ({
  label,
  ariaLabel,
  isChecked,
  onChange = (isChecked) => console.log(isChecked),
  disabled,
}) => {
  const mainCheckbox = (
    <input
      aria-label={ariaLabel ?? label ?? "Numeric Input"}
      type="checkbox"
      disabled={disabled}
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );

  return label !== undefined ? (
    <div className={inputClasses.container}>
      <label className={inputClasses.label}>{label}:</label>
      {mainCheckbox}
    </div>
  ) : (
    mainCheckbox
  );
};

export default Checkbox;
