const store = {};
let storage = window.localStorage;

try {
  storage.setItem("initialize", "storage");
} catch {
  storage = {
    setItem: (key, value) => {
      store[key] = value;
    },
    getItem: key => store[key]
  };
}

export default storage;
