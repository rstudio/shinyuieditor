import React from "react";

import type { App_Type } from "communication-types/src/AppInfo";

const outputTypes: App_Type[] = ["SINGLE-FILE", "MULTI-FILE"];

const outputTypeLabel: Record<App_Type, string> = {
  "SINGLE-FILE": "Single file mode",
  "MULTI-FILE": "Multi file mode",
};

export function OutputTypeForm({
  selectedOutput,
  setSelectedOutput,
}: {
  selectedOutput: App_Type;
  setSelectedOutput: (o: App_Type) => void;
}) {
  return (
    <form className="App_TypeForm">
      <legend>Generate app in:</legend>
      {outputTypes.map((outputType) => {
        const outputLabel = outputTypeLabel[outputType];
        return (
          <div className="labeled-form-option" key={outputType}>
            <input
              type="radio"
              id={`${outputType}-choice`}
              name={outputLabel}
              value={outputType}
              checked={outputType === selectedOutput}
              onChange={(e) => setSelectedOutput(outputType)}
            />
            <label htmlFor={`${outputType}-choice`}>{outputLabel}</label>
          </div>
        );
      })}
    </form>
  );
}
