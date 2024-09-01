import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hook/store";
export default function HomeAdmin() {
    const { id } = useAppSelector(state => state.user)
    return (
        <nav className="
            mt-3
            flex
            justify-evenly
            w-full
            max-[425px]:grid
            max-[425px]:grid-cols-3
            max-[425px]:gap-2
            ">
            <NavLink
                to={`/usuarios/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700"}
            >
                Uuarios
            </NavLink>
            <NavLink
                to={`/registro/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700"}
            >
                Registro
            </NavLink>
            <NavLink
                to={`/suscripcion/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700"}
            >
                Suscripción
            </NavLink>
            <NavLink
                to={`/home/${id}/turnos`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700"}
            >
                Turnos
            </NavLink>
            <NavLink
                to={`/calentamiento/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700"}
            >
                Calentamiento
            </NavLink>
            <NavLink
                to={`/rutina/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700"}
            >
                Rutina
            </NavLink>
        </nav>
    )
}