import React from "react";

import type { AppType } from "communication-types/src/AppInfo";

const outputTypes: AppType[] = ["SINGLE-FILE", "MULTI-FILE"];

const outputTypeLabel: Record<AppType, string> = {
  "SINGLE-FILE": "Single file mode",
  "MULTI-FILE": "Multi file mode",
};

export function OutputTypeForm({
  selectedOutput,
  setSelectedOutput,
}: {
  selectedOutput: AppType;
  setSelectedOutput: (o: AppType) => void;
}) {
  return (
    <form className="AppTypeForm">
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
