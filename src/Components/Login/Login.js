import React, { useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import { useHistory } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../../olx-logo.png";
import "./Login.css";

function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const handleLogin = (values, { setSubmitting, setFieldError }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        toast.error("Invalid Credentials");
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <img width="200px" height="200px" src={Logo} alt="olx-logo" />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="LoginForm">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" className="input" />
              <ErrorMessage
                name="email"
                component="div"
                className="ErrorMessage"
              />

              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="ErrorMessage"
              />

              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
