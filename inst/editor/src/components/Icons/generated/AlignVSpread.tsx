import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignVSpread = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 22"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M2 19v-1h17v1zM2 3V2h17v1zm3 12.66v-4h11v4H5Zm0-6.33v-4h11v4z" />
  </svg>
);

export default SvgAlignVSpread;
