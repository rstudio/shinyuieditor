import React from "react";

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const BsCard = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className = "", children, ...props }, ref) => {
    const combinedClasses = className + " card";
    return (
      <div ref={ref} className={combinedClasses} {...props}>
        {children}
      </div>
    );
  }
);

const BsCardHeader = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className = "", ...props }: DivProps, ref) => {
    const combinedClasses = className + " card-header";
    return <div ref={ref} className={combinedClasses} {...props} />;
  }
);

export { BsCard, BsCardHeader };
