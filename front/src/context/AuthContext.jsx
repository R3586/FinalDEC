import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar datos de sessionStorage al iniciar
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const user_type = sessionStorage.getItem("user_type");

    if (username && user_type) {
      setUser({ username, user_type });
    }
  }, []);

  // Iniciar sesión
  const login = (username, user_type) => {
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("user_type", user_type);
    setUser({ username, user_type });
  };

  // Cerrar sesión
  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
