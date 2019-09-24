import React, { useEffect, useContext } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../services/api";
import "./LoginForm.scss";
import UserContext from "../../contexts/UserContext.js";

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

  /// const {setUser} = userContext(user);
  // update login if change has occured
  useEffect(() => {
    if (status) {
      setUser(status);
      props.history.push("/");
    }
  }, [status]);

  return (
    <div className="form-container">
      <h1>Sign In</h1>
      <Form>
        <Field type="text" name="username" placeholder="Userame" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

const FormikLoginForm = withFormik({
  // making sure each prop has a default value if given value is undefined
  mapPropsToValues({ username, password, email }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  // use yup to enforce input requirements
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please Enter Your Name"),
    password: Yup.string().required("Please Enter Your Password")
  }),

  // update values and set status
  handleSubmit(values, { resetForm, props, setStatus }) {
    // console.log("values, props", values, props);
    api
      .login(values)
      .then(response => {
        console.log("we in there");
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    resetForm();
  }
})(LoginForm);

export default FormikLoginForm;
