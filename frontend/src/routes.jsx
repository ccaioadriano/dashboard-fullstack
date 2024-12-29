import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/login/Login";
import Signup from "./views/Signup/Signup";
import Users from "./views/Users/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout ";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard/Dashboard";
import UserForm from "./views/Users/UserForm";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        element: (
          <GoogleOAuthProvider
            clientId={`${import.meta.env.VITE_SOCIAL_LOGIN_CLIENT_ID}`}
          >
            <Login />
          </GoogleOAuthProvider>
        ),
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
