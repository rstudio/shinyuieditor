import classes from "./styles.module.css";

function CategoryDivider({ children }: { children: React.ReactNode }) {
  return <div className={classes.categoryDivider}>{children}</div>;
}

export default CategoryDivider;
