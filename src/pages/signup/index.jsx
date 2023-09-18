import react from "react";
import { Link } from "react-router-dom";
import "./style.css";
const SignUp = () => {
    return (
        <>
            <div>
                <form className="form-signin" action="">
                    <div className="signup-container">
                    <div className="email-section">
                        <div className="my-label"><label htmlFor="email">Email</label></div>
                        <input className="input-1" type="text" name="email" id="email" />
                    </div>
                    <div className="pass-section">
                        <div className="my-label"><label htmlFor="passw">Password</label></div>
                        <input className="input-2" type="text" name="passw" id="passw" />
                    </div>
                    <div className="confirm-pass-section">
                        <div className="my-label"><label htmlFor="confirm passw">Confirm Password</label></div>
                        <input className="input-3" type="text" name="confirm passw" id="passw" />
                    </div>
                    <button className="btn" type="submit">
                        <Link to={'/todo'} >Sign Up</Link>
                    </button>
                    </div>
                </form>
                </div>
        </>
    )


};

export default SignUp;