type AppName = `${string}.R`;
export const defaultAppName: AppName = "app.R";

// eslint-disable-next-line no-useless-escape
const nameRootRegex = /^([\w|\s]+)([\.[\w|^\.]*]*)$/i;
export function validateAppFileName(fileName: string):
  | { valid: true; name: AppName }
  | {
      valid: false;
      msg: string;
    } {
  if (fileName === "") {
    return {
      valid: true,
      name: defaultAppName,
    };
  }

  const nameRoot = fileName.match(nameRootRegex);

  if (nameRoot === null) {
    return {
      valid: false,
      msg: `Invalid app name: ${fileName}.`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [full, base, extension] = nameRoot;

  if (extension === "" || extension === ".") {
    extension = ".R";
  }

  if (!base) {
    return {
      valid: false,
      msg: `Invalid app name: ${fileName}. Make sure to only use numbers and letters. Spaces will be converted to dashes.`,
    };
  }

  if (extension !== ".R") {
    return {
      valid: false,
      msg: `Invalid file extension: ${extension}. Extension needs to be .R`,
    };
  }

  // Cleanup any potential spaces in app name
  base = base.replaceAll(" ", "-");

  return {
    valid: true,
    name: `${base}${extension}`,
  };
}

// To write a file we need to give the contents as a 8bit integer array. This
// just makes that array for an empty file
export const emptyAppContent = new TextEncoder().encode("");
