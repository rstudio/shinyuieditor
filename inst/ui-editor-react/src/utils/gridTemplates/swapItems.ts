import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import produce from "immer";

function swapItems(
  originalTemplate: TemplatedGridProps,
  { item_a, item_b }: { item_a: string; item_b: string }
): TemplatedGridProps {
  // Swapping an item with itself is a no-op
  if (item_a === item_b) return originalTemplate;

  return produce(originalTemplate, (template) => {
    const { n_rows, n_cols } = getLayoutDimensions(template.areas);

    let saw_a = false;
    let saw_b = false;
    // i and j are in 0-indexed coordinates where as {row,col}{Start,End} are in
    // grid coordinates, hence the funky bounds math.
    for (let row_index = 0; row_index < n_rows; row_index++) {
      const row = template.areas[row_index];
      for (let col_index = 0; col_index < n_cols; col_index++) {
        const item_name = row[col_index];

        if (item_name === item_a) {
          row[col_index] = item_b;
          saw_a = true;
        } else if (item_name === item_b) {
          row[col_index] = item_a;
          saw_b = true;
        }
      }
    }

    if (!saw_a || !saw_b) {
      throw new Error(
        `Attempted an invalid swap. ` +
          (saw_a ? "" : `Item "${item_a}" is not in layout.`) +
          (saw_b ? "" : `Item "${item_b}" is not in layout.`)
      );
    }
  });
}
export default swapItems;

function getLayoutDimensions(areas: TemplatedGridProps["areas"]): {
  n_rows: number;
  n_cols: number;
} {
  const n_rows = areas.length;
  const n_cols = areas[0].length;
  return { n_rows, n_cols };
}
