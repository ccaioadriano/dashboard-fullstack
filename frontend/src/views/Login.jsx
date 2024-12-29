import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { setUser, setToken } = useStateContext();
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const { data } = await axiosClient.post("/login", payload);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      const response = error.response;
      if (response && response.status === 401) {
        setError(response.data.message);
      }
    }
  };

  const handleLoginSuccess = async (response) => {
    const { credential } = response;
    // Enviar o token para o backend Laravel
    try {
      const data = await axiosClient.post("/social-login", {
        token: credential,
      });
      return data;
    } catch (error) {
      setError("Erro ao autenticar com google");
      console.error("Erro ao autenticar no Laravel:", error);
    }
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
        placeholder="Password"
      />
      <button type="submit" className="btn btn-block">
        Login
      </button>

      <GoogleOAuthProvider clientId="785842044557-gdjhfbfhtra9k754965ps662203te9s5.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(response) => {
            handleLoginSuccess(response).then(({ data }) => {
              setToken(data.token);
              setUser(data.user);
            });
          }}
          onError={() => setError("Erro ao autenticar com google")}
        />
      </GoogleOAuthProvider>

      <p className="message">
        Not Registered? <Link to={"/signup"}>Create an account</Link>
      </p>
    </form>
  );
};

export default Login;
