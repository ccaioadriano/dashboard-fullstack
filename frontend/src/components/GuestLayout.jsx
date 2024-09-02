import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div>
      <h1>guest</h1>
      <Outlet />
    </div>
  );
}

export default GuestLayout;
