import type { R_AST } from "r-ast-parsing";

import { ast_to_ui_node } from "./ast_to_shiny_ui_node";

const app_with_unknown_code_ast: R_AST = [
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
      { val: "library", type: "s" },
      { name: "package", val: "bslib", type: "s" },
    ],
    type: "e",
    pos: [3, 1, 3, 14],
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
              { val: "sidebar newPlot", type: "c" },
            ],
            type: "e",
          },
          {
            val: [
              { val: "grid_card", type: "s" },
              { name: "area", val: "sidebar", type: "c" },
              {
                val: [
                  { val: "card_body_fill", type: "s" },
                  { val: "custom_input", type: "s" },
                ],
                type: "e",
              },
            ],
            type: "e",
          },
          {
            val: [
              { val: "grid_card_plot", type: "s" },
              { name: "area", val: "newPlot", type: "c" },
            ],
            type: "e",
          },
          {
            name: "row_sizes",
            val: [
              { val: "c", type: "s" },
              { val: "0.97fr", type: "c" },
            ],
            type: "e",
          },
          {
            name: "col_sizes",
            val: [
              { val: "c", type: "s" },
              { val: "290px", type: "c" },
              { val: "1fr", type: "c" },
            ],
            type: "e",
          },
          { name: "gap_size", val: "1rem", type: "c" },
        ],
        type: "e",
      },
    ],
    type: "e",
    pos: [6, 1, 25, 1],
  },
  {
    val: [
      { val: "<-", type: "s" },
      { val: "custom_input", type: "s" },
      {
        val: [
          { val: "sliderInput", type: "s" },
          { name: "inputId", val: "bins", type: "c" },
          { name: "label", val: "Number of Bins ", type: "c" },
          { name: "min", val: 12, type: "n" },
          { name: "max", val: 100, type: "n" },
          { name: "value", val: 30, type: "n" },
        ],
        type: "e",
      },
    ],
    type: "e",
    pos: [27, 1, 33, 7],
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
              { val: "{", type: "s", pos: [36, 35, 36, 35] },
              {
                val: [
                  { val: "<-", type: "s" },
                  {
                    val: [
                      { val: "$", type: "s" },
                      { val: "output", type: "s" },
                      { val: "newPlot", type: "s" },
                    ],
                    type: "e",
                  },
                  {
                    val: [
                      { val: "renderPlot", type: "s" },
                      {
                        name: "expr",
                        val: [
                          { val: "{", type: "s", pos: [38, 32, 38, 32] },
                          {
                            val: [
                              { val: "plot", type: "s" },
                              {
                                name: "x",
                                val: [
                                  { val: "rnorm", type: "s" },
                                  { name: "n", val: 100, type: "n" },
                                ],
                                type: "e",
                              },
                            ],
                            type: "e",
                            pos: [40, 5, 40, 20],
                          },
                        ],
                        type: "e",
                      },
                    ],
                    type: "e",
                  },
                ],
                type: "e",
                pos: [38, 3, 41, 4],
              },
            ],
            type: "e",
          },
        ],
        type: "e",
      },
    ],
    type: "e",
    pos: [36, 1, 42, 1],
  },
  {
    val: [
      { val: "shinyApp", type: "s" },
      { name: "ui", val: "ui", type: "s" },
      { name: "server", val: "server", type: "s" },
    ],
    type: "e",
    pos: [44, 1, 44, 20],
  },
];

// ast_to_ui_node({
//   val: app_with_unknown_code_ast,
//   type: "e",
// });
