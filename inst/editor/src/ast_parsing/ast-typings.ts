import type { R_AST } from "./r_ast";

const app_ast: R_AST = [
  { val: [{ val: "library" }, { val: "plotly" }], pos: [1, 1, 1, 15] },
  { val: [{ val: "library" }, { val: "shiny" }], pos: [2, 1, 2, 14] },
  { val: [{ val: "library" }, { val: "gridlayout" }], pos: [3, 1, 3, 19] },
  { val: [{ val: "library" }, { val: "DT" }], pos: [4, 1, 4, 11] },
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
              { val: "sidebar area4   " },
              { val: "table   bluePlot" },
              { val: "table   bluePlot" },
            ],
          },
          {
            name: "row_sizes",
            val: [
              { val: "c" },
              { val: "125px" },
              { val: "1fr" },
              { val: "1fr" },
              { val: "1fr" },
            ],
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
            val: [
              { val: "grid_card" },
              { name: "area", val: "table" },
              { name: "item_alignment", val: "center" },
              { name: "title", val: "Table" },
              { name: "scrollable", val: true },
              { name: "item_gap", val: "12px" },
              {
                val: [
                  { val: "DTOutput" },
                  { name: "outputId", val: "myTable" },
                  { name: "width", val: "100%" },
                ],
              },
            ],
          },
          {
            val: [{ val: "grid_card_plot" }, { name: "area", val: "bluePlot" }],
          },
          {
            val: [
              { val: "grid_card" },
              { name: "area", val: "area4" },
              {
                val: [
                  { val: "plotlyOutput" },
                  { name: "outputId", val: "distPlot" },
                  { name: "width", val: "100%" },
                  { name: "height", val: "100%" },
                ],
              },
            ],
          },
        ],
      },
    ],
    pos: [8, 1, 72, 1],
  },
  {
    val: [{ val: "<-" }, { val: "other_ui" }, { val: "hello there" }],
    pos: [75, 1, 75, 25],
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
              { val: "{", pos: [78, 35, 78, 35] },
              {
                val: [
                  { val: "<-" },
                  {
                    val: [{ val: "$" }, { val: "output" }, { val: "distPlot" }],
                  },
                  {
                    val: [
                      { val: "renderPlotly" },
                      {
                        val: [
                          { val: "{", pos: [80, 35, 80, 35] },
                          {
                            val: [
                              { val: "plot_ly" },
                              {
                                name: "x",
                                val: [
                                  { val: "~" },
                                  {
                                    val: [
                                      { val: "[" },
                                      { val: "faithful" },
                                      { val: "" },
                                      { val: 2 },
                                    ],
                                  },
                                ],
                              },
                              { name: "type", val: "histogram" },
                            ],
                            pos: [82, 5, 82, 51],
                          },
                        ],
                      },
                    ],
                  },
                ],
                pos: [80, 3, 86, 4],
              },
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
                          { val: "{", pos: [88, 33, 88, 33] },
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
                            pos: [90, 5, 90, 25],
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
                            pos: [91, 5, 91, 60],
                          },
                          {
                            val: [
                              { val: "hist" },
                              { val: "x" },
                              { name: "breaks", val: "bins" },
                              { name: "col", val: "steelblue" },
                              { name: "border", val: "white" },
                            ],
                            pos: [94, 5, 94, 63],
                          },
                        ],
                      },
                    ],
                  },
                ],
                pos: [88, 3, 95, 4],
              },
              {
                val: [
                  { val: "<-" },
                  {
                    val: [{ val: "$" }, { val: "output" }, { val: "myTable" }],
                  },
                  {
                    val: [
                      { val: "renderDT" },
                      {
                        val: [
                          { val: "{", pos: [99, 5, 99, 5] },
                          {
                            val: [
                              { val: "head" },
                              { val: "faithful" },
                              { val: 10 },
                            ],
                            pos: [100, 7, 100, 24],
                          },
                        ],
                      },
                    ],
                  },
                ],
                pos: [98, 3, 102, 3],
              },
            ],
          },
        ],
      },
    ],
    pos: [78, 1, 103, 1],
  },
  {
    val: [{ val: "shinyApp" }, { val: "ui" }, { val: "server" }],
    pos: [105, 1, 105, 20],
  },
];
