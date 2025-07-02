import { useEffect, useState } from "react";
import api from "../api/axios";
import Chart from "chart.js/auto";

function Resultados() {
  const [diagnostico, setDiagnostico] = useState(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useState(null)[0];

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await api.get("/resultados");
        setDiagnostico(res.data.diagnostico);
      } catch (err) {
        console.error("Error obteniendo resultados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

  useEffect(() => {
    if (diagnostico && canvasRef) {
      const ctx = document.getElementById("riskChart").getContext("2d");
      const confianza = (diagnostico.confianza * 100).toFixed(1);
      let color = "#28a745";
      if (diagnostico.riesgo === 1) color = "#ffc107";
      if (diagnostico.riesgo === 2) color = "#dc3545";

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Confianza", "Restante"],
          datasets: [
            {
              data: [confianza, 100 - confianza],
              backgroundColor: [color, "#e9ecef"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: "70%",
          plugins: { legend: { display: false } },
        },
      });
    }
  }, [diagnostico]);

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString();
  };

  const obtenerTextoRiesgo = (nivel) => {
    if (nivel === 0) return "Bajo";
    if (nivel === 1) return "Medio";
    return "Alto";
  };

  if (loading) return <p>Cargando resultados...</p>;

  return (
    <div className="results-container">
      <h2>Resultados de tu Diagnóstico</h2>

      {diagnostico ? (
        <div className="result-card">
          <div className="result-graph">
            <canvas
              id="riskChart"
              ref={canvasRef}
              width="200"
              height="200"
            ></canvas>
            <div className="confidence-label">
              <span>{(diagnostico.confianza * 100).toFixed(1)}%</span>
              <small>Confianza</small>
            </div>
          </div>
          <div className="result-details">
            <h3>
              Nivel de Riesgo:{" "}
              <span className={`risk-${diagnostico.riesgo}`}>
                {obtenerTextoRiesgo(diagnostico.riesgo)}
              </span>
            </h3>
            <p>
              Fecha del diagnóstico:{" "}
              <strong>{formatearFecha(diagnostico.fecha)}</strong>
            </p>
            <div className="recommendations">
              <h4>Recomendaciones:</h4>
              {diagnostico.riesgo === 0 && (
                <p>
                  Continúa con tus hábitos saludables. Realiza chequeos anuales.
                </p>
              )}
              {diagnostico.riesgo === 1 && (
                <p>
                  Mejora tu dieta y aumenta la actividad física. Consulta a un
                  especialista.
                </p>
              )}
              {diagnostico.riesgo === 2 && (
                <p>
                  Consulta urgentemente con un cardiólogo. Necesitas atención
                  médica inmediata.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-results">
          <p>Aún no has realizado ningún diagnóstico.</p>
        </div>
      )}
    </div>
  );
}

export default Resultados;
