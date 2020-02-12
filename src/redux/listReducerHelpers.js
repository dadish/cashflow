import uuidv4 from "uuid/v4";
import findIndex from "ramda/src/findIndex";

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

export function fetchListSuccess(state, { payload: { data } }) {
  state.inProgress = false;
  if (data && data.length) {
    state.data = data.map(createItem);
  }
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

export function removeFirstItem() {}

export function removeLastItem() {}

export function removeItemStart() {}

export function removeItemSuccess(state, action) {
  const itemId = action.payload.id;
  const itemIndex = findIndex(({ id }) => id === itemId, state.data);
  if (itemIndex < 0) {
    return;
  }
  state.data.splice(itemIndex, 1);
}

export function updateItemSuccess(state, action) {
  const itemId = action.payload.id;
  const itemIndex = findIndex(({ id }) => id === itemId, state.data);
  if (itemIndex < 0) {
    return;
  }
  Object.assign(state.data[itemIndex], action.payload.data || {});
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
  updateItemSuccess,
  removeFirstItem,
  removeLastItem,
  removeItemStart,
  removeItemSuccess
};
