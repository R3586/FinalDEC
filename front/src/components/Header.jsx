import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      logout();
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">Salud del Corazón</Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Inicio</Link>
            </li>

            {/* Opciones según tipo de usuario */}
            {user?.user_type === "paciente" && (
              <>
                <li>
                  <Link to="/diagnostico">Diagnóstico</Link>
                </li>
                <li>
                  <Link to="/resultados">Resultados</Link>
                </li>
              </>
            )}

            {user?.user_type === "admin" && (
              <li>
                <Link to="/admin">Panel Admin</Link>
              </li>
            )}

            <li>
              {user ? (
                <div className="user-menu">
                  <button
                    className="user-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    <span className="icon">👤</span>
                    {user.username}
                    <span>▼</span>
                  </button>

                  {menuOpen && (
                    <div className="user-dropdown">
                      <Link to="/configuracion">Configuración</Link>
                      <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="login-btn">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="register-btn">
                    Registrarse
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
