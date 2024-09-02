import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Caio Adriano Rodrigues dos Santos",
    email: "caiobhadriano@gmail.com",
  });
  const [token, _setToken] = useState(null);

  const setToken = (token) => {
    _setToken(token);

    if (!token) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    localStorage.setItem("ACCESS_TOKEN", token);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
