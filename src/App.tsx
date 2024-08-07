import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import FormLogin from "./components/Session/login/FormLogin";
import FormRegister from "./components/Session/register/FormRegister";
import axios from "axios";
import { baseUrlDeploy } from "./const";
import Routine from "./components/Routine/Routine";
import Users from "./components/Admin/Users/Users";
import WarmUp from "./components/WarmUp/WarmUp";
import Register from "./components/Register/Register";
import Subscription from "./components/Suscripcion/Subscription";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  const path = useLocation();
  axios.defaults.baseURL = baseUrlDeploy
  return (
    <>
      {
        path.pathname != "/" &&
          !path.pathname.includes("register") &&
          !path.pathname.includes("null") &&
          !path.pathname.includes("reset") ?
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
        <Route path="/registro/:id" element={<Register />} />
        <Route path="/suscripcion/:id" element={<Subscription />} />
        <Route path="/suscripcion" element={<Subscription />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
