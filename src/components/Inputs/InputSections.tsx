import inputClasses from "./Inputs.module.css";
import classes from "./InputSections.module.css";

export const SectionLabel = ({ name }: { name: string }) => {
  return (
    <div className={inputClasses.sectionLabel}>
      <h2>{name}</h2>
      <div className={inputClasses.sectionLabelDash} />
    </div>
  );
};

export const WrappedSection: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  return (
    <div>
      <SectionLabel name={name} />
      <div className={classes.wrappedSection}>{children}</div>
    </div>
  );
};
export const InputSection: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  return (
    <div>
      <SectionLabel name={name} />
      <div className={classes.inputSection}>{children}</div>
    </div>
  );
};

export const InputLabel: React.FC = ({ children }) => {
  return <div className={inputClasses.label}>{children}</div>;
};
