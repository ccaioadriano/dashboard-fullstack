import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Signup() {
  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmationRef = useRef("");
  const { setUser, setToken } = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Signup for Free</h1>

      <input
        type="text"
        ref={fullNameRef}
        id="fullName"
        placeholder="Full Name"
      />
      <input ref={emailRef} type="email" id="email" placeholder="E-mail" />
      <input
        ref={passwordRef}
        type="password"
        id="password"
        placeholder="password"
      />
      <input
        ref={passwordConfirmationRef}
        type="password"
        id="passwordConfirmation"
        placeholder="Password Confirmation"
      />

      <button type="submit" className="btn btn-block">
        Signup
      </button>
      <p className="message">
        Already registered? <Link to={"/login"}>Go to Login</Link>
      </p>
    </form>
  );
}

export default Signup;
