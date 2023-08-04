import { makeLabelId } from "ui-node-definitions/src/inputFieldTypes";
import type { InputComponentByType } from "ui-node-definitions/src/inputFieldTypes";

export function StringInput({
  id,
  label,
  value,
  onChange,
  longform,
}: InputComponentByType<"string">) {
  const common_props = {
    className: "SUE-Input",
    "aria-label": label,
    "aria-labelledby": makeLabelId(id),
    id,
    value,
    onChange: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const newValue = e.target.value;
      onChange(newValue);
    },
  };
  if (longform) {
    return <textarea {...common_props} className="h-24 w-100" />;
  }
  return <input {...common_props} type="text" />;
}
