import React from "react";
import classnames from "classnames";
import { useField } from "formik";

import styles from "./styles.module.scss";

const Input = ({ className, label, ...props }) => {
  const type = props.type || "text";
  const [field, meta] = useField({ type, ...props });
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={classnames(styles.container, className)}
        type={type}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default Input;
