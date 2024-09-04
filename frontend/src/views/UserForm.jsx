import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { Navigate, redirect, useNavigate } from "react-router-dom";

function UserForm() {
  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const passwordConfirmationRef = useRef("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    axiosClient
      .post("/users", payload)
      .then((response) => {
        navigate("/users");
      })
      .catch(({ response }) => {
        setErrors(response.data.errors);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>New User</h1>

        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => {
              return <p key={key}>{errors[key][0]}</p>;
            })}
          </div>
        )}

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
          Add
        </button>
      </form>
    </div>
  );
}

export default UserForm;
