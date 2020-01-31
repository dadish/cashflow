import React, { useContext, useEffect } from "react";

import Context from "./Context";
import { imageLoadStart, imageLoadSuccess } from "./reducer";
import { selectStripeBase64Image } from "./selectors";
import styles from "./styles.module.scss";

function Stripe({
  className,
  name: stripeName,
  color: stripeColor,
  collection: collectionName
}) {
  const [state, dispatch] = useContext(Context);

  // load the collection image and draw it into canvas
  // so we can extract individual stripes off it
  const collection = state.images[collectionName];
  useEffect(() => {
    if (collection.inProgress || collection.canvasContext) {
      return;
    }
    dispatch(imageLoadStart({ collection: collectionName }));
    const img = new Image();
    img.src = collection.src;
    img.addEventListener("load", () => {
      const canv = document.createElement("canvas");
      canv.width = collection.size[0];
      canv.height = collection.size[1];
      const canvasContext = canv.getContext("2d");
      canvasContext.drawImage(img, 0, 0, ...collection.size);
      dispatch(imageLoadSuccess({ canvasContext, collection: collectionName }));
    });
  }, [collection, dispatch, collectionName]);

  const imgSrc = selectStripeBase64Image(
    collectionName,
    stripeName,
    stripeColor
  )(state);
  return <img src={imgSrc} alt={stripeName} className={styles.stripe} />;
}

export default Stripe;
