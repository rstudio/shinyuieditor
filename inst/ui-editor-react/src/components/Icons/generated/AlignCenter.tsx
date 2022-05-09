import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignCenter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 22 22"
    {...props}
  >
    <path d="M4.464 17.858h5.489V4.379H4.464zm8.506-2.739h5.494v-8H12.97z" />
  </svg>
);

export default SvgAlignCenter;
