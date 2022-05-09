import * as React from "react";
import type { SVGProps } from "react";

const SvgRedo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    {...props}
  >
    <path stroke="currentColor" d="M11.5 8.5h-7v5h7v4l6-6-6-7v4Z" />
  </svg>
);

export default SvgRedo;
