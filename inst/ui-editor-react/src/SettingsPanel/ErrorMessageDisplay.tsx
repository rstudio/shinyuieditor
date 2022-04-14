import classes from "./SettingsPanel.module.css";

export function ErrorMessageDisplay({ errorMsg }: { errorMsg: string | null }) {
  if (errorMsg) {
    return (
      <div>
        Input settings are not valid. The following errors were received:
        <div className={classes.validationErrorMsg}>{errorMsg}</div>
      </div>
    );
  }

  return null;
}
