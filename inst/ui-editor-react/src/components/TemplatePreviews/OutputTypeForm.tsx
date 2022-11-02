import React from "react";

export type OutputType = "single-file" | "multi-file";
const outputTypes: OutputType[] = ["single-file", "multi-file"];

const outputTypeLabel: Record<OutputType, string> = {
  "single-file": "Single file mode",
  "multi-file": "Multi file mode",
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
