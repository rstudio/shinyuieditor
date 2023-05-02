import { generate_r_output_binding } from "./generate_output_binding";

test("Can generate output bindings from simple text", () => {
  const expected_output = `output$MyText <- renderText({
  "Hello, World"
})`;

  expect(
    generate_r_output_binding("MyText", {
      render_fn_name: "renderText",
      render_fn_body: `"Hello, World"`,
    })
  ).toBe(expected_output);
});
