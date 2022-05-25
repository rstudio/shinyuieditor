import * as React from "react";
import type { SVGProps } from "react";

const SvgRedo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 49 40"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M27.42 8.115h2.074l10.592 11.414v1.052L28.705 32.04H27.4v-5.954H13.328l.105-11.975 13.988-.058V8.115Z"
    />
  </svg>
);

export default SvgRedo;
