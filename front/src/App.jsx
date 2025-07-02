import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Diagnostico from "./pages/Diagnostico";
import Resultados from "./pages/Resultados";
import AdminPanel from "./pages/AdminPanel";
import VerDiagnosticos from "./pages/VerDiagnosticos";
import Configuracion from "./pages/Configuracion";
import "./styles.css";

function App() {
  const username = sessionStorage.getItem("username");

  return (
    <Router>
      <div className="page-wrapper">
        <Header username={username} />
        <main className="container main-content">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="home-container">
                  Bienvenido a Salud del Corazón
                </h1>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/diagnostico" element={<Diagnostico />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route
              path="/admin/diagnosticos/:paciente_id"
              element={<VerDiagnosticos />}
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/admin/diagnosticos/:paciente_id"
              element={<VerDiagnosticos />}
            />
            <Route path="/resultados" element={<Resultados />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
