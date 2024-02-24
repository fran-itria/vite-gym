import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import FormLogin from "./components/Session/login/FormLogin";
import FormRegister from "./components/Session/register/FormRegister";
import axios from "axios";
import { baseUrl } from "./const";
import Routine from "./components/Routine/Routine";
import Users from "./components/Admin/Users/Users";
import WarmUp from "./components/WarmUp/WarmUp";

function App() {
  const path = useLocation();
  axios.defaults.baseURL = baseUrl
  return (
    <>
      {
        path.pathname != "/" &&
          !path.pathname.includes("register") &&
          !path.pathname.includes("null") ?
          <Header /> : <></>
      }
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/register/:gymName/:id" element={<FormRegister />} />
        <Route path="/register/admin/:id" element={<FormRegister />} />
        <Route path="/home/:userId/:select" element={<Home />} />
        <Route path="/rutina/:userId" element={<Routine />} />
        <Route path='/usuarios/:id' element={<Users />} />
        <Route path="/calentamiento/:id" element={<WarmUp />} />
        {/* Rutas dinamicas para el calentamiento y rutina */}
        {/* Ruta para la suscripcion */}
      </Routes>
    </>
  );
}

export default App;
