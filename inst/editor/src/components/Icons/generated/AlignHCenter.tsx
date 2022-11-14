import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignHCenter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M2 2h1v17H2zm16 0h1v17h-1zM7.5 5h6v11h-6z" />
  </svg>
);

export default SvgAlignHCenter;
