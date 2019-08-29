import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import Paper from '@material-ui/core/Paper';


import './LoginForm.scss';

// axios post action 

const LoginForm = ({ errors, touched, values, handleSubmit, status, props}) => {

  // hook keeps track of login information 
  const [login, setLogin] = useState({});

  // update login if change has occured 
  useEffect(() => {
      if (status) {
          setLogin(user => ({...login, user}))
      }
  }, [status]); 

  return(
      <div className="form-container">
          {/* <Paper > */}
              <h1>Log In</h1>
              <Form >
                  
			  <div className="field">
                  {/* name */}
                  <Field 
                      type="text" 
                      name="username" 
                      placeholder="Username"  
                  />
				  {touched.name && errors.name && ( <p className="error">{errors.name}</p> )}
				  </div>

				  <div className="field">
                  {/* password */}
                  <Field 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                     
                  />
				  {touched.password && errors.password && <p className="error">{errors.password}</p>}
				  </div>
				  
                  <button type="submit">Submit</button>
              </Form>
          {/* </Paper> */}
      </div>
  );
};
// using formik 
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
      username: Yup
      .string()
      .required("Please Enter Your Name"),
      password: Yup
      .string()
      .required("Please Enter Your Password"),
  }),
  
  // update values and set status 
  handleSubmit(values, { resetForm, props, setStatus }) {
      console.log("values, props", values, props)

      axios
        .post("https://egge-corporate-ep.herokuapp.com/api/login", values)
        .then(response => {
          console.log(response)
          console.log('we in here')
        })
        .catch(error => {
          console.log(error)
        })
      resetForm(); 
  }
})(LoginForm); // currying functions

export default FormikLoginForm
