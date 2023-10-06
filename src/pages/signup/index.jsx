import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "../../schemas";
import { useDispatch } from "react-redux";
import { getUserId } from "../../redux/actions";

import "./style.css";
// import { app } from "../../lib/firebase";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const auth = getAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const data = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );
        if (data) {
          const uid = data?.user?.uid;
          await setDoc(doc(db, "users", uid), {
            email:values.email,
            userId:uid
          });
          dispatch(getUserId(uid))
          navigate("/todo");
          formik.resetForm();
          setLoading(false);
        }
      } catch (error) {
        alert(error);
        console.log(error);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <div>
        <form className="form-signin" action="" onSubmit={formik.handleSubmit}>
          <div className="signup-container">
            <div className="email-section">
              <div className="my-label">
                <label htmlFor="email">Email</label>
              </div>
              <input
                className="input-1"
                type="text"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="form-error">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="pass-section">
              <div className="my-label">
                <label htmlFor="passw">Password</label>
              </div>
              <input
                className="input-2"
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />

              {formik.errors.password && formik.touched.password ? (
                <p className="form-error">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="confirm-pass-section">
              <div className="my-label">
                <label htmlFor="confirm passw">Confirm Password</label>
              </div>
              <input
                className="input-3"
                type="password"
                name="confirmPassword"
                id="confirmpassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />

              {formik.errors.confirmPassword &&
              formik.touched.confirmPassword ? (
                <p className="form-error">{formik.errors.confirmPassword}</p>
              ) : null}
            </div>
            <button className="btn" type="submit">
              {loading ? <h3>Loading...</h3> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
