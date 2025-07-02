import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function VerDiagnosticos() {
  const { paciente_id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/admin/diagnosticos/${paciente_id}`);
        setPaciente(res.data.paciente);
        setDiagnosticos(res.data.diagnosticos);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchData();
  }, [paciente_id]);

  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString();
  };

  const obtenerNivelRiesgo = (r) =>
    r === 0 ? "Bajo" : r === 1 ? "Medio" : "Alto";

  return (
    <div className="container">
      <h2>
        Historial de Diagnósticos de {paciente?.[2]} {paciente?.[3]}
      </h2>
      <p>
        <strong>Usuario:</strong> {paciente?.[8]}
      </p>

      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Presión Sistólica</th>
            <th>Presión Diastólica</th>
            <th>Colesterol</th>
            <th>Glucosa</th>
            <th>Fuma</th>
            <th>Alcohol</th>
            <th>Actividad</th>
            <th>IMC</th>
            <th>Riesgo</th>
            <th>Confianza</th>
          </tr>
        </thead>
        <tbody>
          {diagnosticos.map((d, idx) => (
            <tr key={idx}>
              <td>{formatFecha(d[13])}</td>
              <td>{d[1]}</td>
              <td>{d[2]}</td>
              <td>{d[3]}</td>
              <td>{d[4]}</td>
              <td>{d[5]}</td>
              <td>{d[6]}</td>
              <td>{d[7] === "s" ? "Sí" : "No"}</td>
              <td>{d[8] === "s" ? "Sí" : "No"}</td>
              <td>{d[9]}</td>
              <td>{d[10]}</td>
              <td>{obtenerNivelRiesgo(d[11])}</td>
              <td>{(d[12] * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
        Volver
      </button>
    </div>
  );
}

export default VerDiagnosticos;
