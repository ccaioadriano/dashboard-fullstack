import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div>
      <h1>ola faça seu cadastro</h1>
      <Outlet />
    </div>
  );
}

export default GuestLayout;
