#

The default view

```js
import { Formik, Form } from "formik";
<Formik initialValues={{ name: "Robert" }}>
  <Form>
    <Input label="Name" name="name" id="name-default" />
  </Form>
</Formik>;
```

With error

```js
import { Formik, Form } from "formik";
<Formik
  initialValues={{ name: "Robert" }}
  initialErrors={{ name: "Required." }}
  initialTouched={{ name: true }}
>
  <Form>
    <Input label="Name" name="name" id="name-with-error" />
  </Form>
</Formik>;
```
