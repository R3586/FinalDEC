import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", form);
      login(res.data.username, res.data.user_type); // ← guarda en contexto
      navigate("/"); // o redirige donde necesites
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form>
        <input name="username" onChange={handleChange} placeholder="Usuario" />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <button type="button" onClick={handleLogin}>
          Ingresar
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        ¿No tienes cuenta? <a href="/registro">Regístrate</a>
      </p>
    </div>
  );
}

export default Login;
