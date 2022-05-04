import CategoryHeader from "components/CategoryHeader";

import inputClasses from "./Inputs.module.css";
import classes from "./InputSections.module.css";

export const WrappedSection: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  return (
    <div className={classes.sectionContainer}>
      <CategoryHeader category={name} />
      <div className={classes.wrappedSection}>{children}</div>
    </div>
  );
};
export const InputSection: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  return (
    <div className={classes.sectionContainer}>
      <CategoryHeader category={name} />
      <div className={classes.inputSection}>{children}</div>
    </div>
  );
};

export const InputLabel: React.FC = ({ children }) => {
  return <div className={inputClasses.label}>{children}</div>;
};
