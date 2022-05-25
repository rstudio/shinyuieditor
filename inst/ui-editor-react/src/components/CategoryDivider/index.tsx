import classes from "./styles.module.css";

function CategoryDivider({ category }: { category?: string }) {
  return (
    <div className={classes.categoryDivider}>
      <span>{category ? `${category}:` : null}</span>
    </div>
  );
}

export default CategoryDivider;
