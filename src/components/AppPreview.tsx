import classes from "./AppPreview.module.css";

export default function AppPreview({ url }: { url: string }) {
  return (
    <div className={classes.container}>
      <iframe
        className={classes.previewFrame}
        src={url}
        title="Application Preview"
      />
    </div>
  );
}
