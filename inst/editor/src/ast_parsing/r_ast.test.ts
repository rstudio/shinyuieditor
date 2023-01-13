import type { R_AST } from "./r_ast";
import { create_unknownUiFunction } from "./r_ast";
import { get_ui_assignment_node } from "./r_ast";

const app_ast: R_AST = [
  { val: [{ val: "library" }, { val: "shiny" }], pos: [1, 1, 1, 14] },
  { val: [{ val: "library" }, { val: "gridlayout" }], pos: [2, 1, 2, 19] },
  {
    val: [
      { val: "<-" },
      { val: "ui" },
      {
        val: [
          { val: "grid_page" },
          {
            name: "layout",
            val: [
              { val: "c" },
              { val: "header  header  " },
              { val: "sidebar bluePlot" },
              { val: "" },
            ],
          },
          {
            name: "row_sizes",
            val: [{ val: "c" }, { val: "125px" }, { val: "1fr" }],
          },
          {
            name: "col_sizes",
            val: [{ val: "c" }, { val: "735px" }, { val: "1fr" }],
          },
          { name: "gap_size", val: "1rem" },
          {
            val: [
              { val: "grid_card" },
              { name: "area", val: "sidebar" },
              { name: "item_alignment", val: "top" },
              { name: "title", val: "Settings" },
              { name: "item_gap", val: "12px" },
              {
                val: [
                  { val: "sliderInput" },
                  { name: "inputId", val: "bins" },
                  { name: "label", val: "Number of Bins" },
                  { name: "min", val: 12 },
                  { name: "max", val: 100 },
                  { name: "value", val: 30 },
                  {
                    name: "animate",
                    val: [
                      { val: "animationOptions" },
                      { name: "interval", val: 1000 },
                      { name: "loop", val: false },
                      { name: "playButton", val: "play" },
                      { name: "pauseButton", val: "pause" },
                    ],
                  },
                  { name: "width", val: "100%" },
                ],
              },
            ],
          },
          {
            val: [
              { val: "grid_card_text" },
              { name: "area", val: "header" },
              { name: "content", val: "Single File App" },
              { name: "alignment", val: "start" },
              { name: "is_title", val: false },
            ],
          },
          {
            val: [{ val: "grid_card_plot" }, { name: "area", val: "bluePlot" }],
          },
          { val: "" },
        ],
      },
    ],
    pos: [6, 1, 47, 1],
  },
  {
    val: [{ val: "<-" }, { val: "other_ui" }, { val: "hello there" }],
    pos: [49, 1, 49, 25],
  },
  {
    val: [
      { val: "<-" },
      { val: "server" },
      {
        val: [
          { val: "function" },
          {
            val: [
              { name: "input", val: "" },
              { name: "output", val: "" },
            ],
          },
          {
            val: [
              { val: "{", pos: [52, 35, 52, 35] },
              {
                val: [
                  { val: "<-" },
                  {
                    val: [{ val: "$" }, { val: "output" }, { val: "bluePlot" }],
                  },
                  {
                    val: [
                      { val: "renderPlot" },
                      {
                        val: [
                          { val: "{", pos: [54, 33, 54, 33] },
                          {
                            val: [
                              { val: "<-" },
                              { val: "x" },
                              {
                                val: [
                                  { val: "[" },
                                  { val: "faithful" },
                                  { val: "" },
                                  { val: 2 },
                                ],
                              },
                            ],
                            pos: [56, 5, 56, 25],
                          },
                          {
                            val: [
                              { val: "<-" },
                              { val: "bins" },
                              {
                                val: [
                                  { val: "seq" },
                                  { val: [{ val: "min" }, { val: "x" }] },
                                  { val: [{ val: "max" }, { val: "x" }] },
                                  {
                                    name: "length.out",
                                    val: [
                                      { val: "+" },
                                      {
                                        val: [
                                          { val: "$" },
                                          { val: "input" },
                                          { val: "bins" },
                                        ],
                                      },
                                      { val: 1 },
                                    ],
                                  },
                                ],
                              },
                            ],
                            pos: [57, 5, 57, 60],
                          },
                          {
                            val: [
                              { val: "hist" },
                              { val: "x" },
                              { name: "breaks", val: "bins" },
                              { name: "col", val: "steelblue" },
                              { name: "border", val: "white" },
                            ],
                            pos: [60, 5, 60, 63],
                          },
                        ],
                      },
                    ],
                  },
                ],
                pos: [54, 3, 61, 4],
              },
            ],
          },
        ],
      },
    ],
    pos: [52, 1, 63, 1],
  },
  {
    val: [{ val: "shinyApp" }, { val: "ui" }, { val: "server" }],
    pos: [65, 1, 65, 20],
  },
];

describe("Parse app UI", () => {
  test("Can find ui node", () => {
    expect(get_ui_assignment_node(app_ast).val[0].val).toBe("grid_page");
  });
});

describe("Can build unknown nodes", () => {
  const unknown_ast_node = {
    name: "animate",
    val: [
      { val: "animationOptions" },
      { name: "interval", val: 1000 },
      { name: "loop", val: false },
      { name: "playButton", val: "play" },
      { name: "pauseButton", val: "pause" },
    ],
  };

  const unknown_ast_node_parsed = create_unknownUiFunction(unknown_ast_node);

  test("Builds unknown ui node ui node", () => {
    expect(unknown_ast_node_parsed.uiArguments.text).toBe("animationOptions");
  });
});
