import React, { useContext } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((result) => {
        result.user.updateProfile({ displayName: values.username }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: values.username,
              password: values.password,
              phone: values.phone,
            })
            .then(() => {
              toast.success("Signup Successful!");
              resetForm();
            });
        });
      });
  };
  const handleClearForm = (resetForm) => {
    resetForm();
  };
  return (
    <div>
      <div className="signupParentDiv">
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

        <Formik
          initialValues={{ username: "", email: "", phone: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className="signupForm">
              <div className="logo-button">
                <img width="200px" height="200px" src={Logo} alt=""></img>
                <button
                  onClick={() => handleClearForm(resetForm)}
                  type="button"
                >
                  Clear
                </button>
              </div>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="input"
              />
              <ErrorMessage
                className="ErrorMessage"
                name="username"
                component="div"
              />

              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" className="input" />
              <ErrorMessage
                className="ErrorMessage"
                name="email"
                component="div"
              />

              <label htmlFor="phone">Phone</label>
              <Field type="number" id="phone" name="phone" className="input" />
              <ErrorMessage
                className="ErrorMessage"
                name="phone"
                component="div"
              />

              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="input"
              />
              <ErrorMessage
                className="ErrorMessage"
                name="password"
                component="div"
              />

              <button type="submit">Signup</button>
            </Form>
          )}
        </Formik>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
