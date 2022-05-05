import classes from "./styles.module.css";

function CategoryHeader({ category }: { category: string }) {
  return (
    <div className={classes.categoryHeader}>
      <span>{category}</span>
    </div>
  );
}

export default CategoryHeader;
