export function GridPreviewItem(props: {
  rows: [number, number];
  cols: [number, number];
}) {
  return (
    <div
      style={{
        gridColumn: props.cols.join("/"),
        gridRow: props.rows.join("/"),
        backgroundColor: "var(--rstudio-blue, forestgreen)",
        borderRadius: "var(--corner-radius)",
      }}
    ></div>
  );
}
