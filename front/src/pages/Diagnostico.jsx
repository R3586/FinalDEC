import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Diagnostico() {
  const [form, setForm] = useState({
    edad: "",
    genero: "",
    ps: "",
    pd: "",
    colesterol: "",
    glucosa: "",
    fuma: "",
    alcohol: "",
    actividad: "",
    peso: "",
    estatura: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validarFormulario = () => {
    for (const [key, value] of Object.entries(form)) {
      if (value === "" || value === null || value === undefined) {
        setError(`El campo "${key}" está incompleto.`);
        return false;
      }
    }

    if (!["s", "n"].includes(form.fuma)) {
      setError("Debe seleccionar una opción válida para '¿Fuma?'.");
      return false;
    }
    if (!["s", "n"].includes(form.alcohol)) {
      setError("Debe seleccionar una opción válida para '¿Toma alcohol?'.");
      return false;
    }
    if (!["masculino", "femenino"].includes(form.genero)) {
      setError("Debe seleccionar un género válido.");
      return false;
    }
    if (!["ninguna", "1-2 veces", "3 o más veces"].includes(form.actividad)) {
      setError("Debe seleccionar un nivel de actividad válido.");
      return false;
    }

    setError(null);
    return true;
  };

  const enviarDiagnostico = async () => {
    if (!validarFormulario()) return;

    try {
      const res = await api.post("/diagnostico", form);
      navigate("/resultados", {
        state: {
          diagnostico: {
            riesgo: res.data.riesgo,
            confianza: res.data.confianza,
            fecha: new Date().toISOString(),
          },
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error en diagnóstico.");
    }
  };

  return (
    <div className="container">
      <h2>Evaluación Médica</h2>
      {error && <div className="message-box">{error}</div>}
      <div className="form-grid">
        <input
          type="number"
          name="edad"
          onChange={handleChange}
          placeholder="Edad"
        />

        <select name="genero" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Seleccione género
          </option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>

        <input
          type="number"
          name="ps"
          onChange={handleChange}
          placeholder="Presión Sistólica"
        />
        <input
          type="number"
          name="pd"
          onChange={handleChange}
          placeholder="Presión Diastólica"
        />
        <input
          type="number"
          name="colesterol"
          onChange={handleChange}
          placeholder="Colesterol"
        />
        <input
          type="number"
          name="glucosa"
          onChange={handleChange}
          placeholder="Glucosa"
        />

        <select name="fuma" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            ¿Fuma?
          </option>
          <option value="s">Sí</option>
          <option value="n">No</option>
        </select>

        <select name="alcohol" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            ¿Toma alcohol?
          </option>
          <option value="s">Sí</option>
          <option value="n">No</option>
        </select>

        <select name="actividad" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Nivel de actividad
          </option>
          <option value="ninguna">Ninguna</option>
          <option value="1-2 veces">1-2 veces/semana</option>
          <option value="3 o más veces">3 o más veces/semana</option>
        </select>

        <input
          type="number"
          name="peso"
          onChange={handleChange}
          placeholder="Peso (kg)"
        />
        <input
          type="number"
          name="estatura"
          onChange={handleChange}
          placeholder="Estatura (cm)"
        />

        <button onClick={enviarDiagnostico}>Diagnosticar</button>
      </div>
    </div>
  );
}

export default Diagnostico;
