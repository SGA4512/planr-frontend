import React, { useEffect, useContext } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../services/api";
import UserContext from "../../contexts/UserContext.js";
import { notification } from "antd";

const LoginForm = ({
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
      setUser(status); // set user to user object from login endpoint response
      props.history.push("/");
    }
  }, [status]);

  return (
    <div className="form-container">
      <h1>Sign In</h1>
      <Form autoComplete="off">
        <Field type="text" name="email" placeholder="Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <button type="submit">Submit</button>
        <p>Demo using john@test.com (email) and test (password)</p>
      </Form>
    </div>
  );
};

const FormikLoginForm = withFormik({
  // making sure each prop has a default value if given value is undefined
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },

  // use yup to enforce input requirements
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required.")
  }),

  // update values and set status
  handleSubmit(values, { resetForm, props, setStatus }) {
    // console.log("values, props", values, props);
    api
      .login(values)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        // localStorage.setItem("role_name", res.data.role_name); // undefined - why?
        setStatus(res.data); // from formik
      })
      .catch(error => {
        console.log(error.message);
        notification.open({
          message: "Incorrect credentials."
        });
      });
    resetForm();
  }
})(LoginForm);

export default FormikLoginForm;
