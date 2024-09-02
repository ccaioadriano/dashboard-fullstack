import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {
  const { user, token } = useStateContext();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div id="defaultLayout">
      <aside>
        <Link to={"/dashboard"} />
        <Link to={"/login"} />
      </aside>
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
