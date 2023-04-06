import type { Branch_Node, Function_Node } from "r-ast-parsing";

import type { KnownShinyUiNode } from "../Shiny-Ui-Elements/uiNodeTypes";

import { ast_to_ui_node } from "./ast_to_shiny_ui_node";

describe("Can handle unknown code properly", () => {
  test("Unknown symbols work", () => {
    const card_body_w_unknown_input: Function_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        { val: "custom_input", type: "s" },
      ],
      type: "e",
    };
    const parsed_card_w_unknown = ast_to_ui_node(card_body_w_unknown_input);

    const expected_result: KnownShinyUiNode = {
      id: "bslib::card_body_fill",
      uiArguments: {},
      uiChildren: [
        {
          id: "unknownUiFunction",
          uiArguments: expect.objectContaining({ text: "custom_input" }),
        },
      ],
    };
    expect(parsed_card_w_unknown).toStrictEqual(expected_result);
  });

  test("Unknown function calls", () => {
    const card_body_w_unknown_fn_call: Function_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        {
          val: [
            { val: "my_custom_fn", type: "s" },
            { name: "foo", val: "bar", type: "c" },
          ],
          type: "e",
        },
      ],
      type: "e",
    };

    const expected_result: KnownShinyUiNode = {
      id: "bslib::card_body_fill",
      uiArguments: {},
      uiChildren: [
        {
          id: "unknownUiFunction",
          uiArguments: expect.objectContaining({
            text: 'my_custom_fn(foo = "bar")',
          }),
        },
      ],
    };
    expect(ast_to_ui_node(card_body_w_unknown_fn_call)).toStrictEqual(
      expected_result
    );
  });

  test("Unknown symbols as named arguments", () => {
    expect(
      ast_to_ui_node({
        val: [
          { val: "card_body_fill", type: "s" },
          { name: "max_height", val: "card_height", type: "s" },
        ],
        type: "e",
      })
    ).toStrictEqual(
      expect.objectContaining({
        id: "bslib::card_body_fill",
        uiArguments: {
          max_height: {
            id: "unknownUiFunction",
            uiArguments: expect.objectContaining({
              text: "card_height",
            }),
          },
        },
      })
    );
  });

  test("Unknown functions as named arguments", () => {
    expect(
      ast_to_ui_node({
        val: [
          { val: "card_body_fill", type: "s" },
          {
            name: "max_height",
            val: [
              { val: "make_px", type: "s" },
              { name: "num", val: 100, type: "n" },
            ],
            type: "e",
          },
        ],
        type: "e",
      })
    ).toStrictEqual(
      expect.objectContaining({
        id: "bslib::card_body_fill",
        uiArguments: {
          max_height: {
            id: "unknownUiFunction",
            uiArguments: expect.objectContaining({
              text: "make_px(num = 100)",
            }),
          },
        },
      })
    );
  });

  test("Immediately invoked functions are not mangled", () => {
    expect(
      ast_to_ui_node({
        val: [
          {
            val: [
              { val: "(", type: "s" },
              {
                val: [
                  { val: "function", type: "s" },
                  { val: [{ name: "name", val: "", type: "s" }], type: "e" },
                  {
                    val: [
                      { val: "paste", type: "s" },
                      { val: "hello", type: "c" },
                      { val: "name", type: "s" },
                    ],
                    type: "e",
                  },
                ],
                type: "e",
              },
            ],
            type: "e",
          },
          { name: "name", val: "shiny", type: "c" },
        ],
        type: "e",
      })
    ).toEqual({
      id: "unknownUiFunction",
      uiArguments: expect.objectContaining({
        text: `(function(name) {...})(name = "shiny")`,
      }),
    });
  });
});

test("Handle primative values as children", () => {
  const output: KnownShinyUiNode = {
    id: "bslib::card_body_fill",
    uiArguments: {},
    uiChildren: [
      { id: "textNode", uiArguments: { contents: "Hi" } },
      { id: "textNode", uiArguments: { contents: "3" } },
      { id: "textNode", uiArguments: { contents: "FALSE" } },
    ],
  };
  expect(
    ast_to_ui_node({
      val: [
        { val: "bslib::card_body_fill", type: "s" },
        { val: "Hi", type: "c" },
        { val: 3, type: "n" },
        { val: false, type: "b" },
      ],
      type: "e",
    })
  ).toStrictEqual(output);
});

test("Successfully parses known ui nodes in named arguments", () => {
  const value_card_ast: Branch_Node = {
    val: [
      { val: "value_box", type: "s" },
      { name: "title", val: "I got", type: "c" },
      {
        name: "value",
        val: [
          { val: "textOutput", type: "s" },
          { name: "outputId", val: "my_value", type: "c" },
        ],
        type: "e",
      },
    ],
    type: "e",
  };

  expect(ast_to_ui_node(value_card_ast)).toStrictEqual({
    id: "bslib::value_box",
    uiArguments: {
      title: "I got",
      value: {
        id: "shiny::textOutput",
        uiArguments: { outputId: "my_value" },
      },
    },
  });
});

describe("Custom behavior for parsing to ui ast is respected", () => {
  const value_box_ast: Branch_Node = {
    val: [
      { val: "value_box", type: "s" },
      { name: "title", val: "My Title", type: "c" },
      {
        name: "value",
        val: [
          { val: "textOutput", type: "s" },
          { name: "outputId", val: "my_value", type: "c" },
        ],
        type: "e",
      },
      {
        name: "showcase",
        val: [
          { val: "bs_icon", type: "s" },
          { val: "github", type: "c" },
        ],
        type: "e",
      },
      {
        name: "showcase_layout",
        val: [{ val: "showcase_left_center", type: "s" }],
        type: "e",
      },
    ],
    type: "e",
  };

  const value_box_ui_node = ast_to_ui_node(value_box_ast);

  test("Intercepted named arugments are modified as expected, but simple one are left alone", () => {
    expect(value_box_ui_node.uiArguments).toStrictEqual(
      expect.objectContaining({
        title: "My Title",
        showcase_icon: "github",
        showcase_layout: "left",
      })
    );
  });

  test("Ui nodes as children get rendered properly", () => {
    expect(value_box_ui_node.uiArguments).toStrictEqual(
      expect.objectContaining({
        value: {
          id: "shiny::textOutput",
          uiArguments: { outputId: "my_value" },
        },
      })
    );
  });
});

export {};
