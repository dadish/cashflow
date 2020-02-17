import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Button = ({ className, disabled, ...props }) => {
  return (
    <button
      type="submit"
      className={classnames({
        [styles.container]: true,
        [styles.disabled]: disabled,
        [className]: true
      })}
      disabled={disabled}
      {...props}
    />
  );
};

Button.propTypes = {
  /**
   * Weather the button is disabled or not.
   */
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

export default Button;
