import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userCredentials) => {
    console.log("UserCredentials: ", userCredentials);
    setCurrentUser({ username: "Crypto Crazy" });
  };

  const logout = () => {
    console.log("logout called");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// https://dayvster.com/blog/use-context-for-auth
