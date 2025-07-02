import { useEffect, useState } from "react";
import api from "../api/axios";

function Configuracion() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    genero: "",
    telefono: "",
    direccion: "",
    dni: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await api.get("/configuracion");
        setForm(res.data);
      } catch (err) {
        setError("No se pudo cargar la información.");
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/configuracion", form);
      setMensaje(res.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar.");
      setMensaje(null);
    }
  };

  return (
    <div className="container">
      <h2>Configuración de Usuario</h2>
      {mensaje && (
        <div
          className="message-box"
          style={{ backgroundColor: "#d4edda", color: "#155724" }}
        >
          {mensaje}
        </div>
      )}
      {error && <div className="message-box">{error}</div>}

      <div className="form-grid">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={form.fecha_nacimiento}
          onChange={handleChange}
        />
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="">Seleccione género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <input
          name="dni"
          value={form.dni}
          onChange={handleChange}
          placeholder="DNI"
          maxLength="8"
        />
        <button onClick={handleSubmit}>Actualizar Datos</button>
      </div>
    </div>
  );
}

export default Configuracion;
