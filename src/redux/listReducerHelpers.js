import uuidv4 from "uuid/v4";
import findIndex from "ramda/src/findIndex";
import path from "ramda/src/path";

export const initialState = {
  data: [],
  inProgress: false,
  error: null
};

export function createItem(data) {
  return {
    id: uuidv4(),
    inProgress: false,
    error: null,
    ...data
  };
}

export function fetchListStart(state, action) {
  state.inProgress = true;
  state.error = null;
}

export function fetchListFail(state, action) {
  state.inProgress = false;
  state.error = action.payload.error;
}

export function fetchListError(state, action) {
  state.inProgress = false;
  state.error = action.payload.error;
}

export function fetchListSuccess(state, action) {
  state.inProgress = false;
  state.data = action.payload.data.map(createItem) || state.data;
}

export function fetchItemStart(state, action) {
  const itemId = action.payload.id;
  const itemIndex = findIndex(({ id }) => id === itemId, state.data);
  if (itemIndex > -1) {
    state.data[itemIndex].inProgress = true;
    state.data[itemIndex].error = null;
  } else if (itemId) {
    state.data.unshift(createItem({ inProgress: true, id: itemId }));
  }
}

export function fetchItemFail(state, action) {
  const itemId = action.payload.id;
  const itemIndex = findIndex(({ id }) => id === itemId, state.data);
  if (itemIndex > -1) {
    state.data[itemIndex].inProgress = false;
    state.data[itemIndex].error = action.payload.error;
  } else {
    state.data.unshift(
      createItem({ error: action.payload.error, id: itemId || uuidv4() })
    );
  }
}

export function fetchItemError(state, action) {
  const itemId = action.payload.id;
  const itemIndex = findIndex(({ id }) => id === itemId, state.data);
  if (itemIndex > -1) {
    state.data[itemIndex].inProgress = false;
    state.data[itemIndex].error = action.payload.error;
  } else {
    state.data.unshift(
      createItem({ error: action.payload.error, id: itemId || uuidv4() })
    );
  }
}

export function fetchItemSuccess(state, action) {
  const itemId = action.payload.id;
  const itemIndex = findIndex(({ id }) => id === itemId, state.data);
  if (itemIndex > -1) {
    state.data[itemIndex] = {
      ...state.data[itemIndex],
      ...action.payload.data,
      inProgress: false
    };
  } else {
    state.data.unshift(
      createItem({
        ...action.payload.data,
        inProgress: false
      })
    );
  }
}

export function removeFirstItemSuccess(state) {
  if (state.data.length < 1) {
    return;
  }
  state.data.shift();
}

export function removeLastItemSuccess(state) {
  if (state.data.length < 1) {
    return;
  }
  state.data.pop();
}

export const reducers = {
  fetchListStart,
  fetchListFail,
  fetchListError,
  fetchListSuccess,
  fetchItemStart,
  fetchItemFail,
  fetchItemError,
  fetchItemSuccess,
  removeFirstItemSuccess,
  removeLastItemSuccess
};
