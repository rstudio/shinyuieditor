import {
  find_assignment_nodes,
  find_output_positions,
} from "./find_assignment_nodes";
import type { R_AST } from "./r_ast";

const app_server_body: R_AST = [
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
  {
    val: [
      { val: "%>%", type: "s" },
      {
        val: [
          { val: "observe", type: "s" },
          {
            val: [
              { val: "{", type: "s", pos: [68, 11, 68, 11] },
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
                          {
                            val: "{",
                            type: "s",
                            pos: [69, 34, 69, 34],
                          },
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
                              {
                                name: "col",
                                val: "orangered",
                                type: "c",
                              },
                            ],
                            type: "e",
                            pos: [70, 7, 70, 41],
                          },
                        ],
                        type: "e",
                      },
                    ],
                    type: "e",
                  },
                ],
                type: "e",
                pos: [69, 5, 71, 6],
              },
            ],
            type: "e",
          },
        ],
        type: "e",
      },
      {
        val: [
          { val: "bindEvent", type: "s" },
          {
            val: [
              { val: "$", type: "s" },
              { val: "input", type: "s" },
              { val: "redraw", type: "s" },
            ],
            type: "e",
          },
        ],
        type: "e",
      },
    ],
    type: "e",
    pos: [68, 3, 72, 32],
  },
];

describe("Can recursively parse ast to find all assignments ", () => {
  test("Correct number of assignments are found", () => {
    expect(find_assignment_nodes(app_server_body)).toHaveLength(5);
  });
});

describe("Can find the output variables and their locations ", () => {
  const assignment_nodes = find_output_positions(app_server_body);

  test("A single bluePlot assignment is given", () => {
    expect(assignment_nodes["bluePlot"]).toHaveLength(1);
  });
  test("There are two redplot assignments", () => {
    expect(assignment_nodes["redPlot"]).toHaveLength(2);
  });
});
