import { generate_r_output_binding } from "./generate_output_binding";

test("Can generate output bindings from simple text", () => {
  const expected_output = `output$MyText <- renderText({
  "Hello, World"
})`;

  expect(
    generate_r_output_binding("MyText", {
      fn_name: "renderText",
      fn_body: `"Hello, World"`,
    })
  ).toBe(expected_output);
});
