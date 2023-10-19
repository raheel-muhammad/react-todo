import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../redux/actions";
import { signInSchema } from "../../schemas";
import "./style.css";


const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const dispatch = useDispatch();
const state = useSelector((state) => state);
console.log('second',state);

  const auth = getAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        console.log('test submit')
        const data = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log('test')
        const {uid} = data.user;
        if (data) {
          dispatch(getUserData(uid))
          setLoading(false);
          navigate("/todo");

        }
      } catch (error) {
        setLoading(false);
        alert((error?.message.split("/")[1].replace(")", "")));
        console.log('testing error',error);
      }
    },
  });

  return (
    <>
      <div>
        <form className="form-signin"  onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="email-section">
              <div className="my-label">
                <label className="label-1" htmlFor="email">
                  Email
                </label>
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
                <label className="label-2" htmlFor="passw">
                  Password
                </label>
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
            <button className="btn" type="submit"  >
              {loading ? <h3>Loading...</h3> : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
