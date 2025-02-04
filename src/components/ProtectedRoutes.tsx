import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Users from "./Admin/Users/Users";
import Routine from "./Routine/Routine";
import WarmUp from "./WarmUp/WarmUp";
import Home from "./Home/Home";
// import Header from "./Header/Header";

function ProtectedRoutes() {

  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/home/:userId/:select" element={<Home />} />
        <Route path="/rutina/:userId" element={<Routine setRoutineAdmin={false} />} />
        <Route path='/usuarios/:id' element={<Users />} />
        <Route path="/calentamiento/:id" element={<WarmUp setWarmUpAdmin={false} />} />
      </Routes>
    </ProtectedRoute>

  );
}

export default ProtectedRoutes;
