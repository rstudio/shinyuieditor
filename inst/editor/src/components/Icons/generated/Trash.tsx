import * as React from "react";
import type { SVGProps } from "react";

const SvgTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 20"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M0 4h16"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      d="M5.5 6.5 6 16m2-9.5V16m2.5-9.5L10 16"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.5 4.5v-2l1.5-1h2l1.5 1v2m-8 0 .5 12 1.5 2h7l1.5-2 .5-12"
    />
  </svg>
);

export default SvgTrash;
