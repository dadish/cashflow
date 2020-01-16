import React, { useRef, useEffect } from "react";
import classnames from "classnames";
import color from "color";

import fastTrackImg from "assets/img/fasttrack.png";
import getStripeCoordinates from "assets/img/getStripeCoordinates";
import styles from "./styles.module.scss";

function Stripe({
  className,
  name: stripeName,
  color: stripeColor,
  collection: collectionName
}) {
  const canv = useRef(null);
  const [left, top, width, height] = getStripeCoordinates(
    collectionName,
    stripeName
  );
  const clr = color(stripeColor);
  useEffect(() => {
    const img = new Image();
    img.src = fastTrackImg;
    function drawImage() {
      const ctx = canv.current.getContext("2d");
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
      const imgData = ctx.getImageData(left, top, width, height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        if (imgData.data[i + 3]) {
          imgData.data[i] = clr.red();
          imgData.data[i + 1] = clr.green();
          imgData.data[i + 2] = clr.blue();
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
    img.addEventListener("load", drawImage);
    return () => img.removeEventListener("load", drawImage);
  }, [canv, left, top, width, height, clr]);

  return (
    <canvas
      ref={canv}
      className={classnames(styles.canvas, className)}
      width={width}
      height={height}
    ></canvas>
  );
}

export default Stripe;
