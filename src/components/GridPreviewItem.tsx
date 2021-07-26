export default function GridPreviewItem(props: {
  rows: [number, number];
  cols: [number, number];
}) {
  return (
    <div
      className="grid-preview-item"
      style={{
        gridColumn: props.cols.join("/"),
        gridRow: props.rows.join("/"),
        backgroundColor: "var(--rstudio-blue, forestgreen)",
        borderRadius: "var(--corner-radius)",
      }}
    ></div>
  );
}
