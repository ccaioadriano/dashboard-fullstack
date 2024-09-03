import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
function DefaultLayout() {
  const { user, token, setUser } = useStateContext();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const onLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("ACCESS_TOKEN");
    location.reload();
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/users"}>Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user?.name}
            <a href="#" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
