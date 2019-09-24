import React, { useContext, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import UserContext from "../../contexts/UserContext.js";
// axios post action

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
  }, [status]);

  console.log("this is values", values);
  return (
    <div className="form-container-register">
      {/* <Paper > */}
      <h1>Sign Up</h1>
      <Form>
        <div className="field">
          {/* username */}
          <Field type="text" name="username" placeholder="Username" />
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
        </div>

        <div className="field">
          {/* email */}
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
        </div>

        <div className="field">
          {/* role */}
          <Field component="select" name="role_id">
            <option>Select a Role</option>
            <option value={1}>Marketing</option>
            <option value={2}>Back-End</option>
            <option value={3}>Front-End</option>
          </Field>

          {touched.role_id && errors.role_id && (
            <p className="error">{errors.role_id}</p>
          )}
        </div>

        <div className="field">
          {/* password */}
          <Field type="password" name="password" placeholder="Password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </Form>
      {/* </Paper> */}
    </div>
  );
};
// using formik
const FormikRegistrationForm = withFormik({
  // making sure each prop has a default value if given value is undefined
  mapPropsToValues({ username, password, email, role_id }) {
    return {
      username: username || "",
      email: email || "",
      role_id: role_id || "",
      password: password || ""
    };
  },

  // use yup to enforce input requirements
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please Enter Your Name"),
    email: Yup.string().required("Please Enter Your Email"),
    role_id: Yup.string().required("Please Enter Your Role"),
    password: Yup.string().required("Please Enter Your Password")
  }),

  // update values and set status
  handleSubmit(values, { resetForm, props, setStatus }) {
    console.log("values, props", values, props);

    axios
      .post("https://egge-corporate-ep.herokuapp.com/api/register", values)
      .then(response => {
        console.log(response);
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    resetForm();
  }
})(RegistrationForm); // currying functions

export default FormikRegistrationForm;
