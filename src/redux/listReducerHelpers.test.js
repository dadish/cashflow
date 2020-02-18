import { createNextState } from "@reduxjs/toolkit";
import {
  createItem,
  initialState,
  fetchListStart,
  fetchListSuccess,
  fetchListFail,
  fetchListError,
  fetchItemStart,
  fetchItemFail,
  fetchItemError,
  fetchItemSuccess
} from "./listReducerHelpers";

test.skip("createItem extends item with additional data when provided", () => {
  const data = {
    foo: "bar",
    baz: "lob"
  };
  const item = createItem(data);
  expect(item).toHaveProperty("id");
  expect(item.inProgress).toBe(false);
  expect(item.error).toBe(null);
  expect(item.foo).toBe(data.foo);
  expect(item.baz).toBe(data.baz);
});

test.skip("fetchListStart sets inProgress to true and clears error if any", () => {
  const state = createNextState(initialState, draft => {
    draft.error = new Error("Some error");
  });
  const nextState = createNextState(state, fetchListStart);
  expect(nextState.inProgress).toBe(true);
  expect(nextState.error).toBe(null);
});

test.skip("fetchListFail sets inProgress to false and sets the error", () => {
  const state = createNextState(initialState, draft => {
    draft.inProgress = true;
  });
  const error = new Error("Failed to fetch");
  const nextState = createNextState(fetchListFail)(state, {
    payload: { error }
  });
  expect(nextState.inProgress).toBe(false);
  expect(nextState.error).toBe(error);
});

test.skip("fetchListError sets inProgress to false and sets the error", () => {
  const state = createNextState(initialState, draft => {
    draft.inProgress = true;
  });
  const error = new Error("Failed to fetch");
  const nextState = createNextState(fetchListError)(state, {
    payload: { error }
  });
  expect(nextState.inProgress).toBe(false);
  expect(nextState.error).toBe(error);
});

test.skip("fetchListSuccess sets inProgress to false and refreshes the data", () => {
  const state = createNextState(initialState, draft => {
    draft.inProgress = true;
  });
  const data = [createItem(), createItem()];
  const nextState = createNextState(fetchListSuccess)(state, {
    payload: { data }
  });
  expect(nextState.inProgress).toBe(false);
  expect(nextState.data).toEqual(data);
});

test.skip("fetchListSuccess does not touch original data if no data is in payload", () => {
  const data = [createItem()];
  const state = createNextState(initialState, draft => {
    draft.data = data;
  });
  const nextState = createNextState(fetchListSuccess)(state, {
    payload: { foo: "bar" }
  });
  expect(nextState.data).toBe(data);
});

test.skip("fetchItemStart sets item inProgress to true and clears the error if any", () => {
  const item = createItem({ error: new Error("Some error") });
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemStart)(state, {
    payload: { id: item.id }
  });
  expect(nextState.data[0].inProgress).toBe(true);
  expect(nextState.data[0].error).toBe(null);
});

test.skip("fetchItemStart creates a new item if no item in data matches", () => {
  const item = createItem({ error: new Error("Some error") });
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemStart)(state, {
    payload: { id: "does-not-exist" }
  });
  expect(nextState.data.length).toBe(2);
  expect(nextState.data[0].inProgress).toBe(true);
  expect(nextState.data[0].error).toBe(null);
});

test.skip("fetchItemStart does nothing to the state if there is no id in the payload", () => {
  const item = createItem();
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemStart)(state, {
    payload: { foo: "bar" }
  });
  expect(nextState).toBe(state);
});

test.skip("fetchItemFail sets item inProgress to false and sets the error if any", () => {
  const item = createItem({ inProgress: true });
  const error = new Error("Item failed to fetch.");
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemFail)(state, {
    payload: {
      error,
      id: item.id
    }
  });
  expect(nextState.data[0].inProgress).toBe(false);
  expect(nextState.data[0].error).toBe(error);
});

test.skip("fetchItemFail adds new item into data if the payload id does not match any", () => {
  const item1 = createItem();
  const item2 = createItem();
  const error = new Error("Item failed to fetch.");
  const state = createNextState(initialState, draft => {
    draft.data = [item1];
  });
  const nextState = createNextState(fetchItemFail)(state, {
    payload: {
      error,
      id: item2.id
    }
  });
  expect(nextState.data.length).toBe(2);
  expect(nextState.data[0].id).toBe(item2.id);
  expect(nextState.data[0].error).toBe(error);
});

test.skip("fetchItemFail adds new item with arbitrary id if no id is in payload", () => {
  const item = createItem();
  const error = new Error("Item failed to fetch.");
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemFail)(state, {
    payload: {
      error
    }
  });
  expect(nextState.data.length).toBe(2);
  expect(nextState.data[0]).toHaveProperty("id");
  expect(nextState.data[0].id).toBeTruthy();
  expect(nextState.data[0].error).toBe(error);
});

test.skip("fetchItemError sets item inProgress to false and sets the error if any", () => {
  const item = createItem({ inProgress: true });
  const error = new Error("Item failed to fetch.");
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemError)(state, {
    payload: {
      error,
      id: item.id
    }
  });
  expect(nextState.data[0].inProgress).toBe(false);
  expect(nextState.data[0].error).toBe(error);
});

test.skip("fetchItemError adds new item into data if the payload id does not match any", () => {
  const item1 = createItem();
  const item2 = createItem();
  const error = new Error("Item failed to fetch.");
  const state = createNextState(initialState, draft => {
    draft.data = [item1];
  });
  const nextState = createNextState(fetchItemError)(state, {
    payload: {
      error,
      id: item2.id
    }
  });
  expect(nextState.data.length).toBe(2);
  expect(nextState.data[0].id).toBe(item2.id);
  expect(nextState.data[0].error).toBe(error);
});

test.skip("fetchItemError adds new item with arbitrary id if no id is in payload", () => {
  const item = createItem();
  const error = new Error("Item failed to fetch.");
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemError)(state, {
    payload: {
      error
    }
  });
  expect(nextState.data.length).toBe(2);
  expect(nextState.data[0]).toHaveProperty("id");
  expect(nextState.data[0].id).toBeTruthy();
  expect(nextState.data[0].error).toBe(error);
});

test.skip("fetchItemSuccess sets item inProgress to false and updates the item with data from payload", () => {
  const item = createItem({ inProgress: true });
  const data = {
    foo: "bar"
  };
  const state = createNextState(initialState, draft => {
    draft.data = [item];
  });
  const nextState = createNextState(fetchItemSuccess)(state, {
    payload: {
      id: item.id,
      data
    }
  });
  expect(nextState.data[0].inProgress).toBe(false);
  expect(nextState.data[0]).toEqual({
    ...item,
    ...data,
    inProgress: false
  });
});

test.skip("itemFetchSuccess adds new item to the data if id from the payload does not match any", () => {
  const item1 = createItem();
  const item2 = createItem({ inProgress: true });
  const state = createNextState(initialState, draft => {
    draft.data = [item1];
  });
  const nextState = createNextState(fetchItemSuccess)(state, {
    payload: {
      id: item2.id,
      data: item2
    }
  });
  expect(nextState.data.length).toBe(2);
  expect(nextState.data[0].id).toBe(item2.id);
  expect(nextState.data[0].inProgress).toBe(false);
});
