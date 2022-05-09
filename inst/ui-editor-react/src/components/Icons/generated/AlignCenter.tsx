import * as React from "react";
import type { SVGProps } from "react";

const SvgAlignCenter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="currentColor"
    {...props}
  >
    <path d="M4.464 17.858h5.489V4.379H4.464zm8.506-2.739h5.494v-8H12.97z" />
  </svg>
);

export default SvgAlignCenter;
