import createCachedSelector from "re-reselect";
import color from "color";

export const selectCollection = (state, { collection }) =>
  state.stripe.images[collection];

export const selectCollectionData = (state, { collection }) =>
  state.stripe.images[collection].data;

export const selectCollectionCanvasContext = (state, { collection }) =>
  state.stripe.images[collection].canvasContext;

export const selectStripeCoordinates = (state, { collection, name }) => {
  const data = selectCollectionData(state, { collection });
  const stripeData = data.animations[name];
  const frameIndex = stripeData.frames[0];
  return data.frames[frameIndex];
};

export const selectStripeImgData = createCachedSelector(
  selectCollectionCanvasContext,
  selectStripeCoordinates,
  (ctx, [left, top, width, height]) => {
    if (!ctx) {
      return null;
    }
    return ctx.getImageData(left, top, width, height);
  }
)((state, { collection, name }) => `${collection}-${name}`);

export const selectStripeBase64Image = createCachedSelector(
  selectStripeImgData,
  selectStripeCoordinates,
  (state, props) => props.color,
  (imgData, [left, top, width, height], stripeColor) => {
    if (!imgData) {
      return null;
    }
    const clr = color(stripeColor);
    const canv = document.createElement("canvas");
    canv.width = width;
    canv.height = height;
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i + 3]) {
        imgData.data[i] = clr.red();
        imgData.data[i + 1] = clr.green();
        imgData.data[i + 2] = clr.blue();
      }
    }
    const canvasContext = canv.getContext("2d");
    canvasContext.putImageData(imgData, 0, 0);
    return canv.toDataURL();
  }
)((state, { collection, name, color }) => `${collection}-${name}-${color}`);
