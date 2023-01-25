export function LabeledInputCategory({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="LabeledInputCategory">
      <div className="divider-line">
        <label>{label}</label>
      </div>

      <section className="grouped-inputs">{children}</section>
      <div className="divider-line" />
    </div>
  );
}
