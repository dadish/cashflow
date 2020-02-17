import React from "react";
import { Formik, Form } from "formik";

const FormikWrapper = ({ children, ...props }) => (
  <Formik {...props}>
    <Form>{children}</Form>
  </Formik>
);

export default FormikWrapper;
