import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { DragDir } from "../../types";

const iconPaths = {
  topLeftArrow: "M19,17.59L17.59,19L7,8.41V15H5V5H15V7H8.41L19,17.59Z",
  bottomLeftArrow: "M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z",
  bottomRightArrow: "M5,6.41L6.41,5L17,15.59V9H19V19H9V17H15.59L5,6.41Z",
  topRightArrow: "M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z",
  move: "M22.67,12L18.18,16.5L15.67,14L17.65,12L15.67,10.04L18.18,7.53L22.67,12M12,1.33L16.47,5.82L13.96,8.33L12,6.35L10,8.33L7.5,5.82L12,1.33M12,22.67L7.53,18.18L10.04,15.67L12,17.65L14,15.67L16.5,18.18L12,22.67M1.33,12L5.82,7.5L8.33,10L6.35,12L8.33,13.96L5.82,16.47L1.33,12M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z",
  trashcan:
    "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
  settings:
    "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",
  instructions:
    "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z",
  items:
    "M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z",
  plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  minus: "M19,13H5V11H19V13Z",
  verticalDrag: "M21 11H3V9H21V11M21 13H3V15H21V13Z",
  horizontalDrag: "M11 21H9V3H11V21M15 3H13V21H15V3Z",
};

// export const VerticalDragIcon = () => (
//   <svg style="width:24px;height:24px" viewBox="0 0 24 24">
//     <path fill="currentColor" d="M21 11H3V9H21V11M21 13H3V15H21V13Z" />
//   </svg>
// );

// export const HorizontalDragIcon = () => (
//   <svg style="width:24px;height:24px;max-height:100%;" viewBox="0 0 24 24">
//     <path fill="currentColor" d="M11 21H9V3H11V21M15 3H13V21H15V3Z" />
//   </svg>
// );

// export const ClipboardIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
//   </svg>ex
// );

// export const CloseIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     viewBox="0 0 18 18"
//   >
//     <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
//   </svg>
// );

// export const UpdownIcon = () => (
//   <svg style="width:24px;height:24px" viewBox="0 0 24 24">
//     <path
//       fill="currentColor"
//       d="M17.45,17.55L12,23L6.55,17.55L7.96,16.14L11,19.17V4.83L7.96,7.86L6.55,6.45L12,1L17.45,6.45L16.04,7.86L13,4.83V19.17L16.04,16.14L17.45,17.55Z"
//     />
//   </svg>
// );

export type IconName = keyof typeof iconPaths;

const SvgIconImpl: FunctionalComponent<{ name?: IconName }> = ({
  name = "move",
}) => (
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d={iconPaths[name]} />
  </svg>
);
SvgIconImpl.displayName = "SvgIcon";
export const SvgIcon = memo(SvgIconImpl);

const DragDirToIcon: Record<DragDir, keyof typeof iconPaths> = {
  middle: "move",
  topLeft: "topLeftArrow",
  topRight: "topRightArrow",
  bottomLeft: "bottomLeftArrow",
  bottomRight: "bottomRightArrow",
  left: "horizontalDrag",
  right: "horizontalDrag",
  top: "verticalDrag",
  bottom: "verticalDrag",
};
export const DragIcon = memo(({ type }: { type: DragDir }) => {
  return <SvgIcon name={DragDirToIcon[type]} />;
});
