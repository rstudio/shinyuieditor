import inputClasses from "./Inputs.module.css";

const Checkbox: React.FC<{
  label?: string;
  ariaLabel?: string;
  title?: string;
  isChecked?: boolean;
  onChange: (newVal: boolean) => void;
  disabled?: boolean;
}> = ({
  label,
  ariaLabel,
  title,
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
      title={title}
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
