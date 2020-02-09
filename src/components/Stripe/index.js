import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";

import { imageLoadInit } from "./reducer";
import { selectStripeBase64Image, selectCollection } from "./selectors";
import styles from "./styles.module.scss";
import { collectionPropType } from "./propTypes";

export function Stripe({
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

export const mapState = (state, ownProps) => ({
  collection: selectCollection(state, ownProps),
  imgSrc: selectStripeBase64Image(state, ownProps)
});

const mapDispatch = {
  imageLoadInit
};

Stripe.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  collection: collectionPropType,
  imgSrc: PropTypes.string,
  imageLoadInit: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(Stripe);
