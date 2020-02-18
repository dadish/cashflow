import React from "react";

import fastTrackImg from "src/assets/img/fasttrack.png";
import fastTrackData from "src/assets/img/fasttrack.json";
import { Stripe, mapState } from "./";

const props = {
  collection: {
    name: "fast-track",
    data: fastTrackData,
    src: fastTrackImg,
    size: [2996, 494],
    canvasContext: null,
    inProgress: false,
    error: null
  },
  name: "buy_a_forest",
  color: "#000",
  imageLoadInit: jest.fn()
};

test.skip("Stripe renders without crashing", () => {
  mount(<Stripe {...props} />);
});

test.skip("Stripe renders without crashing when collection is inProgress", () => {
  const customProps = {
    ...props,
    collection: {
      ...props.collection,
      inProgress: true
    }
  };
  mount(<Stripe {...customProps} />);
});

test.skip("Stripe renders without crashing when collection has canvasContext", () => {
  const customProps = {
    ...props,
    collection: {
      ...props.collection,
      canvasContext: new CanvasRenderingContext2D()
    }
  };
  mount(<Stripe {...customProps} />);
});

test.skip("Stripe dispatches imageLoadInit if collection is not inProgress and has no canvasContext", () => {
  props.imageLoadInit.mockClear();
  mount(<Stripe {...props} />);
  expect(props.imageLoadInit).toHaveBeenCalledTimes(1);
});

test.skip("mapState replaces collection name string into collection state object", () => {
  const collection = {
    data: fastTrackData
  };
  const result = mapState(
    {
      stripe: {
        images: {
          "fast-track": collection
        }
      }
    },
    { collection: "fast-track", name: "south_sea_island_fantasy" }
  );
  expect(result.collection).toBe(collection);
});
