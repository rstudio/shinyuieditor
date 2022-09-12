import type { SettingsInfo } from "./ArgumentInfo";
import type {
  SettingsInputsBuilderProps,
  InputComponentsMap,
} from "./constructInputComponents";
import { constructInputComponents } from "./constructInputComponents";

export function SettingsFormBuilder<Info extends SettingsInfo>({
  renderInputs,
  ...inputArgs
}: SettingsInputsBuilderProps<Info> & {
  renderInputs?: (inputsComps: InputComponentsMap<Info>) => JSX.Element;
}) {
  const Inputs = constructInputComponents(inputArgs);

  return (
    <form className="SettingsFormBuilder">
      {renderInputs ? renderInputs(Inputs) : Object.values(Inputs)}
    </form>
  );
}
