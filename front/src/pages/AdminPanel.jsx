import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AdminPanel() {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const res = await api.get("/admin");
        setPacientes(res.data.pacientes);
      } catch (err) {
        setError("Acceso no autorizado o error al cargar datos.");
      }
    };
    cargarPacientes();
  }, []);

  const formatFecha = (fecha) => {
    if (!fecha) return "Sin registros";
    const f = new Date(fecha);
    return (
      f.toLocaleDateString() +
      " " +
      f.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="container">
      <h2>Panel de Administración</h2>
      {error && <div className="message-box">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Total Diagnósticos</th>
            <th>Último Diagnóstico</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p, idx) => (
            <tr key={idx}>
              <td>{p[1]}</td> {/* username */}
              <td>
                {p[2]} {p[3]}
              </td>{" "}
              {/* nombre apellido */}
              <td>{p[4]}</td> {/* total_diagnosticos */}
              <td>{formatFecha(p[5])}</td> {/* ultimo_diagnostico */}
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/admin/diagnosticos/${p[0]}`)}
                >
                  Ver Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
