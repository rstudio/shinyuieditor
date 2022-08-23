import classes from "./TabPanel.module.css";

const TabPanel: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className={classes.container} data-tab-id={title}>
      {children}
    </div>
  );
};

export default TabPanel;