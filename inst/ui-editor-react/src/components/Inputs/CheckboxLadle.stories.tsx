import React from "react";

import CheckboxDefault from "./Checkbox";

export const Checkbox = CheckboxDefault;

export const CheckboxControlled = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <div>Current value is {checked ? "Checked" : "Unchecked"}</div>
      <CheckboxDefault
        isChecked={checked}
        onChange={setChecked}
        label="My Checkbox"
      />
    </>
  );
};
