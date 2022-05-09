import * as React from "react";
import type { SVGProps } from "react";

const SvgUndo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    {...props}
  >
    <path stroke="currentColor" d="M10.5 8.5h7v5h-7v4l-6-6 6-7v4Z" />
  </svg>
);

export default SvgUndo;
