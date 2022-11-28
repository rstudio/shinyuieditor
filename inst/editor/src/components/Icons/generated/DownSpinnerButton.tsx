import * as React from "react";
import type { SVGProps } from "react";

const SvgDownSpinnerButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 15 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.38 7.477 14.432.691H.328L7.38 7.477Z" fill="#75A8DB" />
  </svg>
);

export default SvgDownSpinnerButton;
