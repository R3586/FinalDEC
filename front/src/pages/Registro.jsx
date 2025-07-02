import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Registro() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
    telefono: "",
    direccion: "",
    dni: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validarCampos = () => {
    for (const [key, val] of Object.entries(form)) {
      if (!val) {
        setError(`El campo "${key}" no puede estar vacío.`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleRegister = async () => {
    if (!validarCampos()) return;

    try {
      const res = await api.post("/registro", form);
      setSuccess(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setSuccess(null);
      setError(err.response?.data?.message || "Error en el registro.");
    }
  };

  return (
    <div className="container">
      <h2>Registro de Paciente</h2>
      {error && <div className="message-box">{error}</div>}
      {success && (
        <div
          className="message-box"
          style={{ backgroundColor: "#d4edda", color: "#155724" }}
        >
          {success}
        </div>
      )}
      <div className="form-grid">
        <input name="username" placeholder="Usuario" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <input name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} />
        <input type="date" name="fecha_nacimiento" onChange={handleChange} />
        <select name="genero" defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            Seleccione género
          </option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <input name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
        />
        <input
          name="dni"
          placeholder="DNI"
          maxLength="8"
          onChange={handleChange}
        />
        <button onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
}

export default Registro;
