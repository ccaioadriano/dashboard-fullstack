import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./style-login.css";

const MyCustomButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="btn btn-google">
      {children}
    </button>
  );
};

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

  const handleLoginSocialLogin = async (response) => {
    const { credential } = response;
    try {
      const data = await axiosClient.post("/social-login", {
        token: credential,
      });
      setToken(data.data.token);
      setUser(data.data.user);
    } catch (error) {
      setError("Erro ao autenticar com Google");
      console.error("Erro ao autenticar no Laravel:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <h1 className="form-title">Login</h1>
      {error && (
        <div className="alert alert-error">
          <p>{error}</p>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          ref={emailRef}
          id="email"
          placeholder="Digite seu e-mail"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <input
          type="password"
          ref={passwordRef}
          id="password"
          placeholder="Digite sua senha"
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Entrar
      </button>

      <div className="divider">ou</div>

      <div className="btn-social">
        <GoogleLogin
          width={350}
          shape="rectangular"
          onSuccess={handleLoginSocialLogin}
          onError={() => setError("Erro ao autenticar com Google")}
        />
      </div>

      <p className="form-message">
        Não tem uma conta? <Link to={"/signup"}>Crie uma agora</Link>
      </p>
    </form>
  );
};

export default Login;
