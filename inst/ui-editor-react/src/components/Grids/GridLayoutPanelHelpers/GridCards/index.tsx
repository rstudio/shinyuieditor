import React from "react";

export interface BsCardProps extends React.ComponentPropsWithoutRef<"div"> {}

const BsCard = React.forwardRef<HTMLDivElement, BsCardProps>(
  ({ className = "", children, ...props }, ref) => {
    const combinedClasses = className + " card";
    return (
      <div ref={ref} className={combinedClasses} {...props}>
        {children}
      </div>
    );
  }
);

const BsCardHeader = React.forwardRef<HTMLDivElement, BsCardProps>(
  ({ className = "", ...props }, ref) => {
    const combinedClasses = className + " card-header";
    return <div ref={ref} className={combinedClasses} {...props} />;
  }
);

export { BsCard, BsCardHeader };
