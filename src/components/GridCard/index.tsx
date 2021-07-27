import "./style.css";

export function GridCard(props: { title: string; gridArea: string }) {
  return (
    <div className="grid-card" style={{ "--grid-area": props.gridArea }}>
      <h3>{props.title}</h3>
    </div>
  );
}
