import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M3 3h1v17H3zm3 3h6v11H6z" />
  </svg>
);

export default SvgAlignLeft;
