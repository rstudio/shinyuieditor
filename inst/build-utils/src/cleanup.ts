import fs from "fs";
import path from "path";

import type esbuild from "esbuild";
import glob from "glob";

export function cleanup({
  outDir,
  pattern = "*",
  safelist = [],
}: {
  outDir: string;
  pattern?: string;
  safelist: string[];
}): esbuild.Plugin {
  return {
    name: "esbuild:cleanup",
    setup(build) {
      const safelistSet = new Set<string>(safelist);
      build.onEnd(async (result) => {
        if (result.metafile === undefined) {
          console.error(
            "No metafile present so we don't know what files to safely delete. " +
              "Add metafile: true to your build config."
          );
          return;
        }

        Object.keys(result.metafile.outputs).forEach((path) =>
          safelistSet.add(path)
        );

        await glob(path.join(outDir, pattern), (err, files) => {
          files.forEach((path) => {
            if (!safelistSet.has(path))
              fs.unlink(path, (err) => {
                if (err) {
                  console.error("Error deleting file", err);
                }
              });
          });
        });
      });
    },
  };
}
