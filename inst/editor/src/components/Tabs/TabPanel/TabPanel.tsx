interface TabPanelProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
}

function TabPanel({ title, children, ...divProps }: TabPanelProps) {
  return (
    <div
      className="h-full bg-rstudio-white"
      data-tab-id={title}
      aria-label={`tab panel ${title}`}
      {...divProps}
    >
      {children}
    </div>
  );
}

export default TabPanel;
