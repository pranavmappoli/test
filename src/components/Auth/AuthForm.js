import { useState, useRef } from "react";
import { sliceActions } from "../../redux/loginSlice";
import { useDispatch } from "react-redux";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupError, setSignupError] = useState("");
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = emailRef.current.value;

    const dbconnect = async (URL) => {
      return await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: false,
        }),
      })
        .then((res) => {
          if (res.ok) console.log("ok");
          else throw new Error("Failed");
        })
        .catch((err) => {
          console.log("setted Error");

          setSignupError(err);
        });
    };
    (async () => {
      if (isLogin) {
        const response = await dbconnect(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXTW7owM4V9xy6RuUz8fI4nRKPcX-a2SU"
        );
        await dispatch(sliceActions.login(response.idToken));
      } else {
        const response = await dbconnect(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXTW7owM4V9xy6RuUz8fI4nRKPcX-a2SU"
        );
      }
    })();
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          {signupError && (
            <p style={{ color: "white" }}> {String(signupError)}</p>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
