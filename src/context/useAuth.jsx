import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [active, setActiveZ] = useState("z");

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authKey = localStorage.getItem("authKey");
    return !!authKey;
  });

  useEffect(() => {
    const authKey = localStorage.getItem("authKey");
    setIsLoggedIn(!!authKey);
  }, []);

  const login = async (data) => {
    if (
      data?.email === "orion@gmail.com" &&
      data?.password === "YWJoaXNoZWsx"
    ) {
      localStorage.setItem("authKey", data?.password);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authKey");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, active, setActiveZ }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    toast.error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
