import type { R_AST } from "./r_ast";
import { get_server_fn } from "./r_ast";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const test_app_ast: R_AST = [
  {
    val: [
      { val: "library", type: "s" },
      { val: "shiny", type: "s" },
    ],
    type: "e",
    pos: [1, 1, 1, 14],
  },
  {
    val: [
      { val: "library", type: "s" },
      { val: "gridlayout", type: "s" },
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
              { val: "header  header  ", type: "c" },
              { val: "sidebar bluePlot", type: "c" },
            ],
            type: "e",
          },
          {
            name: "row_sizes",
            val: [
              { val: "c", type: "s" },
              { val: "125px", type: "c" },
              { val: "1fr", type: "c" },
            ],
            type: "e",
          },
          {
            name: "col_sizes",
            val: [
              { val: "c", type: "s" },
              { val: "735px", type: "c" },
              { val: "1fr", type: "c" },
            ],
            type: "e",
          },
          { name: "gap_size", val: "1rem", type: "c" },
          {
            val: [
              { val: "grid_card", type: "s" },
              { name: "area", val: "sidebar", type: "c" },
              { name: "item_alignment", val: "top", type: "c" },
              { name: "title", val: "Settings", type: "c" },
              { name: "item_gap", val: "12px", type: "c" },
              {
                val: [
                  { val: "sliderInput", type: "s" },
                  { name: "inputId", val: "bins", type: "c" },
                  { name: "label", val: "Number of Bins", type: "c" },
                  { name: "min", val: 12, type: "n" },
                  { name: "max", val: 100, type: "n" },
                  { name: "value", val: 30, type: "n" },
                  {
                    name: "animate",
                    val: [
                      { val: "animationOptions", type: "s" },
                      { name: "interval", val: 1000, type: "n" },
                      { name: "loop", val: false, type: "b" },
                      { name: "playButton", val: "play", type: "c" },
                      { name: "pauseButton", val: "pause", type: "c" },
                    ],
                    type: "e",
                  },
                  { name: "width", val: "100%", type: "c" },
                ],
                type: "e",
              },
            ],
            type: "e",
          },
          {
            val: [
              { val: "grid_card_text", type: "s" },
              { name: "area", val: "header", type: "c" },
              { name: "content", val: "Single File App", type: "c" },
              { name: "alignment", val: "start", type: "c" },
              { name: "is_title", val: false, type: "b" },
            ],
            type: "e",
          },
          {
            val: [
              { val: "grid_card_plot", type: "s" },
              { name: "area", val: "bluePlot", type: "c" },
            ],
            type: "e",
          },
        ],
        type: "e",
      },
    ],
    type: "e",
    pos: [6, 1, 47, 1],
  },
  {
    val: [
      { val: "<-", type: "s" },
      { val: "other_ui", type: "s" },
      { val: "hello there", type: "c" },
    ],
    type: "e",
    pos: [49, 1, 49, 25],
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
              { val: "{", type: "s", pos: [52, 35, 52, 35] },
              {
                val: [
                  { val: "<-", type: "s" },
                  {
                    val: [
                      { val: "$", type: "s" },
                      { val: "output", type: "s" },
                      { val: "bluePlot", type: "s" },
                    ],
                    type: "e",
                  },
                  {
                    val: [
                      { val: "renderPlot", type: "s" },
                      {
                        val: [
                          { val: "{", type: "s", pos: [54, 33, 54, 33] },
                          {
                            val: [
                              { val: "<-", type: "s" },
                              { val: "x", type: "s" },
                              {
                                val: [
                                  { val: "[", type: "s" },
                                  { val: "faithful", type: "s" },
                                  { val: 2, type: "n" },
                                ],
                                type: "e",
                              },
                            ],
                            type: "e",
                            pos: [56, 5, 56, 25],
                          },
                          {
                            val: [
                              { val: "<-", type: "s" },
                              { val: "bins", type: "s" },
                              {
                                val: [
                                  { val: "seq", type: "s" },
                                  {
                                    val: [
                                      { val: "min", type: "s" },
                                      { val: "x", type: "s" },
                                    ],
                                    type: "e",
                                  },
                                  {
                                    val: [
                                      { val: "max", type: "s" },
                                      { val: "x", type: "s" },
                                    ],
                                    type: "e",
                                  },
                                  {
                                    name: "length.out",
                                    val: [
                                      { val: "+", type: "s" },
                                      {
                                        val: [
                                          { val: "$", type: "s" },
                                          { val: "input", type: "s" },
                                          { val: "bins", type: "s" },
                                        ],
                                        type: "e",
                                      },
                                      { val: 1, type: "n" },
                                    ],
                                    type: "e",
                                  },
                                ],
                                type: "e",
                              },
                            ],
                            type: "e",
                            pos: [57, 5, 57, 60],
                          },
                          {
                            val: [
                              { val: "hist", type: "s" },
                              { val: "x", type: "s" },
                              { name: "breaks", val: "bins", type: "s" },
                              { name: "col", val: "steelblue", type: "c" },
                              { name: "border", val: "white", type: "c" },
                            ],
                            type: "e",
                            pos: [60, 5, 60, 63],
                          },
                        ],
                        type: "e",
                      },
                    ],
                    type: "e",
                  },
                ],
                type: "e",
                pos: [54, 3, 61, 4],
              },
              {
                val: [
                  { val: "<-", type: "s" },
                  {
                    val: [
                      { val: "$", type: "s" },
                      { val: "output", type: "s" },
                      { val: "redPlot", type: "s" },
                    ],
                    type: "e",
                  },
                  {
                    val: [
                      { val: "renderPlot", type: "s" },
                      {
                        val: [
                          { val: "{", type: "s", pos: [63, 32, 63, 32] },
                          {
                            val: [
                              { val: "hist", type: "s" },
                              {
                                val: [
                                  { val: "rnorm", type: "s" },
                                  { val: 100, type: "n" },
                                ],
                                type: "e",
                              },
                              { name: "col", val: "orangered", type: "c" },
                            ],
                            type: "e",
                            pos: [65, 5, 65, 39],
                          },
                        ],
                        type: "e",
                      },
                    ],
                    type: "e",
                  },
                ],
                type: "e",
                pos: [63, 3, 66, 4],
              },
            ],
            type: "e",
          },
        ],
        type: "e",
      },
    ],
    type: "e",
    pos: [52, 1, 68, 1],
  },
  {
    val: [
      { val: "shinyApp", type: "s" },
      { val: "ui", type: "s" },
      { val: "server", type: "s" },
    ],
    type: "e",
    pos: [70, 1, 70, 20],
  },
];
