import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {users &&
          users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
      </ul>
    </div>
  );
}

export default Users;
