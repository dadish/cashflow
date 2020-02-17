import React from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";

const Button = ({ className, ...props }) => (
  <button
    type="submit"
    className={classnames(styles.container, className)}
    {...props}
  />
);

export default Button;
