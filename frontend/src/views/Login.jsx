import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { setUser, setToken } = useStateContext();
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 401) {
          setError(response.data.message);
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Login</h1>
      {error && (
        <div className="alert">
          <p>{error}</p>
        </div>
      )}
      <input type="email" ref={emailRef} id="email" placeholder="E-mail" />
      <input
        type="password"
        ref={passwordRef}
        id="password"
        placeholder="password"
      />
      <button type="submit" className="btn btn-block">
        Login
      </button>
      <p className="message">
        Not Registered? <Link to={"/signup"}>Create an account</Link>
      </p>
    </form>
  );
}

export default Login;
