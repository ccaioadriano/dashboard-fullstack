import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  notification: "",
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, _setNotification] = useState("");

  const setToken = (token) => {
    _setToken(token);

    if (!token) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    localStorage.setItem("ACCESS_TOKEN", token);
  };

  const setNotification = (notification) => {
    _setNotification(notification);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        setNotification,
        notification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
