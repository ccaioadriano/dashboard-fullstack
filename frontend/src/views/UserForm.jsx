import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { setNotification } = useStateContext();

  if (userId) {
    useEffect(() => {
      axiosClient.get(`/users/${userId}`).then(({ data }) => {
        setUser(data);
      });
    }, []);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user.id) {
        await axiosClient.put(`/users/${userId}`, user);
      } else {
        const { data } = await axiosClient.post("/users", user);
        setNotification(data);
      }
      navigate("/users");
    } catch (error) {
      setErrors(
        error.response
          ? error.response.data.errors
          : { general: ["An error occurred"] }
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {userId ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
        &nbsp;
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => {
              return <p key={key}>{errors[key][0]}</p>;
            })}
          </div>
        )}
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
          value={user.name}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
          value={user.email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setUser({ ...user, password_confirmation: e.target.value });
          }}
        />
        <button type="submit" className="btn btn-block">
          {userId ? <p>Update</p> : <p>Add</p>}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
