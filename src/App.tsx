import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import FormLogin from "./components/Session/login/FormLogin";
import FormRegister from "./components/Session/register/FormRegister";
import axios from "axios";
import Subscription from "./components/Suscripcion/Subscription";
import AcceptUser from './components/AcceptUser/AcceptUser'
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { baseUrlDeploy } from "./const";
axios.defaults.baseURL = baseUrlDeploy

function App() {
  const path = useLocation();
  // const navigate = useNavigate()

  // useEffect(() => {
  //   axios.interceptors.response.use(
  //     response => response,
  //     _error => {
  //       navigate('/')
  //     }
  //   );
  // }, []);

  return (
    <div className="h-full w-full flex flex-col">
      {
        path.pathname != "/" &&
        !path.pathname.includes("register") &&
        !path.pathname.includes("null") &&
        !path.pathname.includes("reset") &&
        !path.pathname.includes("acceptUser") &&
        <Header />
      }
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/register/:gymName/:id" element={<FormRegister />} />
        <Route path="/register/admin/:id" element={<FormRegister />} />
        <Route path="/suscripcion/:id" element={<Subscription />} />
        <Route path="/suscripcion" element={<Subscription />} />
        <Route path="/acceptUser" element={<AcceptUser />} />
        <Route path="*" element={<ProtectedRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
