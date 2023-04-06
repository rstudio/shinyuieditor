import type { Branch_Node, R_AST_Node } from "r-ast-parsing";

import type { ShinyUiParentNode } from "../../Shiny-Ui-Elements/uiNodeTypes";
import { ast_to_ui_node } from "../ast_to_shiny_ui_node";

import { is_text_node } from "./is_text_node";
import { text_node_to_code } from "./text_node_to_code";

const text_contents = "Text inside of text node";

const plain_text_node: R_AST_Node = { val: text_contents, type: "c" };
const invalid_plain_text_node: R_AST_Node = { val: "my_text", type: "s" };
const sized_text_node: R_AST_Node = {
  type: "e",
  val: [
    { val: "h1", type: "s" },
    { val: "my text", type: "c" },
  ],
};
const invalid_sized_text_node: R_AST_Node = {
  type: "e",
  val: [
    { val: "h1", type: "s" },
    { val: "my_text", type: "s" },
  ],
};

const decorated_text_node: R_AST_Node = {
  val: [
    { val: "em", type: "s" },
    { val: "my text", type: "c" },
  ],
  type: "e",
};

const sized_and_decorated_text_node: R_AST_Node = {
  val: [
    { val: "h1", type: "s" },
    {
      val: [
        { val: "em", type: "s" },
        { val: "my text", type: "c" },
      ],
      type: "e",
    },
  ],
  type: "e",
};

const invalid_decorated_node: R_AST_Node = {
  val: [
    { val: "em", type: "s" },
    { val: "my_text", type: "s" },
  ],
  type: "e",
};

const invalid_sized_and_decorated_text_node: R_AST_Node = {
  val: [
    { val: "h1", type: "s" },
    {
      val: [
        { val: "em", type: "s" },
        { val: "my_text", type: "s" },
      ],
      type: "e",
    },
  ],
  type: "e",
};

describe("Can properly detect text nodes", () => {
  test("Plain text", () => {
    expect(is_text_node(plain_text_node)).toBe(true);
    expect(is_text_node(invalid_plain_text_node)).toBe(false);
  });

  test("Sized text", () => {
    expect(is_text_node(sized_text_node)).toBe(true);
    expect(is_text_node(invalid_sized_text_node)).toBe(false);
  });

  test("Decorated text", () => {
    expect(is_text_node(decorated_text_node)).toBe(true);
    expect(is_text_node(invalid_decorated_node)).toBe(false);
  });

  test("Sized and decorated", () => {
    expect(is_text_node(sized_and_decorated_text_node)).toBe(true);
    expect(is_text_node(invalid_sized_and_decorated_text_node)).toBe(false);
  });
});

describe("Can parse raw ast to text nodes", () => {
  test("Can construct raw text nodes correctly", () => {
    const call_w_text: Branch_Node = {
      val: [
        { val: "bslib::card_body_fill", type: "s" },
        { val: text_contents, type: "c" },
        { name: "fill", val: false, type: "b" },
      ],
      type: "e",
    };
    expect(
      (ast_to_ui_node(call_w_text) as ShinyUiParentNode).uiChildren
    ).toStrictEqual([
      {
        id: "textNode",
        uiArguments: expect.objectContaining({
          contents: text_contents,
        }),
      },
    ]);
  });

  test("Can construct size wrapped text nodes correctly", () => {
    const call_w_text: Branch_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        {
          val: [
            { val: "h1", type: "s" },
            { val: text_contents, type: "c" },
          ],
          type: "e",
        },
        { name: "fill", val: true, type: "b" },
      ],
      type: "e",
    };
    expect(
      (ast_to_ui_node(call_w_text) as ShinyUiParentNode).uiChildren
    ).toStrictEqual([
      {
        id: "textNode",
        uiArguments: expect.objectContaining({
          contents: text_contents,
          size: "headline",
        }),
      },
    ]);
  });

  test("Can construct decoration wrapped text nodes correctly", () => {
    const call_w_text: Branch_Node = {
      val: [
        { val: "card_body_fill", type: "s" },
        {
          val: [
            { val: "em", type: "s" },
            { val: text_contents, type: "c" },
          ],
          type: "e",
        },
        { name: "fill", val: true, type: "b" },
      ],
      type: "e",
    };
    expect(
      (ast_to_ui_node(call_w_text) as ShinyUiParentNode).uiChildren
    ).toStrictEqual([
      {
        id: "textNode",
        uiArguments: expect.objectContaining({
          contents: text_contents,
          decoration: "italic",
        }),
      },
    ]);
  });
});

describe("Can convert from ui text node to code", () => {
  test("Basic undecorated text", () => {
    expect(
      text_node_to_code({
        id: "textNode",
        uiArguments: {
          contents: text_contents,
        },
      })
    ).toEqual(`"${text_contents}"`);
  });
  test("Header text", () => {
    expect(
      text_node_to_code({
        id: "textNode",
        uiArguments: {
          contents: text_contents,
          size: "subtitle",
          decoration: "default",
        },
      })
    ).toEqual(`h2("${text_contents}")`);
  });
});
