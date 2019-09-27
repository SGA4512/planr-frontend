import React, { useContext, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext.js";

const RegistrationForm = ({
  errors,
  touched,
  values,
  handleSubmit,
  status,
  ...props
}) => {
  // hook keeps track of login information
  const { setUser } = useContext(UserContext);

  // update login if change has occured
  useEffect(() => {
    if (status) {
      setUser(status);
      props.history.push("/");
    }
  }, [status, setUser, props.history]);

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field component="select" name="role_id">
          <option>Select a Role</option>
          <option value={1}>Admin</option>
          <option value={2}>Manager</option>
          <option value={3}>Regular User</option>
        </Field>
        {touched.role_id && errors.role_id && (
          <p className="error">{errors.role_id}</p>
        )}

        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
// using formik
const FormikRegistrationForm = withFormik({
  // making sure each prop has a default value if given value is undefined
  mapPropsToValues({ name, password, email, role_id }) {
    return {
      name: name || "",
      email: email || "",
      role_id: role_id || "",
      password: password || ""
    };
  },

  // use yup to enforce input requirements
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().required("Email is required."),
    role_id: Yup.string().required("Role is required."),
    password: Yup.string().required("Password is required")
  }),

  // update values and set status
  handleSubmit(values, { resetForm, props, setStatus }) {
    // console.log("values, props", values, props);

    api
      .register(values)
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    resetForm();
  }
})(RegistrationForm); // currying functions

export default FormikRegistrationForm;
