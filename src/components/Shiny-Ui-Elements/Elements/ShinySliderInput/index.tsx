import { UiComponentInfo } from "../uiNodeTypes";
import { ShinySliderInputProps } from "./arguments";
import { ShinySliderInputSettings } from "./SettingsPanel";
import sliderIcon from "assets/icons/shinySlider.png";
import ShinySliderInput from "./ShinySliderInput";

export const shinySliderInputInfo: UiComponentInfo<ShinySliderInputProps> = {
  title: "Slider Input",
  UiComponent: ShinySliderInput,
  SettingsComponent: ShinySliderInputSettings,
  acceptsChildren: false,
  defaultSettings: {
    inputId: "slider",
    label: "Slider",
    min: 0,
    value: 5,
    max: 10,
  },
  iconSrc: sliderIcon,
};

export default ShinySliderInput;
