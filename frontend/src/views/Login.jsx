import { Link } from "react-router-dom";
import axiosClient from "../axios-client";

function Login() {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Login</h1>

      <input type="email" name="email" id="email" placeholder="E-mail" />
      <input
        type="password"
        name="password"
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
