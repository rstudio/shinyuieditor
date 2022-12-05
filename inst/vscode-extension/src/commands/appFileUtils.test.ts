import { validateAppFileName } from "./appFileUtils";

describe("Converts various potential app file names to valid file names", () => {
  test("All good name", () => {
    expect(validateAppFileName("app.R")).toEqual({
      valid: true,
      name: "app.R",
    });
  });

  test("Errors for incorrect name", () => {
    expect(validateAppFileName("app.js")).toEqual(
      expect.objectContaining({
        valid: false,
        msg: expect.stringMatching(/invalid file extension/i),
      })
    );

    expect(validateAppFileName("app.test.js")).toEqual(
      expect.objectContaining({
        valid: false,
        msg: expect.stringMatching(/invalid file extension/i),
      })
    );
  });

  test("Fills in extension if left off", () => {
    expect(validateAppFileName("myApp")).toEqual({
      valid: true,
      name: "myApp.R",
    });
  });

  test("Handles dangling dots", () => {
    expect(validateAppFileName("danglingDot.")).toEqual({
      valid: true,
      name: "danglingDot.R",
    });
  });

  test("Collapses spaces in names", () => {
    expect(validateAppFileName("multi word file name")).toEqual({
      valid: true,
      name: "multi-word-file-name.R",
    });
  });
});
