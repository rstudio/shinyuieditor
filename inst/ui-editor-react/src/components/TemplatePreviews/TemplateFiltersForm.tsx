import type { TemplateFilterState } from "./filterTemplates";
import { allLayoutTypes } from "./filterTemplates";
import type { LayoutType } from "./TemplatePreviewCard";

const layoutLabels: Record<LayoutType, string> = {
  grid: "Grid",
  navbarPage: "Tabs",
};

export function TemplateFiltersForm({
  filterState,
  setFilterState,
}: {
  filterState: TemplateFilterState;
  setFilterState: (s: TemplateFilterState) => void;
}) {
  const { layoutTypes } = filterState;
  return (
    <form
      className="TemplateFiltersForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset aria-label="App layout type filters">
        <legend>Show templates based on selected layouts:</legend>
        <div className="layout-options">
          {allLayoutTypes.map((layout) => {
            const displayName = layoutLabels[layout];
            const isSelected = layoutTypes.includes(layout);
            return (
              <div className="labeled-form-option" key={layout}>
                <input
                  type="checkbox"
                  id={`${layout}-choice`}
                  name={displayName}
                  value={layout}
                  checked={isSelected}
                  onChange={() => {
                    setFilterState({
                      ...filterState,
                      layoutTypes: isSelected
                        ? layoutTypes.filter((l) => l !== layout)
                        : [...layoutTypes, layout],
                    });
                  }}
                />
                <label htmlFor={`${layout}-choice`}>{displayName}</label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </form>
  );
}
