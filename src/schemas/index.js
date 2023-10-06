import * as Yup from "yup";
export const signUpSchema = Yup.object({
email:Yup.string().email().required("plz enter your email"),
password:Yup.string().min(6).required("plz enter your password"),
confirmPassword:Yup.string().required().oneOf([Yup.ref("password"),null],"password should be same"),
})

export const signInSchema = Yup.object({
    email:Yup.string().email().required("plz enter your email"),
    password:Yup.string().min(6).required("plz enter your password"),
    })
