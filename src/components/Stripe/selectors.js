import { createSelector } from "@reduxjs/toolkit";
import color from "color";

export const selectStripe = () => state => state.stripe;

export const selectImages = () =>
  createSelector(selectStripe(), stripe => stripe.images);

export const selectCollection = collectionName =>
  createSelector(selectImages(), images => images[collectionName]);

export const selectCollectionData = collectionName =>
  createSelector(
    selectCollection(collectionName),
    collection => collection.data
  );

export const selectCollectionCanvasContext = collectionName =>
  createSelector(
    selectCollection(collectionName),
    collection => collection.canvasContext
  );

export const selectStripeCoordinates = (collectionName, stripeName) =>
  createSelector(selectCollectionData(collectionName), data => {
    const stripeData = data.animations[stripeName];
    const frameIndex = stripeData.frames[0];
    return data.frames[frameIndex];
  });

export const selectStripeImgData = (collectionName, stripeName) =>
  createSelector(
    selectCollectionCanvasContext(collectionName),
    selectStripeCoordinates(collectionName, stripeName),
    (ctx, [left, top, width, height]) => {
      if (!ctx) {
        return null;
      }
      return ctx.getImageData(left, top, width, height);
    }
  );

export const selectStripeBase64Image = (
  collectionName,
  stripeName,
  stripeColor
) =>
  createSelector(
    selectStripeImgData(collectionName, stripeName),
    selectStripeCoordinates(collectionName, stripeName),
    (imgData, [left, top, width, height]) => {
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
  );
