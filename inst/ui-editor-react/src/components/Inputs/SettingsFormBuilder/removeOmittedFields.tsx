import type { NonOmittedFormInfo } from "./FormBuilder";
import type { FormInfo } from "./inputFieldTypes";

export function removeOmittedFields<Info extends FormInfo>(
  settingsInfo: Info
): {
  omitted: (keyof Info)[];
  nonOmittedFormInfo: NonOmittedFormInfo;
} {
  let omitted: (keyof Info)[] = [];

  let infoSansOmitted: Record<string, any> = {};

  for (let prop in settingsInfo) {
    if (settingsInfo[prop].inputType === "omitted") {
      omitted.push(prop);
    } else {
      infoSansOmitted[prop] = settingsInfo[prop];
    }
  }

  return {
    omitted,
    nonOmittedFormInfo: infoSansOmitted as NonOmittedFormInfo,
  };
}
