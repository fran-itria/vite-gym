import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import FormLogin from "./components/Session/login/FormLogin";
import FormRegister from "./components/Session/register/FormRegister";
import axios from "axios";
import { baseUrl } from "./const";

function App() {
  const path = useLocation();
  axios.defaults.baseURL = baseUrl
  return (
    <>
      {path.pathname != "/" && !path.pathname.includes("register") ? <Header /> : <></>}
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/register/:gymName/:id" element={<FormRegister />} />
        <Route path="/register/admin/:id" element={<FormRegister />} />
        <Route path="/home/:select" element={<Home />} />
        {/* Rutas dinamicas para el calentamiento y rutina */}
        {/* Ruta para la suscripcion */}
      </Routes>
    </>
  );
}

export default App;
