import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/resumen" element={<Home />} />
        <Route path="/home/miSalud" element={<Home />} />
        <Route path="/home/turnos" element={<Home />} />
        {/* Rutas dinamicas para el calentamiento y rutina */}
        {/* Ruta para la suscripcion */}
      </Routes>
    </>
  );
}

export default App;
