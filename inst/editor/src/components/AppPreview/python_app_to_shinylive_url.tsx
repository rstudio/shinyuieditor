import LZString from "lz-string";

/**
 * Create a ShinyLive editor Url from a given app script
 */

export function pythonAppToShinyliveUrl(
  app_text: string,
  mode: "app" | "editor"
): string {
  const encoded_app = LZString.compressToEncodedURIComponent(
    JSON.stringify([
      {
        name: "app.py",
        content: app_text,
        type: "text",
      },
    ])
  );

  const url_prefix = mode === "app" ? appUrlPrefix : editorUrlPrefix;
  return url_prefix + "#code=" + encoded_app;
}
const editorUrlPrefix = "https://shinylive.io/py/editor/";
const appUrlPrefix = "https://shinylive.io/py/app/";
