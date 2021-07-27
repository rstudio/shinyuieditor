import "./style.css";

export function GridCard(props: { title: string; gridArea: string }) {
  return (
    <div className="grid-card" style={{ "--grid-area": props.gridArea }}>
      <h3 className="grid-card--title">{props.title}</h3>
    </div>
  );
}
