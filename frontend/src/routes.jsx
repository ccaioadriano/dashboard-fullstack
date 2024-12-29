import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/Signup/Signup";
import Users from "./views/Users/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout ";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard/Dashboard";
import UserForm from "./views/Users/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/users"} />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/new",
        element: <UserForm key={"userCreate"} />,
      },
      {
        path: "/users/:userId",
        element: <UserForm key={"userUpdate"} />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
