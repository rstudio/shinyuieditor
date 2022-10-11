import * as React from "react";
import type { SVGProps } from "react";

const SvgUpSpinnerButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 15 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m7.38.477 7.052 6.786H.328L7.38.477Z" fill="#75A8DB" />
  </svg>
);

export default SvgUpSpinnerButton;
