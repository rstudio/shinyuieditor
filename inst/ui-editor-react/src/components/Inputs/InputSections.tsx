import React from "react";

import CategoryDivider from "components/CategoryDivider";

import inputClasses from "./Inputs.module.css";
import classes from "./InputSections.module.css";

export function WrappedSection({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className={classes.sectionContainer}>
      <CategoryDivider category={name} />
      <div className={classes.wrappedSection}>{children}</div>
    </div>
  );
}

export function InputSection({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className={classes.sectionContainer}>
      <CategoryDivider category={name} />
      <div className={classes.inputSection}>{children}</div>
    </div>
  );
}

export function InputLabel({ children }: { children: React.ReactNode }) {
  return <div className={inputClasses.label}>{children}</div>;
}
