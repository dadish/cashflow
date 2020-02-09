import PropTypes from "prop-types";

export const collectionPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  canvasContext: PropTypes.instanceOf(CanvasRenderingContext2D),
  inProgress: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.instanceOf(Error), PropTypes.string])
});
