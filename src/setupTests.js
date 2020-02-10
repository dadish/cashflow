// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// polyfill canvas stuff
window.CanvasRenderingContext2D = function CanvasRenderingContext2D() {};
window.CanvasRenderingContext2D.prototype.getImageData = jest.fn(() => ({
  data: []
}));
window.CanvasRenderingContext2D.prototype.putImageData = jest.fn();
window.CanvasRenderingContext2D.prototype.drawImage = jest.fn();
HTMLCanvasElement.prototype.getContext = jest.fn(
  () => new CanvasRenderingContext2D()
);
HTMLCanvasElement.prototype.toDataURL = jest.fn(() => "base64;1234");
