import { Link } from "react-router-dom";

function Signup() {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Signup for Free</h1>

      <input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="Full Name"
      />
      <input type="email" name="email" id="email" placeholder="E-mail" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <input
        type="password"
        name="passwordConfirmation"
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
