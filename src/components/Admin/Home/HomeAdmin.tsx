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
            ll:grid
            ll:grid-cols-3
            ll:gap-2
            ll:justify-items-center
            ">
            <NavLink
                to={`/usuarios/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700 ll:h-fit ll:w-28 ll:text-sm"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700 ll:h-fit ll:w-28 ll:text-sm"}
            >
                Uuarios
            </NavLink>
            <NavLink
                to={`/registro/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700 ll:h-fit ll:w-28 ll:text-sm"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700 ll:h-fit ll:w-28 ll:text-sm"}
            >
                Registro
            </NavLink>
            <NavLink
                to={`/suscripcion/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700 ll:h-fit ll:w-28 ll:text-sm"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700 ll:h-fit ll:w-28 ll:text-sm"}
            >
                Suscripción
            </NavLink>
            <NavLink
                to={`/home/${id}/turnos`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700 ll:h-fit ll:w-28 ll:text-sm"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700 ll:h-fit ll:w-28 ll:text-sm"}
            >
                Turnos
            </NavLink>
            <NavLink
                to={`/calentamiento/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700 ll:h-fit ll:w-28 ll:text-sm"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700 ll:h-fit ll:w-28 ll:text-sm"}
            >
                Calentamiento
            </NavLink>
            <NavLink
                to={`/rutina/${id}`}
                className={({ isActive }) => isActive
                    ? "text-white p-1 rounded bg-gray-700 dark:bg-cyan-700 ll:h-fit ll:w-28 ll:text-sm"
                    : "text-white p-1 rounded bg-gray-900 dark:bg-cyan-900 border border-gray-700 dark:border-cyan-700 ll:h-fit ll:w-28 ll:text-sm"}
            >
                Rutina
            </NavLink>
        </nav>
    )
}