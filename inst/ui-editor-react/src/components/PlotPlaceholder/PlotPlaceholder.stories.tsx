import { PlotPlaceholder } from "./PlotPlaceholder";

export default {
  title: "PlotPlaceholder",
  component: PlotPlaceholder,
};

export const SizedPlaceholder = ({
  widthPx,
  heightPx,
}: {
  widthPx: number;
  heightPx: number;
}) => {
  return (
    <div
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        outline: "1px solid black",
      }}
    >
      <PlotPlaceholder title="myPlot" />
    </div>
  );
};

export const SizedArray = () => {
  const widths = [150, 300, 500];
  const heights = [100, 500];

  let plots: React.ReactNode[] = [];

  for (let h of heights) {
    for (let w of widths) {
      plots.push(
        <div
          key={`w${w}h${h}`}
          style={{
            width: `${w}px`,
            height: `${h}px`,
            outline: "1px solid black",
          }}
        >
          <PlotPlaceholder title={`w:${w}px, h:${h}px`} />
        </div>
      );
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: `repeat(${widths.length}, auto)`,
      }}
    >
      {plots}
    </div>
  );
};
