import type { SettingsInfo } from "./ArgumentInfo";
import type {
  InputComponentsOutput,
  SettingsInputsBuilderProps,
} from "./constructInputComponents";
import { constructInputComponents } from "./constructInputComponents";

export function SettingsFormBuilder<Info extends SettingsInfo>({
  renderInputs,
  ...inputArgs
}: SettingsInputsBuilderProps<Info> & {
  renderInputs?: (x: InputComponentsOutput<Info>) => JSX.Element;
}) {
  const inputComps = constructInputComponents(inputArgs);

  return (
    <form className="SettingsFormBuilder">
      {renderInputs ? (
        renderInputs(inputComps)
      ) : (
        <AutobuildFormContents {...inputComps} />
      )}
    </form>
  );
}

function AutobuildFormContents<Info extends SettingsInfo>({
  inputs,
  unknownArguments,
}: InputComponentsOutput<Info>) {
  return (
    <>
      {Object.values(inputs)}
      {unknownArguments ? (
        <section>
          <h3>Unknown arguments</h3>
          {unknownArguments}
        </section>
      ) : null}
    </>
  );
}
