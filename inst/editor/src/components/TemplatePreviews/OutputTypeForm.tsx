import React from "react";

import type { OutputType } from "communication-types";

const outputTypes: OutputType[] = ["SINGLE-FILE", "MULTI-FILE"];

const outputTypeLabel: Record<OutputType, string> = {
  "SINGLE-FILE": "Single file mode",
  "MULTI-FILE": "Multi file mode",
};

export function OutputTypeForm({
  selectedOutput,
  setSelectedOutput,
}: {
  selectedOutput: OutputType;
  setSelectedOutput: (o: OutputType) => void;
}) {
  return (
    <form className="OutputTypeForm">
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
