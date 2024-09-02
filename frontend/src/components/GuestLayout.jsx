import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
}

export default GuestLayout;
