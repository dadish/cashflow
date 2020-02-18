import uuidv4 from "uuid/v4";

test.skip("storage sets and gets items from storage", () => {
  jest.isolateModules(() => {
    const storage = require("./index.js").default;
    const key = uuidv4();
    const value = uuidv4();
    storage.setItem(key, value);
    expect(storage.getItem(key)).toBe(value);
  });
});

test.skip("storage is mocked if browser does not support it or in incognito mode", () => {
  jest.isolateModules(() => {
    jest.mock("./localStorage", () => ({}));
    const storage = require("./index.js").default;
    const key = uuidv4();
    const value = uuidv4();
    storage.setItem(key, value);
    expect(storage.getItem(key)).toBe(value);
  });
});
