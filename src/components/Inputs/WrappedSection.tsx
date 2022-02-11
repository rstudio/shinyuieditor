import classes from "./WrappedSection.module.css";
import inputClasses from "./Inputs.module.css";

const SectionLabel = ({ name }: { name: string }) => {
  return (
    <div className={inputClasses.sectionLabel}>
      <h2>{name}</h2>
      <div className={inputClasses.sectionLabelDash} />
    </div>
  );
};

const WrappedSection: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <div>
      <SectionLabel name={name} />
      <div className={classes.wrappedSection}>{children}</div>
    </div>
  );
};

export { WrappedSection };
