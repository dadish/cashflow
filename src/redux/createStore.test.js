import createStore from "./createStore";

test("createStore creates the redux store without errors", () => {
  const store = createStore();
  expect(store).toHaveProperty("getState");
  expect(store).toHaveProperty("dispatch");
  expect(store).toHaveProperty("subscribe");
  expect(store).toHaveProperty("replaceReducer");
});
