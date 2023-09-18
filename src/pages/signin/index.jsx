import react from "react";
import { Link } from "react-router-dom";
import "./style.css";
const SignIn = () => {
    return (
        <>
            <div>
                <form className="form-signin" action="">
                    <div className="container">
                    <div className="email-section">
                        <div className="my-label"><label className="label-1" htmlFor="email">Email</label></div>
                        <input className="input-1" type="text" name="email" id="email" />
                    </div>
                    <div className="pass-section">
                        <div className="my-label"><label className="label-2" htmlFor="passw">Password</label></div>
                        <input className="input-2" type="text" name="passw" id="passw" />
                    </div>
                    <button className="btn" type="submit">
                        <Link to={'/todo'} >Sign In</Link>
                    </button>
                    </div>
                </form>
                </div>
        </>
    )


};

export default SignIn;