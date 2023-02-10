import type { Raw_App_Info, Single_File_Raw_App_Info } from "ast-parsing";

import { generate_full_app_script } from "./generate_full_app_script";
import { raw_app_info_to_full } from "./raw_app_info_to_full";

describe("Single-File apps", () => {
  // It's super important the script and ast match eachother here.
  const raw_info: Single_File_Raw_App_Info = {
    app_type: "SINGLE-FILE",
    app: {
      script: `library(shiny)
  library(gridlayout)
  
  ui <- grid_page(
  layout = c(
    "A"
  ),
  row_sizes = c(
    "1fr"
  ),
  col_sizes = c(
    "1fr"
  ),
  gap_size = "10px",
  grid_card(area = "A")
  )
  
  server <- function(input, output) {
  print("I am a server function")
  }
  
  shinyApp(ui, server)
  `,
      ast: [
        {
          val: [
            { val: "library", type: "s" },
            { name: "package", val: "shiny", type: "s" },
          ],
          type: "e",
          pos: [1, 1, 1, 14],
        },
        {
          val: [
            { val: "library", type: "s" },
            { name: "package", val: "gridlayout", type: "s" },
          ],
          type: "e",
          pos: [2, 1, 2, 19],
        },
        {
          val: [
            { val: "<-", type: "s" },
            { val: "ui", type: "s" },
            {
              val: [
                { val: "grid_page", type: "s" },
                {
                  name: "layout",
                  val: [
                    { val: "c", type: "s" },
                    { val: "A", type: "c" },
                  ],
                  type: "e",
                },
                {
                  val: [
                    { val: "grid_card", type: "s" },
                    { name: "area", val: "A", type: "c" },
                  ],
                  type: "e",
                },
                {
                  name: "row_sizes",
                  val: [
                    { val: "c", type: "s" },
                    { val: "1fr", type: "c" },
                  ],
                  type: "e",
                },
                {
                  name: "col_sizes",
                  val: [
                    { val: "c", type: "s" },
                    { val: "1fr", type: "c" },
                  ],
                  type: "e",
                },
                { name: "gap_size", val: "10px", type: "c" },
              ],
              type: "e",
            },
          ],
          type: "e",
          pos: [4, 1, 16, 1],
        },
        {
          val: [
            { val: "<-", type: "s" },
            { val: "server", type: "s" },
            {
              val: [
                { val: "function", type: "s" },
                {
                  val: [
                    { name: "input", val: "", type: "s" },
                    { name: "output", val: "", type: "s" },
                  ],
                  type: "e",
                },
                {
                  val: [
                    { val: "{", type: "s", pos: [18, 35, 18, 35] },
                    {
                      val: [
                        { val: "print", type: "s" },
                        { name: "x", val: "I am a server function", type: "c" },
                      ],
                      type: "e",
                      pos: [19, 3, 19, 33],
                    },
                  ],
                  type: "e",
                },
              ],
              type: "e",
            },
          ],
          type: "e",
          pos: [18, 1, 20, 1],
        },
        {
          val: [
            { val: "shinyApp", type: "s" },
            { name: "ui", val: "ui", type: "s" },
            { name: "server", val: "server", type: "s" },
          ],
          type: "e",
          pos: [22, 1, 22, 20],
        },
      ],
    },
  };

  const full_info = raw_app_info_to_full(raw_info);

  test("Libraries", () => {
    expect(full_info).toEqual(
      expect.objectContaining({
        app: expect.objectContaining({
          libraries: ["shiny", "gridlayout"],
        }),
      })
    );
  });

  // test("Can convert back to code", () => {
  //   const back_to_script = generate_full_app_script(full_info);
  //   expect(back_to_script.app).toEqual(raw_info.app.script);
  // });
});
