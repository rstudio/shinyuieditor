import React from "react";

interface BsCardProps extends React.ComponentPropsWithoutRef<"div"> {}

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

export { BsCard };
