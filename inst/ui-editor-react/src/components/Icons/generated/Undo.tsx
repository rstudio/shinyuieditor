import * as React from "react";
import type { SVGProps } from "react";

const SvgUndo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 44 40"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M17.08 8.115h-2.074L4.414 19.529v1.052L15.795 32.04H17.1v-5.954h14.072l-.105-11.975-13.988-.058V8.115Z"
    />
  </svg>
);

export default SvgUndo;
