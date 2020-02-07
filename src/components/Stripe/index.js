import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { imageLoadInit } from "./reducer";
import { selectStripeBase64Image, selectCollection } from "./selectors";
import styles from "./styles.module.scss";

function Stripe({
  className,
  name: stripeName,
  collection,
  imgSrc,
  imageLoadInit
}) {
  // load the collection image if not loaded already
  React.useEffect(() => {
    if (collection.inProgress || collection.canvasContext) {
      return;
    }
    imageLoadInit({ collection: collection.name });
  }, [collection, imageLoadInit]);

  return (
    <img
      src={imgSrc}
      alt={stripeName}
      className={classnames(styles.stripe, className)}
    />
  );
}

const mapState = (state, { name, color, collection }) => ({
  collection: selectCollection(collection)(state),
  imgSrc: selectStripeBase64Image(collection, name, color)(state)
});

const mapDispatch = {
  imageLoadInit
};

export default connect(mapState, mapDispatch)(Stripe);
