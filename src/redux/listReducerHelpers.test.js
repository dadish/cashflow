import { createItem } from "./listReducerHelpers";

test("createyItem extends item with additional data when provided", () => {
  const data = {
    foo: "bar",
    baz: "lob"
  };

  const item = createItem(data);
  expect(item.foo).toEqual(data.foo);
  expect(item.baz).toEqual(data.baz);
});
