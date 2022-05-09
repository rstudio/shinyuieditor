import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignSpread = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={22}
    fill="currentColor"
    {...props}
  >
    <path d="M6.637 9.302h5.489V5.369H6.637zm4.265 8.067h5.494v-6.24h-5.494z" />
  </svg>
);

export default SvgAlignSpread;
