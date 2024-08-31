import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hook/store";
export default function HomeAdmin() {
    const { id } = useAppSelector(state => state.user)
    return (
        <div className="flex justify-center mt-2.5">
            <nav className="
            flex
            justify-evenly
            w-screen
            max-[425px]:grid
            max-[425px]:grid-cols-3
            max-[425px]:gap-2
            ">
                <NavLink to={`/usuarios/${id}`}>
                    Uuarios
                </NavLink>
                <NavLink to={`/registro/${id}`}>
                    Registro
                </NavLink>
                <NavLink to={`/suscripcion/${id}`}>
                    Suscripción
                </NavLink>
                <NavLink to={`/home/${id}/turnos`} >
                    Turnos
                </NavLink>
                <NavLink to={`/calentamiento/${id}`} >
                    Calentamiento
                </NavLink>
                <NavLink to={`/rutina/${id}`}>
                    Rutina
                </NavLink>
            </nav>
        </div>
    )
}